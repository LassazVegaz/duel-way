import { isLoggedIn } from "@/lib/auth.server";
import { redirect, RedirectType } from "next/navigation";

export default function AuthPage() {
  if (!isLoggedIn()) redirect("/auth/login", RedirectType.replace);

  return <main>Hello World</main>;
}
