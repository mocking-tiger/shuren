"use client";

import GradeBox from "./components/GradeBox";
import LoadingComponent from "../components/ui/Loading";
import { Suspense, useEffect } from "react";
import { fetchMeanings } from "@/lib/api/word-api";
import { useUserData } from "@/hooks/use-user-data";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const bgConfigs = [
  { url: "/images/bg/sprout.jpg", positionClass: "bg-center" },
  { url: "/images/bg/bamboo.jpg", positionClass: "bg-center" },
  { url: "/images/bg/sakura.jpg", positionClass: "bg-center" },
  { url: "/images/bg/momiji.jpg", positionClass: "bg-center" },
  { url: "/images/bg/susuki.jpg", positionClass: "bg-[left_0%_top_50%]" },
  { url: "/images/bg/ume.jpg", positionClass: "bg-center" },
  { url: "/images/bg/pine.jpg", positionClass: "bg-center" },
  { url: "/images/bg/stone.jpg", positionClass: "bg-center" },
  { url: "/images/bg/mountain.jpg", positionClass: "bg-[left_0%_top_30%]" },
];

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
const ErrorHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "grade_locked") {
      alert(
        `공부에는.왕도가.없읍니다..\n옛말에.천리길도.한걸음부터라고.했으니.힘내서.정진합시다^^\n정진하는.당신이.쵝오~~~b`
      );
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  return null;
};

const DashboardPage = () => {
  const { userData } = useUserData();
  const currentGrade = userData?.userProgress?.currentGrade ?? 9;
  const queryClient = useQueryClient();

  // 뜻 목록 가져오기
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["meanings"],
      queryFn: fetchMeanings,
    });
  }, [queryClient]);

  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        <ErrorHandler />
      </Suspense>
      <div className="px-4 md:px-32 py-4 md:py-16 flex flex-col gap-4 overflow-y-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <GradeBox
            key={index}
            grade={9 - index}
            bg={bgConfigs[index].url}
            positionClass={bgConfigs[index].positionClass}
            isLocked={9 - index < currentGrade}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
