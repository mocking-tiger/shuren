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
  const currentGrade = userData?.userProgress?.currentGrade ?? 9;
  const { grade } = await params;

  if (currentGrade > Number(grade)) {
    redirect("/dashboard?error=grade_locked");
  }

  return <div>{children}</div>;
};

export default DashboardGradeLayout;
