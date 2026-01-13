const Loading3 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative">
        <div className="animate-ping absolute h-16 w-16 rounded-full bg-blue-400 opacity-75"></div>
        <div className="relative h-16 w-16 rounded-full bg-blue-600"></div>
      </div>
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading3;
