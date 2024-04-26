import { isLoggedIn } from "@/lib/auth.server";
import { redirect, RedirectType } from "next/navigation";
import ChatBoard from "./components/ChatBoard";
import SendForm from "./components/SendForm";

export default function AuthPage() {
  if (!isLoggedIn()) redirect("/auth/login", RedirectType.replace);

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-full h-full max-w-screen-sm max-h-[500px] px-5 sm:px-0 grid grid-rows-[1fr,auto] gap-8">
        <ChatBoard />

        <SendForm />
      </div>
    </main>
  );
}
