"use client";

import { useSession } from "next-auth/react";
import LoginChecker from "../components/auth/LoginChecker";

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <LoginChecker />
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
