"use client";

import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { signOut } from "next-auth/react";
import { useUserData } from "@/hooks/use-user-data";

const Navbar = () => {
  const { session, userData, isLoading, error } = useUserData();
  return (
    <div className="w-full h-14 px-4 absolute top-0 left-0 bg-white flex justify-between items-center shadow-md">
      <Link href="/dashboard">
        <h1 className="text-md 2xl:text-2xl font-bold font-yuji">
          Shuren - 修錬
        </h1>
      </Link>
      {isLoading && <div>사용자 정보 로딩중...</div>}
      {error && <div>사용자 정보 로딩 실패</div>}
      {session && userData && (
        <div className="w-fit flex items-center gap-3">
          <Link href="/dashboard/profile">
            <div className="min-w-30 flex items-center gap-2">
              <span className="hidden md:block text-right text-sm">
                {userData.userProgress.isMaster
                  ? "사범"
                  : `${userData.userProgress.currentGrade}급`}
              </span>
              <span className="text-right overflow-hidden">
                {userData.name}
              </span>
            </div>
          </Link>
          <Button
            className="w-20! text-sm"
            type="button"
            onClick={() => signOut()}
          >
            로그아웃
          </Button>
        </div>
      )}
      {!session && !userData && <div>사용자 정보 로딩 중...</div>}
    </div>
  );
};

export default Navbar;
