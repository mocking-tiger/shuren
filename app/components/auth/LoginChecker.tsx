"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginChecker = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const PUBLIC_PATHS = ["/", "/signup"];

  useEffect(() => {
    if (status === "loading") return;
    if (!session && !PUBLIC_PATHS.includes(pathname)) {
      router.push("/");
    } else if (session && PUBLIC_PATHS.includes(pathname)) {
      router.push("/dashboard");
    }
  }, [session, router, pathname]);

  return null;
};

export default LoginChecker;
