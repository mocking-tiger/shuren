"use client";
/* eslint-disable @next/next/no-img-element */

import Button from "@/app/components/ui/Button";
import { useState } from "react";
import { Word } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { runTTS } from "@/lib/utils/word-utils";

export type WordWithChoice = Word & { choice: string[] };

const WordListForExam = ({ words }: { words: WordWithChoice[] }) => {
  const { grade, step } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (direction: "prev" | "next") => {
    if (currentIndex === 0 && direction === "prev") {
      return;
    }
    if (currentIndex === words.length - 1 && direction === "next") {
      return;
    }
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleClickAnswer = () => {};

  if (!words.length) return <div>단어 정보를 불러오지 못했습니다.</div>;
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      {/* 인덱스 표시 */}
      <div className="absolute top-6 text-xl font-bold">
        {currentIndex + 1} / {words.length}
      </div>

      {/* 이전, 다음 */}
      <div
        className="p-2 absolute top-[45%] left-1 md:left-6 text-2xl font-bold cursor-pointer"
        onClick={() => handleIndexChange("prev")}
      >
        {"<"}
      </div>
      <div
        className="p-2 absolute top-[45%] right-1 md:right-6 text-2xl font-bold cursor-pointer"
        onClick={() => handleIndexChange("next")}
      >
        {">"}
      </div>

      {/* 단어 박스 */}
      <div className="w-[80%] h-[80%] flex flex-col justify-center items-center bg-white rounded-md shadow-lg relative">
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

        <h1 className="text-4xl md:text-[120px] font-bold relative bottom-[50px] md:bottom-[80px]">
          {words[currentIndex].word}
        </h1>

        {/* 선택지 버튼 */}
        <div className="px-4 flex flex-col md:grid md:grid-cols-2 gap-4">
          {words[currentIndex].choice.map((choice, index) => (
            <Button
              key={index}
              type="button"
              className="text-xl md:text-2xl font-bold bg-white text-black!"
            >
              {choice}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordListForExam;
