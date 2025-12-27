import { apiGet, apiPost } from "../axios";

export const fetchWordsByGrade = async (grade: number) => {
  const response = await apiGet(`/words/${grade}`);
  return response.data;
};

export const fetchWordsAtExam = async (
  grade: number,
  step: number,
  isPromotion: boolean
) => {
  const response = await apiPost(`/words/exam/`, {
    grade,
    step,
    isPromotion,
  });
  return response.data;
};
