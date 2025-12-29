import { fetchMeanings } from "@/lib/api/word-api";
import { useQuery } from "@tanstack/react-query";

export const useMeanings = () => {
  return useQuery({
    queryKey: ["meanings"],
    queryFn: fetchMeanings,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
