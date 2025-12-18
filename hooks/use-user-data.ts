import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/user-api";

export const useUserData = () => {
  const { data: session, status } = useSession();
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUser,
    enabled: status === "authenticated",
  });

  return {
    session,
    userData,
    isLoading,
    error,
  };
};
