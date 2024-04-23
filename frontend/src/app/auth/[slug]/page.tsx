import PageParams from "@/types/page-params.type";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import ClientComponent from "./components/ClientComponent";
import { isLoggedIn } from "@/lib/auth.server";

const ALLOWED_SLUGS = ["login", "register"];

export default function Home({ params }: PageParams<{ slug: string }>) {
  if (isLoggedIn()) redirect("/", RedirectType.replace);

  const slug = params.slug.toLowerCase();
  if (!ALLOWED_SLUGS.includes(slug)) {
    return redirect(`/auth/${ALLOWED_SLUGS[0]}`, RedirectType.replace);
  }

  return <ClientComponent slug={slug} />;
}
