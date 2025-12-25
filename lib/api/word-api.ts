import { apiGet } from "../axios";

export const fetchWordsByGrade = async (grade: number) => {
  const response = await apiGet(`/words/${grade}`);
  return response.data;
};
