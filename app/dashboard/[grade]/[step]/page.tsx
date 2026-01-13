"use client";

import WordList from "./components/WordList";
import LoadingComponent from "@/app/components/ui/Loading";
import { useParams } from "next/navigation";
import { useWords } from "@/hooks/use-words";

const DashboardGradeStepPage = () => {
  const { grade, step } = useParams();
  const { words, isLoading } = useWords(Number(grade), Number(step));

  if (isLoading) return <LoadingComponent />;

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <WordList words={words} />
    </div>
  );
};

export default DashboardGradeStepPage;
