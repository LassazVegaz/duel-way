"use server";
import serverAxios from "@/lib/axios.server";
import { AxiosError } from "axios";

export type FormSubmitActionResults =
  | undefined
  | {
      error?: string;
    };

const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

export const formSubmitAction = async (
  _: unknown,
  formData: FormData
): Promise<FormSubmitActionResults> => {
  await sleep(5000);
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
};
