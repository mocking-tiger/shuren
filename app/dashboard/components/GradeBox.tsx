const GradeBox = ({ grade }: { grade: number }) => {
  return (
    <div className="w-full p-4 md:p-10 rounded-lg bg-gray-200/60 cursor-pointer hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
      <h1 className="text-2xl md:text-4xl font-bold">{grade}급</h1>
    </div>
  );
};

export default GradeBox;
