import { fetchWordsByGrade } from "@/lib/api/word-api";
import { useQuery } from "@tanstack/react-query";

export const useWords = (grade: number, step?: number) => {
  const {
    data: allWords = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["words", grade],
    queryFn: () => fetchWordsByGrade(grade),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const words = step ? allWords?.slice((step - 1) * 9, step * 9) : allWords;

  return { words, isLoading, error };
};
