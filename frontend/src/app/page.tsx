"use client";
import React, { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const Message = (props: React.ComponentProps<"div">) => (
  <div className="bg-gray-100 p-2 rounded-md" {...props} />
);

export default function Home() {
  const connection = React.useRef<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (connection.current && input) {
        connection.current.invoke("SendMessage", input);
        setInput("");
      }
    },
    [input]
  );

  useEffect(() => {
    let mounted = true;

    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:8000/chat")
      .build();

    connection.current.on("ReceiveMessage", (message) => {
      if (mounted) {
        setMessages((prev) => [...prev, message]);
      }
    });

    connection.current.start().catch((e) => mounted && console.error(e));

    return () => {
      mounted = false;
      connection.current?.stop().then(() => console.log("Disconnected"));
    };
  }, []);

  return (
    <main className="h-screen py-5 flex justify-center">
      <div className="max-w-screen-sm w-full px-5 md:px-0 grid grid-rows-[1fr,auto]">
        {messages.length === 0 ? (
          <p className="flex items-center justify-center h-full">
            Send a message to see the magic!
          </p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">Messages</h2>
            <div className="flex flex-col gap-2 mt-4">
              {messages.map((m, i) => (
                <Message key={i}>{m}</Message>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid grid-cols-[auto,100px] gap-5">
          <input
            required
            type="text"
            className="px-2 border border-black w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-black text-white py-2" type="submit">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
