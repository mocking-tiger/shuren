const Loading2 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600"></div>
      <p className="text-gray-600 font-yuji text-lg">修練中...</p>
    </div>
  );
};

export default Loading2;
