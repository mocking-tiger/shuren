"use client";
/* eslint-disable @next/next/no-img-element */

import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import LoadingComponent from "@/app/components/ui/Loading";
import { useState } from "react";
import { Word } from "@prisma/client";
import { useRouter } from "next/navigation";
import { runTTS } from "@/lib/utils/word-utils";
import { useUserData } from "@/hooks/use-user-data";
import { updateUserProgress } from "@/lib/api/exam-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type WordWithChoice = Word & { choice: string[] };

const WordListForExam = ({ words }: { words: WordWithChoice[] }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userData } = useUserData();
  const { mutate } = useMutation({
    mutationFn: updateUserProgress,
    onSuccess: async () => {
      // DB 업데이트 완료 후 최신 데이터를 확실히 가져온 후 페이지 이동
      // (타이밍 이슈 방지: 서버 컴포넌트가 이전 데이터를 읽는 것을 방지)
      await queryClient.refetchQueries({ queryKey: ["userData"] });

      // Supabase 무료 플랜의 레플리케이션 지연을 고려한 추가 대기
      // 서버 컴포넌트가 getServerUser()로 조회할 때 최신 데이터를 읽도록 보장
      await new Promise((resolve) => setTimeout(resolve, 300));

      router.push("/dashboard/exam/victory");
    },
    onError: () => {
      toast.error("프로그레스 업데이트에 실패했습니다.");
    },
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState({ word: "", isCorrect: false });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  const handleVictory = async () => {
    const examData = JSON.parse(sessionStorage.getItem("examData") || "{}");
    mutate({
      userProgress: userData.userProgress,
      examInfo: {
        grade: examData.grade,
        step: examData.step,
        isPromotion: examData.isPromotion,
      },
    });
  };

  const handleClickAnswer = (choice: string) => {
    if (choice === words[currentIndex].wordMeaning) {
      setIsButtonDisabled(true);
      setIsCorrect({ word: choice, isCorrect: true });
      setTimeout(() => {
        setIsCorrect({ word: "", isCorrect: false });
        if (currentIndex === words.length - 1) {
          handleVictory();
        } else {
          handleIndexChange("next");
          setIsButtonDisabled(false);
        }
      }, 1000);
    } else {
      setIsButtonDisabled(true);
      setIsCorrect({ word: choice, isCorrect: false });
      setTimeout(() => {
        setIsCorrect({ word: "", isCorrect: false });
        setIsButtonDisabled(false);
        router.push("/dashboard/exam/defeat");
      }, 1000);
    }
  };

  if (!words.length) return <LoadingComponent />;
  return (
    <div className="w-[80%] h-[80%] flex justify-center items-center relative">
      {/* 인덱스 표시 */}
      <div className="absolute top-6 text-xl font-bold">
        {currentIndex + 1} / {words.length}
      </div>

      {/* 단어 박스 */}
      <div className="w-full md:w-[80%] h-[400px] md:h-[600px] flex flex-col justify-center items-center bg-white rounded-md shadow-lg relative">
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

        {isCorrect.word === words[currentIndex].wordMeaning && (
          <span className="absolute top-[30px] md:top-[80px] xl:top-[60px] md:text-2xl">
            {words[currentIndex].wordKana}
          </span>
        )}
        <h1 className="text-4xl md:text-[60px] xl:text-[80px] font-bold relative bottom-[20px] md:bottom-[80px]">
          {words[currentIndex].word}
        </h1>

        {/* 선택지 버튼 */}
        <div className="px-4 flex flex-col md:grid md:grid-cols-2 gap-4">
          {words[currentIndex].choice.map((choice, index) => (
            <Button
              key={index}
              type="button"
              className={`text-base md:text-xl xl:text-2xl font-bold bg-white text-black! ${
                isCorrect.word === choice && isCorrect.isCorrect
                  ? "bg-green-500! text-white!"
                  : isCorrect.word === choice && !isCorrect.isCorrect
                  ? "bg-red-500! text-white!"
                  : "bg-white"
              }`}
              onClick={() => handleClickAnswer(choice)}
              disabled={isButtonDisabled}
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
