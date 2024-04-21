"use client";
import { useFormState, useFormStatus } from "react-dom";
import { formSubmitAction, FormSubmitActionResults } from "../page.actions";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

type ClientComponentProps = {
  slug: string;
};

type SubmitButtonProps = ClientComponentProps;

const InputField = (props: React.ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className="border p-2 text-center bg-transparent text-white placeholder:text-slate-400"
    />
  );
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={twMerge(
        "bg-blue-700 text-white rounded-md p-1 min-w-24",
        pending && "bg-slate-600"
      )}
      disabled={pending}
    >
      {props.slug === "login" ? "Login" : "Register"}
    </button>
  );
};

export default function ClientComponent(props: ClientComponentProps) {
  const [state, action] = useFormState(formSubmitAction, {});

  const oppositeSlug = props.slug === "login" ? "register" : "login";

  return (
    <main className="flex items-center justify-center h-screen">
      <form
        action={action}
        className="flex flex-col max-w-screen-sm w-full gap-5 p-5 md:p-0"
      >
        <InputField type="text" name="name" placeholder="Name" required />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input type="hidden" name="slug" value={props.slug} />
        <div className="mt-5 text-center">
          <SubmitButton slug={props.slug} />
        </div>

        <Link
          className="text-white text-center underline"
          href={`/auth/${oppositeSlug}`}
        >
          {oppositeSlug}
        </Link>
      </form>

      <div className="text-center text-red-600 absolute bottom-10">
        {state?.error}
      </div>
    </main>
  );
}
