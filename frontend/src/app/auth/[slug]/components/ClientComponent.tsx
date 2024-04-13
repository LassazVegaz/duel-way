import { onFormSubmit } from "../page.actions";

type ClientComponentProps = {
  slug: string;
};

const InputField = (props: React.ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className="border p-2 text-center bg-transparent text-white placeholder:text-slate-400"
    />
  );
};

export default function ClientComponent(props: ClientComponentProps) {
  return (
    <main className="flex items-center justify-center h-screen">
      <form
        action={onFormSubmit}
        className="flex flex-col max-w-screen-sm w-full gap-5 p-5 md:p-0"
      >
        <InputField type="text" name="name" placeholder="Name" />
        <InputField type="password" name="password" placeholder="Password" />
        <div className="mt-5 text-center">
          <button
            type="submit"
            className="bg-blue-700 text-white rounded-md p-1 min-w-24"
          >
            {props.slug === "login" ? "Login" : "Register"}
          </button>
        </div>
      </form>

      <div className="text-center text-red-600">Hello World</div>
    </main>
  );
}
