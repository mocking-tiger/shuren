"use client";
import { useUserData } from "@/hooks/use-user-data";
import { redirect, useParams } from "next/navigation";

const DashboardGradeLayout = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useUserData();
  const { grade } = useParams();
  const currentGrade = userData?.userProgress?.currentGrade;

  // 디버깅용 로그
  console.log("[Grade Layout]", {
    userId: userData?.id,
    currentGrade,
    requestedGrade: Number(grade),
    hasUserProgress: !!userData.userProgress,
    willRedirect: currentGrade > Number(grade),
  });

  if (currentGrade > Number(grade)) {
    console.log("grade/layout.tsx redirect");
    redirect("/dashboard?error=grade_locked");
  }

  return <div>{children}</div>;
};

export default DashboardGradeLayout;
