import { getLoggedInUser, isLoggedIn } from "@/lib/auth.server";
import { redirect, RedirectType } from "next/navigation";
import ChatBoard from "./components/ChatBoard";
import SendForm from "./components/SendForm";

export default async function AuthPage() {
  if (!isLoggedIn()) redirect("/auth/login", RedirectType.replace);
  const user = await getLoggedInUser();

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-full h-full max-w-screen-sm max-h-[500px] px-5 sm:px-0 grid grid-rows-[1fr,auto] gap-8">
        <ChatBoard loggedInUser={user!.name} />

        <SendForm />
      </div>
    </main>
  );
}
