"use client";
import { runTTS } from "@/lib/utils/word-utils";
/* eslint-disable @next/next/no-img-element */

import { Word } from "@prisma/client";
import { useState } from "react";

const WordList = ({ words }: { words: Word[] }) => {
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

  if (!words.length) return <div>단어 정보를 불러오지 못했습니다.</div>;
  return (
    <div className="w-full h-full flex justify-center items-center relative border-2 border-red-500">
      <div className="absolute top-6 text-xl font-bold">
        {currentIndex + 1} / {words.length}
      </div>
      <div
        className="p-2 absolute top-[45%] left-6 text-2xl font-bold cursor-pointer"
        onClick={() => handleIndexChange("prev")}
      >
        {"<"}
      </div>
      <div
        className="p-2 absolute top-[45%] right-6 text-2xl font-bold cursor-pointer"
        onClick={() => handleIndexChange("next")}
      >
        {">"}
      </div>
      <div className="w-[80%] h-[80%] flex justify-center items-center bg-white rounded-md shadow-lg relative">
        <div
          className="absolute top-6 right-6 cursor-pointer"
          onClick={() => runTTS(words[currentIndex].wordKana)}
        >
          <img
            src="/images/icon/speaker.svg"
            alt="speaker"
            className="w-10 h-10"
          />
        </div>
        <h1 className="text-4xl md:text-[120px] font-bold">
          {words[currentIndex].word}
        </h1>
      </div>
    </div>
  );
};

export default WordList;
