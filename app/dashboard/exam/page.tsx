"use client";

import LoadingComponent from "@/app/components/ui/Loading";
import WordListForExam from "./_components/WordListForExam";
import { Word } from "@prisma/client";
import { useEffect, useState } from "react";
import { WordWithChoice } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { shuffle } from "@/lib/utils/exam-utils";
import { useMeanings } from "@/hooks/use-meanings";
import { getUserExamData } from "@/lib/api/exam-api";
import { fetchWordsAtExam } from "@/lib/api/word-api";

const ExamPage = () => {
  const { data: meanings } = useMeanings();
  const { data: examData, isFetching } = useQuery({
    queryKey: ["examData"],
    queryFn: getUserExamData,
  });
  const [words, setWords] = useState<Word[]>([]);
  const [examWords, setExamWords] = useState<Word[]>([]);

  // 출제 단어 목록 가져오기
  useEffect(() => {
    if (!examData) return;

    const getWords = async () => {
      const response = await fetchWordsAtExam(
        examData.grade,
        examData.step,
        examData.isPromotion,
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

  if (!examData || isFetching) return <LoadingComponent />;

  console.log("exam/page", examData);
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center">
      <WordListForExam
        words={shuffle(examWords as WordWithChoice[])}
        examData={examData}
      />
    </div>
  );
};

export default ExamPage;
