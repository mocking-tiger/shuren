"use client";

import { useState } from "react";
import Loading1 from "../components/Loading1";
import Loading2 from "../components/Loading2";
import Loading3 from "../components/Loading3";
import Loading4 from "../components/Loading4";

const TestPage = () => {
  const [selected, setSelected] = useState(2);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Loading Component Test</h1>

      {/* 버튼들 */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setSelected(1)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            selected === 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Loading 1
        </button>
        <button
          onClick={() => setSelected(2)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            selected === 2
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Loading 2
        </button>
        <button
          onClick={() => setSelected(3)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            selected === 3
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Loading 3
        </button>
        <button
          onClick={() => setSelected(4)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            selected === 4
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Loading 4
        </button>
      </div>

      {/* 로딩 컴포넌트 표시 영역 */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Current: Loading {selected}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          {selected === 1 ? "※ 전체 화면 오버레이로 표시됩니다" : ""}
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg relative h-[300px]">
          {selected === 2 && <Loading2 />}
          {selected === 3 && <Loading3 />}
          {selected === 4 && <Loading4 />}
        </div>
      </div>

      {/* Loading1은 전체 화면 오버레이로 표시 */}
      {selected === 1 && <Loading1 />}
    </div>
  );
};

export default TestPage;
