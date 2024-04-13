import PageParams from "@/types/page-params.type";
import { redirect } from "next/navigation";
import React from "react";
import ClientComponent from "./components/ClientComponent";

const ALLOWED_SLUGS = ["login", "register"];

export default function Home({ params }: PageParams<{ slug: string }>) {
  const slug = params.slug.toLowerCase();
  if (!ALLOWED_SLUGS.includes(slug)) {
    return redirect(`/auth/${ALLOWED_SLUGS[0]}`);
  }

  return <ClientComponent slug={slug} />;
}
