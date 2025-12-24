"use client";

import { useParams } from "next/navigation";

const DashboardGradePage = () => {
  const { grade } = useParams();
  console.log({ grade });
  return <div>DashboardGradePage</div>;
};

export default DashboardGradePage;
