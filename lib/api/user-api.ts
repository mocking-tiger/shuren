import { apiGet } from "../axios";

export const getUser = async () => {
  const response = await apiGet("/user");
  return response.data;
};
