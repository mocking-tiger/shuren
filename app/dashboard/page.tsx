"use client";

import GradeBox from "./components/GradeBox";
import { useEffect } from "react";
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

const DashboardPage = () => {
  const { userData } = useUserData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGrade = userData?.userProgress?.currentGrade ?? 9;
  const queryClient = useQueryClient();

  // 비정상적 접근 처리
  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "grade_locked") {
      alert(
        `당신은 얕은 잔꾀를 부려 본인의 역량으로는 어림도 없는 공간에 용케도 숨어들었지만, "어디서 ${currentGrade}급 냄새가 나는데?" 라는 상급부원의 한마디에 바로 수색이 시작되었고, 실력이 아닌 잔머리로 몰래 숨어든 당신은 곧 정체를 들켜 호되게 꾸짖음을 당하고 쫓겨났습니다. 앞으로는 편법을 사용하지 않고 공부에는 왕도가 없다는 사실을 되새기며 차근차근 수련을 이어나가기로 다짐합니다.`
      );
      router.push("/dashboard");
    }
  }, [searchParams, router, currentGrade]);

  // 뜻 목록 가져오기
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["meanings"],
      queryFn: fetchMeanings,
    });
  }, [queryClient]);

  return (
    <div>
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
