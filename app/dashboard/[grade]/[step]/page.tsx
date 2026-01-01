"use client";

import WordList from "./components/WordList";
import { useParams } from "next/navigation";
import { useWords } from "@/hooks/use-words";

const DashboardGradeStepPage = () => {
  const { grade, step } = useParams();
  const { words, isLoading } = useWords(Number(grade), Number(step));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <WordList words={words} />
    </div>
  );
};

export default DashboardGradeStepPage;
