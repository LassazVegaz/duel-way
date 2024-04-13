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
    await serverAxios.post("api/auth/register", payload);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      return { error: "This user name is taken" };
    }
    console.error(error);
    return { error: "An unknown error occured" };
  }

  redirect("/");
};
