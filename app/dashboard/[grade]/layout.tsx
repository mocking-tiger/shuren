import { getServerUser } from "@/lib/api/server-user-api";
import { redirect } from "next/navigation";

const DashboardGradeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ grade: string }>;
}) => {
  const userData = await getServerUser();
  const currentGrade = userData?.userProgress?.currentGrade;
  const { grade } = await params;

  if (!currentGrade) {
    return null;
  }

  // 디버깅용 로그
  console.log("[Grade Layout]", {
    userId: userData?.id,
    currentGrade,
    requestedGrade: Number(grade),
    hasUserProgress: !!userData.userProgress,
    willRedirect: currentGrade > Number(grade),
  });

  if (currentGrade > Number(grade)) {
    redirect("/dashboard?error=grade_locked");
  }

  return <div>{children}</div>;
};

export default DashboardGradeLayout;
