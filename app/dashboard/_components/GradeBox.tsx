import Link from "next/link";

const GradeBox = ({
  grade,
  bg,
  positionClass,
  isLocked = true,
}: {
  grade: number;
  bg: string;
  positionClass: string;
  isLocked: boolean;
}) => {
  return (
    <Link
      href={`/dashboard/${grade}`}
      className={`${isLocked ? "pointer-events-none" : ""}`}
    >
      <div className="w-full p-4 md:p-10 rounded-lg relative overflow-hidden  md:hover:translate-x-[-15px] shadow-md transition-transform duration-300">
        {/* 배경 이미지 레이어 */}
        <div
          className={`absolute inset-0 rounded-lg ${positionClass} ${
            isLocked ? "opacity-30" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
          }}
        />

        {/* 그라데이션 오버레이 - 오른쪽에서 왼쪽으로 페이드 */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.3) 30%, transparent 100%)",
          }}
        />

        <h1 className="text-2xl md:text-4xl font-bold relative z-10">
          {grade}급
        </h1>
        {isLocked && (
          <p className="text-sm text-red-500 absolute bottom-1 right-1">
            승급을 통해 잠금을 해제하세요.
          </p>
        )}
      </div>
    </Link>
  );
};

export default GradeBox;
