"use client";

import Link from "next/link";
import Button from "@/app/components/ui/Button";
import ProgressBar from "@/app/dashboard/components/ProgressBar";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/use-user-data";

const VictoryPage = () => {
  const router = useRouter();
  const examData = JSON.parse(sessionStorage.getItem("examData") || "{}");
  const { userData } = useUserData();

  const handleSetPromotionExam = () => {
    sessionStorage.setItem(
      "examData",
      JSON.stringify({
        grade: examData.grade,
        step: examData.step,
        isPromotion: true,
      })
    );
    router.push("/dashboard/exam");
  };

  console.log(userData);

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
      <h1 className="text-[120px] md:text-[160px] font-bold font-yuji">勝利</h1>
      <div className="flex gap-4">
        <Link href="/dashboard/exam">
          <Button type="button" className="w-20! bg-white text-black!">
            재도전
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button type="button" className="w-20! bg-white text-black!">
            메인으로
          </Button>
        </Link>
      </div>
      {userData?.userProgress && (
        <ProgressBar
          userProgress={userData.userProgress}
          isPlayAnimation={true}
        />
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
