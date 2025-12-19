const GradeBox = ({
  grade,
  bg,
  positionClass,
}: {
  grade: number;
  bg: string;
  positionClass: string;
}) => {
  return (
    <div
      className={`w-full p-4 md:p-10 rounded-lg cursor-pointer hover:translate-y-[-5px] shadow-md transition-transform duration-300 relative overflow-hidden`}
    >
      {/* 배경 이미지 레이어 */}
      <div
        className={`absolute inset-0 rounded-lg ${positionClass}`}
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
    </div>
  );
};

export default GradeBox;
