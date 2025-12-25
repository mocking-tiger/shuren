"use client";

import { useWords } from "@/hooks/use-words";
import { useParams } from "next/navigation";

const DashboardGradeStepPage = () => {
  const { grade, step } = useParams();
  const { words, isLoading, error } = useWords(Number(grade), Number(step));

  console.log(words);
  return (
    <div>
      DashboardGradeStepPage-{grade}-{step}
    </div>
  );
};

export default DashboardGradeStepPage;
