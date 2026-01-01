import { apiPut } from "../axios";
import { UserProgress } from "@prisma/client";

export const updateUserProgress = async (progress: {
  userProgress: UserProgress;
  examInfo: {
    grade: number;
    step: number;
    isPromotion: boolean;
  };
}) => {
  const response = await apiPut("/user-progress", progress);
  return response.data;
};
