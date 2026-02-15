"use client";
/* eslint-disable @next/next/no-img-element */

import Button from "@/app/components/ui/Button";
import LoadingComponent from "@/app/components/ui/Loading";
import { useState } from "react";
import { Word } from "@prisma/client";
import { runTTS } from "@/lib/utils/word-utils";
import { useParams, useRouter } from "next/navigation";
import { upsertUserExamData } from "@/lib/api/exam-api";
import { useQueryClient } from "@tanstack/react-query";

const WordList = ({ words }: { words: Word[] }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { grade, step } = useParams();
  const [isToggled, setIsToggled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (direction: "prev" | "next") => {
    if (currentIndex === 0 && direction === "prev") {
      return;
    }
    if (currentIndex === words.length - 1 && direction === "next") {
      return;
    }
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    setIsToggled(false);
    setCurrentIndex(newIndex);
  };

  const handleExamClick = () => {
    upsertUserExamData({
      grade: Number(grade),
      step: Number(step),
      isPromotion: false,
    });
    queryClient.invalidateQueries({ queryKey: ["examData"] });

    router.push("/dashboard/exam");
  };

  if (!words.length) return <LoadingComponent />;

  return (
    <div className="w-[80%] h-[80%] flex justify-center items-center relative">
      {/* 이전, 다음 */}
      {currentIndex !== 0 && (
        <div
          className="p-2 absolute top-[45%] -left-8 md:-left-3 text-2xl md:text-4xl font-bold cursor-pointer"
          onClick={() => handleIndexChange("prev")}
        >
          {"<"}
        </div>
      )}
      {currentIndex !== words.length - 1 && (
        <div
          className="p-2 absolute top-[45%] -right-8 md:-right-3 text-2xl md:text-4xl font-bold cursor-pointer"
          onClick={() => handleIndexChange("next")}
        >
          {">"}
        </div>
      )}

      {/* 단어 박스 */}
      <div
        className="w-full md:w-[80%] h-[400px] md:h-[600px] flex justify-center items-center bg-white rounded-md shadow-lg relative cursor-pointer"
        onClick={() => setIsToggled(!isToggled)}
      >
        {/* 인덱스 표시 */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs md:text-xl font-bold">
          {currentIndex + 1} / {words.length}
        </div>

        {/* 음성 재생 버튼 */}
        <div
          className="w-8 h-8 md:w-10 md:h-10 absolute top-6 right-6 cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            runTTS(words[currentIndex].wordKana);
          }}
        >
          <img
            src="/images/icon/speaker.svg"
            alt="speaker"
            className="w-10 h-10"
          />
        </div>

        <h1
          className={`font-bold ${
            isToggled
              ? "mb-10 text-4xl md:text-[60px] relative bottom-[100px] md:bottom-[160px]"
              : "text-4xl md:text-[60px] xl:text-[80px]"
          }`}
        >
          {words[currentIndex].word}
        </h1>
        {isToggled && (
          <div className="absolute font-sans text-center w-full">
            <div className="text-2xl md:text-4xl">
              {words[currentIndex].wordKana}
            </div>
            <div className="text-xl md:text-2xl font-gowun">
              {words[currentIndex].wordMeaning}
            </div>

            <div className="mt-10">{words[currentIndex].exampleKana}</div>
            <div className="relative w-full">
              <div className="text-xl xl:text-4xl">
                {words[currentIndex].example}
              </div>
              <img
                src="/images/icon/speaker.svg"
                alt="speaker"
                className="md:w-10 md:h-10 w-6 h-6 absolute top-0 right-0 md:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  runTTS(words[currentIndex].exampleKana, 0.5);
                }}
              />
            </div>

            <div className="text-xl md:text-2xl font-gowun">
              {words[currentIndex].exampleMeaning}
            </div>
          </div>
        )}
      </div>

      {/* 시험 버튼 */}
      <Button
        type="button"
        className="w-20! absolute bottom-0 md:-bottom-16"
        onClick={handleExamClick}
      >
        시험
      </Button>
    </div>
  );
};

export default WordList;
