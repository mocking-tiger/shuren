import { apiGet, apiPut } from "../axios";
import { ProfileFormData } from "@/app/dashboard/profile/page";

export const getUser = async () => {
  const response = await apiGet("/user");
  return response.data;
};

export const updateUser = async (data: ProfileFormData) => {
  const response = await apiPut("/user", data);
  return response.data;
};
