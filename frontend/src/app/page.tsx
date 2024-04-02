"use client";

import React from "react";

const Message = (props: React.ComponentProps<"div">) => (
  <div className="bg-gray-100 p-2 rounded-md" {...props} />
);

export default function Home() {
  return (
    <main className="h-screen py-5 flex justify-center">
      <div className="max-w-screen-sm w-full px-5 md:px-0 grid content-between">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <div className="flex flex-col gap-2 mt-2">
            <Message>Hello</Message>
            <Message>Hello</Message>
            <Message>Hello</Message>
          </div>
        </div>

        <div className="grid grid-cols-[auto,100px] gap-5">
          <input type="text" className="border border-black w-full" />
          <button className="bg-black text-white py-2">Send</button>
        </div>
      </div>
    </main>
  );
}
