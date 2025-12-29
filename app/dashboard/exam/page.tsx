"use client";

import { fetchWordsAtExam } from "@/lib/api/word-api";
import { ExamData } from "@/types/types";
import { Word } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ExamPage = () => {
  const router = useRouter();
  const [examData, setExamData] = useState<ExamData>();
  const [words, setWords] = useState<Word[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);

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

  // 단어 목록 가져오기
  useEffect(() => {
    if (!examData) return;

    const getWords = async () => {
      const response = await fetchWordsAtExam(
        examData.grade,
        examData.step,
        examData.isPromotion
      );
      console.log(response);
    };
    getWords();
  }, [examData]);

  if (!examData) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        {examData.grade}급 {examData.step}단계 시험
        <br />
        {examData.isPromotion ? "승급 시험" : "일반 시험"}
      </h1>
    </div>
  );
};

export default ExamPage;
