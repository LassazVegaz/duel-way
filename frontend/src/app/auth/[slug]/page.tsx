import PageParams from "@/types/page-params.type";
import { redirect } from "next/navigation";
import React from "react";

const ALLOWED_SLUGS = ["login", "register"];

const InputField = (props: React.ComponentProps<"input">) => {
  return <input {...props} className="border p-2 text-center" />;
};

export default function Home({ params }: PageParams<{ slug: string }>) {
  const slug = params.slug.toLowerCase();
  if (!ALLOWED_SLUGS.includes(slug)) {
    return redirect(`/auth/${ALLOWED_SLUGS[0]}`);
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <form className="flex flex-col max-w-screen-sm w-full gap-5 p-5 md:p-0">
        <InputField type="text" placeholder="Name" />
        <InputField type="password" placeholder="Password" />
        <div className="mt-5 text-center">
          <button
            type="submit"
            className="bg-blue-700 text-white rounded-md p-1 min-w-24"
          >
            {slug === "login" ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </main>
  );
}
