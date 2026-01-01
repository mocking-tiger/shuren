import { apiPut } from "../axios";
import { UserProgress } from "@prisma/client";

export const updateUserProgress = async (progress: UserProgress) => {
  const response = await apiPut("/user-progress", progress);
  return response.data;
};
