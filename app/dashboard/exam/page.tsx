"use client";

import { Word } from "@prisma/client";
import { ExamData } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMeanings } from "@/hooks/use-meanings";
import { fetchWordsAtExam } from "@/lib/api/word-api";
import WordListForExam from "./components/WordListForExam";

const ExamPage = () => {
  const router = useRouter();
  const { data: meanings } = useMeanings();
  const [examData, setExamData] = useState<ExamData>();
  const [words, setWords] = useState<Word[]>([]);

  // 메타데이터 받아오기
  useEffect(() => {
    const getExamData = async () => {
      const data = JSON.parse(
        sessionStorage.getItem("examData") || "{}"
      ) as ExamData;
      if (!data) {
        router.push("/dashboard");
        return;
      }
      setExamData(data);
    };
    getExamData();
  }, [router]);

  // 출제 단어 목록 가져오기
  useEffect(() => {
    if (!examData) return;

    const getWords = async () => {
      const response = await fetchWordsAtExam(
        examData.grade,
        examData.step,
        examData.isPromotion
      );
      setWords(response);
    };
    getWords();
  }, [examData]);

  if (!examData) return <div>Loading...</div>;

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <WordListForExam words={words} />
    </div>
  );
};

export default ExamPage;
