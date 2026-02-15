import { apiGet, apiPost, apiPut } from "../axios";
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

export const upsertUserExamData = async (examData: {
  grade: number;
  step: number;
  isPromotion: boolean;
}) => {
  const response = await apiPost("/user-exam-data", examData);
  return response.data;
};

export const getUserExamData = async () => {
  const response = await apiGet("/user-exam-data");
  return response.data;
};
