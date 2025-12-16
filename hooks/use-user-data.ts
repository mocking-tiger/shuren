import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserProgress } from "@/lib/api/user-progress-api";

export const useUserData = () => {
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

  return {
    session,
    userProgress,
    isLoading,
    error,
  };
};
