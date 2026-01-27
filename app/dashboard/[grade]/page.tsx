"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import LoadingComponent from "@/app/components/ui/Loading";
import { useParams } from "next/navigation";
import { useUserData } from "@/hooks/use-user-data";

const DashboardGradePage = () => {
  const { grade } = useParams();
  const { userData } = useUserData();

  if (!userData || !userData.userProgress) return <LoadingComponent />;

  return (
    <div>
      <div className="px-4 md:px-32 2xl:w-[60%] 2xl:mx-auto py-4 md:py-16 flex flex-col gap-4 overflow-y-auto">
        {Array.from({ length: 3 }).map((_, index) => {
          const isLocked =
            userData.userProgress.currentGrade >= Number(grade) &&
            userData.userProgress.exp < index;
          return (
            <Link
              href={`/dashboard/${grade}/${index + 1}`}
              key={index}
              className={`${isLocked ? "pointer-events-none" : ""}`}
            >
              <div
                className={`w-full p-4 md:p-10 rounded-lg bg-white shadow-md md:hover:translate-x-[-15px] transition-transform duration-300 relative ${
                  isLocked ? "opacity-30" : "opacity-100"
                }`}
              >
                <h1 className="text-2xl md:text-4xl font-bold relative z-10 font-yuji">
                  第{index + 1}歩
                </h1>
                {(userData.userProgress.currentGrade < Number(grade) ||
                  userData.userProgress.exp >= index + 1) && (
                  <img
                    src={`/images/icon/sumi.svg`}
                    alt="sumi-icon"
                    className="w-10 h-10 absolute top-2 right-2"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardGradePage;
