"use client";

import WordListForExam, { WordWithChoice } from "./components/WordListForExam";
import { Word } from "@prisma/client";
import { ExamData } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shuffle } from "@/lib/utils/exam-utils";
import { useMeanings } from "@/hooks/use-meanings";
import { fetchWordsAtExam } from "@/lib/api/word-api";

const ExamPage = () => {
  const router = useRouter();
  const { data: meanings } = useMeanings();
  const [examData, setExamData] = useState<ExamData>();
  const [words, setWords] = useState<Word[]>([]);
  const [examWords, setExamWords] = useState<Word[]>([]);

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

  // 시험용 배열로 가공
  useEffect(() => {
    if (!words.length || !meanings?.length || !examData) return;

    const handleSetWordsForExam = () => {
      if (examData.isPromotion) {
        const newExamWords = words
          .map((word) => ({
            ...word,
            choice: shuffle([
              word.wordMeaning,
              ...shuffle(meanings)
                .filter((meaning) => meaning !== word.wordMeaning)
                .slice(0, 3),
            ]),
          }))
          .slice(0, 20);
        setExamWords(newExamWords);
        return;
      } else {
        const newExamWords = words.map((word) => ({
          ...word,
          choice: shuffle([
            word.wordMeaning,
            ...shuffle(meanings)
              .filter((meaning) => meaning !== word.wordMeaning)
              .slice(0, 3),
          ]),
        }));
        setExamWords(newExamWords);
      }
    };
    handleSetWordsForExam();
  }, [words, meanings, examData]);

  if (!examData) return <div>Loading...</div>;

  console.log(examWords);

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <WordListForExam words={shuffle(examWords as WordWithChoice[])} />
    </div>
  );
};

export default ExamPage;
