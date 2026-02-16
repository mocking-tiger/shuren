const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="relative">
        {/* 외부 회전 원 */}
        <div className="absolute inset-0 animate-spin">
          <div className="h-24 w-24 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
        </div>

        {/* 중간 반대 회전 원 */}
        <div className="absolute inset-0 animate-spin-reverse">
          <div className="h-24 w-24 rounded-full border-4 border-transparent border-b-pink-400 border-l-indigo-400"></div>
        </div>

        {/* 중앙 아이콘 */}
        <div className="h-24 w-24 flex items-center justify-center">
          <div className="text-center animate-pulse">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              あ
            </div>
          </div>
        </div>
      </div>

      {/* 로딩 텍스트 */}
      <div className="absolute bottom-1/3 text-center">
        <p className="text-gray-600 font-medium animate-pulse">로딩중...</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
