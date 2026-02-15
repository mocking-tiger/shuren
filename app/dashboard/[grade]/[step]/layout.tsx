import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/api/server-user-api";

const DashboardGradeStepLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ grade: string; step: string }>;
}) => {
  const userData = await getServerUser();
  const currentGrade = userData?.userProgress?.currentGrade;
  const currentExp = userData?.userProgress?.exp;
  const { grade, step } = await params;

  if (currentExp === undefined || !currentGrade) {
    return null;
  }

  // 현재 급수에서 아직 클리어하지 않은 단계에 접근 시도 시 리다이렉트
  if (currentGrade === Number(grade) && currentExp + 1 < Number(step)) {
    redirect("/dashboard?error=grade_locked");
  }

  return <div>{children}</div>;
};

export default DashboardGradeStepLayout;
