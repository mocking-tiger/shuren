"use client";

import Link from "next/link";
import Button from "@/app/components/ui/Button";
import LoadingComponent from "@/app/components/ui/Loading";
import ProgressBar from "@/app/dashboard/_components/ProgressBar";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/use-user-data";
import { useState } from "react";
import { ExamData } from "@/types/types";

const VictoryPage = () => {
  const router = useRouter();
  const { userData } = useUserData();
  const [examData] = useState<ExamData | null>(() => {
    if (typeof window === "undefined") return null;
    const data = sessionStorage.getItem("examData");
    return data ? JSON.parse(data) : null;
  });

  const handleSetPromotionExam = () => {
    if (!examData) return;

    sessionStorage.setItem(
      "examData",
      JSON.stringify({
        grade: examData.grade,
        step: examData.step,
        isPromotion: true,
      }),
    );
    router.push("/dashboard/exam");
  };

  if (!examData || !userData?.userProgress) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
      <h1 className="text-[120px] md:text-[160px] font-bold font-yuji">勝利</h1>
      <div className="flex gap-4">
        {!examData?.isPromotion && userData.userProgress.exp !== 3 && (
          <Link
            href={`/dashboard/${examData.grade}/${
              userData.userProgress.exp + 1
            }`}
          >
            <Button type="button" className="w-20! bg-white text-black!">
              다음단계
            </Button>
          </Link>
        )}
        <Link href="/dashboard">
          <Button type="button" className="w-20! bg-white text-black!">
            메인으로
          </Button>
        </Link>
      </div>
      {!examData?.isPromotion && userData?.userProgress && (
        <ProgressBar
          userProgress={userData.userProgress}
          isPlayAnimation={true}
        />
      )}
      {examData?.isPromotion && (
        <>
          <h2 className="mt-4 text-2xl md:text-4xl font-bold">
            승급을 축하합니다!
          </h2>
          <h3 className="mt-2 text-xl md:text-2xl font-bold">
            {userData.userProgress.isMaster
              ? "모든 단계를 클리어했고 축하하고 동사,명사편을 기대해달라는 메세지"
              : `${examData.grade}급 => ${userData.userProgress.currentGrade}급`}
          </h3>
        </>
      )}
      {userData.userProgress.currentGrade === examData.grade &&
        userData.userProgress.exp === 3 && (
          <Button
            type="button"
            className="w-20! mt-4"
            onClick={handleSetPromotionExam}
          >
            승급시험
          </Button>
        )}
    </div>
  );
};

export default VictoryPage;
