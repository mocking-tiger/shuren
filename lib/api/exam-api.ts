import { apiGet, apiPost, apiPut } from "../axios";

export const updateUserProgress = async (examInfo: {
  grade: number;
  step: number;
  isPromotion: boolean;
}) => {
  const response = await apiPut("/user-progress", { examInfo });
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
