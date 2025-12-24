"use client";

import { useParams } from "next/navigation";

const DashboardGradeStepPage = () => {
  const { step } = useParams();
  return <div>DashboardGradeStepPage-{step}</div>;
};

export default DashboardGradeStepPage;
