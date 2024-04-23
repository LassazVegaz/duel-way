"use server";
import serverAxios from "@/lib/axios.server";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type FormSubmitActionResults =
  | undefined
  | {
      error?: string;
    };

/**
 * Get cookie details from the cookie string
 */
const getAuthCookie = (cookie: string) => {
  const cookieParts = cookie.split(";").map((part) => part.trim());
  const [name, value] = cookieParts[0].split("=");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return { name, value, expires };
};

const handleLogin = async (form: { [k: string]: FormDataEntryValue }) => {
  const res = await serverAxios.post("api/auth/login", form);
  let authCookie = res.headers["set-cookie"]?.[0]; // for the sake of simplicity
  if (!authCookie) throw new Error("No auth cookie found");
  const c = getAuthCookie(authCookie);
  cookies().set(c.name, c.value, { expires: c.expires });
};

export const formSubmitAction = async (
  _: unknown,
  formData: FormData
): Promise<FormSubmitActionResults> => {
  const payload = Object.fromEntries(formData);

  try {
    if (payload.slug === "login") {
      await handleLogin(payload);
    } else {
      await serverAxios.post("api/auth/register", payload);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return { error: error.response.data };
      } else if (error.response?.status === 401) {
        return { error: "Invalid credentials" };
      }
    }
    console.error(error);
    return { error: "An unknown error occured" };
  }

  redirect("/");
};
