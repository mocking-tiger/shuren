"use client";

import Button from "@/app/components/ui/Button";
import { getUserProgress } from "@/lib/api/user-progress-api";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  const {
    data: userProgress,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProgress"],
    queryFn: getUserProgress,
    enabled: status === "authenticated",
  });
  return (
    <div className="w-full h-14 px-4 absolute top-0 left-0 bg-white flex justify-between items-center shadow-md">
      <Link href="/dashboard">
        <h1 className="text-2xl font-bold font-yuji">Shuren - 修錬</h1>
      </Link>
      {isLoading && <div>사용자 정보 로딩중...</div>}
      {error && <div>사용자 정보 로딩 실패</div>}
      {session && userProgress && (
        <div className="w-fit flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-16">{userProgress.currentGrade}급</span>
            <span className="min-w-16">{session.user.name}</span>
          </div>
          <Button type="button" onClick={() => signOut()}>
            로그아웃
          </Button>
        </div>
      )}
      {!session && !userProgress && <div>사용자 정보 로딩 중...</div>}
    </div>
  );
};

export default Navbar;
