import { redirect, RedirectType } from "next/navigation";

export default function AuthPage() {
  return redirect("/auth/login", RedirectType.replace);
}
