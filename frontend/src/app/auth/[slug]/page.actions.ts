"use server";
import serverAxios from "@/lib/axios.server";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export type FormSubmitActionResults =
  | undefined
  | {
      error?: string;
    };

export const formSubmitAction = async (
  _: unknown,
  formData: FormData
): Promise<FormSubmitActionResults> => {
  const payload = Object.fromEntries(formData);

  try {
    if (payload.slug === "login") {
      await serverAxios.post("api/auth/login", payload);
    } else {
      await serverAxios.post("api/auth/register", payload);
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      return { error: error.response.data };
    }
    console.error(error);
    return { error: "An unknown error occured" };
  }

  redirect("/");
};
