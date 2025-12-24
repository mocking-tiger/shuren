"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const DashboardGradePage = () => {
  const { grade } = useParams();

  return (
    <div>
      <div className="px-4 md:px-32 py-4 md:py-16 flex flex-col gap-4 overflow-y-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <Link href={`/dashboard/${grade}/${index + 1}`} key={index}>
            <div className="w-full p-4 md:p-10 rounded-lg bg-white shadow-md md:hover:translate-x-[-15px] transition-transform duration-300">
              <h1 className="text-2xl md:text-4xl font-bold relative z-10 font-yuji">
                第{index + 1}歩
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardGradePage;
