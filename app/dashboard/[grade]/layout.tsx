import { getServerUser } from "@/lib/api/server-user-api";
import { redirect } from "next/navigation";

// Next.js 서버 컴포넌트 캐싱 비활성화
// 승급 후 바로 접근 시 이전 등급 정보가 캐시되어 grade_locked 에러 발생 방지
export const dynamic = 'force-dynamic';

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
