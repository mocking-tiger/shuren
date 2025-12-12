import { apiGet } from "../axios";

export const getUserProgress = async () => {
  const response = await apiGet("/user-progress");
  return response.data;
};
