"use client";

import { apiGet } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Navbar = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const getUserProgress = async () => {
      if (session) {
        const userId = session.user.id;
        const response = await apiGet(`/user-progress?userId=${userId}`);
        console.log(response.data);
      }
    };
    getUserProgress();
  }, [session]);

  return (
    <div className="w-full h-14 px-4 absolute top-0 left-0 bg-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold font-yuji">Shuren - 修錬</h1>
      <div></div>
    </div>
  );
};

export default Navbar;
