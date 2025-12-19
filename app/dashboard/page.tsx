"use client";

import LoginChecker from "../components/auth/LoginChecker";
import { useUserData } from "@/hooks/use-user-data";
import GradeBox from "./components/GradeBox";

const DashboardPage = () => {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <div>
      <LoginChecker />
      <div className="px-4 md:px-32 py-4 md:py-16 flex flex-col gap-4 overflow-y-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <GradeBox key={index} grade={9 - index} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
