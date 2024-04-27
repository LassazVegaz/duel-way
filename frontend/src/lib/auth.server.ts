import { cookies } from "next/headers";
import serverAxios from "./axios.server";
import User from "@/types/user.type";
import { AxiosError } from "axios";

export const isLoggedIn = () => {
  return cookies().has("auth-cookie");
};

export const getLoggedInUser = async () => {
  try {
    const res = await serverAxios.get<User>("/api/auth");
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
