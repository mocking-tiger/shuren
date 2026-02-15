"use client";

import GradeBox from "./_components/GradeBox";
import LoadingComponent from "../components/ui/Loading";
import { fetchMeanings } from "@/lib/api/word-api";
import { useUserData } from "@/hooks/use-user-data";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

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
  const hasShownAlert = useRef(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "grade_locked" && !hasShownAlert.current) {
      hasShownAlert.current = true;
      alert(`수준에 맞지 않는 접근 시도`);
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  return null;
};

const DashboardPage = () => {
  const { userData } = useUserData();
  const currentGrade = userData?.userProgress?.currentGrade ?? 9;
  const queryClient = useQueryClient();
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  // 배경 이미지 프리로딩
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = bgConfigs.map((config) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = config.url;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsImagesLoaded(true);
      } catch (error) {
        console.error("이미지 로딩 실패:", error);
        // 에러가 나도 페이지는 보여줌
        setIsImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // 뜻 목록 가져오기
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["meanings"],
      queryFn: fetchMeanings,
    });
  }, [queryClient]);

  // 이미지 로딩 중이면 로딩 컴포넌트 표시
  if (!isImagesLoaded) {
    return <LoadingComponent />;
  }

  console.log(userData);
  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        <ErrorHandler />
      </Suspense>
      <div className="px-4 md:px-32  2xl:w-[60%] 2xl:mx-auto py-4 md:py-16 flex flex-col gap-4 overflow-y-auto">
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
