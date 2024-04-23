import { isLoggedIn } from "@/lib/auth.server";
import { redirect, RedirectType } from "next/navigation";

export default function AuthPage() {
  if (!isLoggedIn()) redirect("/auth/login", RedirectType.replace);

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-full h-full max-w-screen-sm max-h-[500px] px-5 sm:px-0 grid grid-rows-[1fr,auto] gap-8">
        <div className="border border-blue-400 py-2 px-3">
          <div className="text-center text-white">A user joined the chat</div>
          <div className="text-center text-white">A user joined the chat</div>
          <div className="text-center text-white">A user joined the chat</div>
        </div>

        <form className="grid grid-cols-[80%,1fr] gap-5">
          <input type="text" className="py-1 px-2" />
          <button className="bg-blue-700 text-white" type="submit">
            SEND
          </button>
        </form>
      </div>
    </main>
  );
}
