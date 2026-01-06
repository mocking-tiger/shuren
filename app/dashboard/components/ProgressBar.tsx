// components/ExperienceProgressBar.tsx

"use client";

import { UserProgress } from "@prisma/client";

interface ProgressBarProps {
  userProgress: UserProgress;
  isPlayAnimation?: boolean;
}

const ProgressBar = ({
  userProgress,
  isPlayAnimation = false,
}: ProgressBarProps) => {
  const { currentGrade, exp } = userProgress;

  // exp에 따른 퍼센트 계산
  const getProgressPercent = (exp: number) => {
    switch (exp) {
      case 1:
        return 33;
      case 2:
        return 66;
      case 3:
        return 100;
      default:
        return 0;
    }
  };

  const progressPercent = getProgressPercent(exp);

  return (
    <div className="w-full max-w-md">
      {/* 등급 표시 */}
      <div className="flex justify-between mb-2 text-lg font-bold">
        <span>{currentGrade}급</span>
        <span>{currentGrade - 1 === 0 ? "사범" : `${currentGrade - 1}급`}</span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-linear-to-r from-blue-400 to-blue-600 ${
            isPlayAnimation ? "animate-progress" : ""
          }`}
          style={{
            width: `${progressPercent}%`,
            ...(isPlayAnimation && { animationName: `progress-${exp}` }),
          }}
        />
      </div>

      {/* 퍼센트 표시 */}
      <div className="text-center mt-2 text-sm text-gray-600">
        {progressPercent}%
      </div>

      <style jsx>{`
        @keyframes progress-1 {
          from {
            width: 0%;
          }
          to {
            width: 33%;
          }
        }
        @keyframes progress-2 {
          from {
            width: 33%;
          }
          to {
            width: 66%;
          }
        }
        @keyframes progress-3 {
          from {
            width: 66%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation-duration: 1s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
