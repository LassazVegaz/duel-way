"use client";
import * as signalR from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SendForm() {
  const [sending, setSending] = useState(false);
  const connection = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/chat";
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .build();

    connection.current
      .start()
      .then(() => {
        console.log("Connected to chat server");
      })
      .catch(() => {});

    return () => {
      connection.current?.stop().then(() => {
        console.log("Disconnected from chat server");
      });
    };
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input") as HTMLInputElement;
    if (!input || !connection.current) return;
    setSending(true);

    try {
      await connection.current.send("SendMessage", input.value);
      input.value = "";
      input.focus();
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <form className="grid grid-cols-[80%,1fr] gap-5" onSubmit={onSubmit}>
      <input type="text" className="py-1 px-2 text-black" disabled={sending} />
      <button
        className="bg-blue-700 text-white"
        type="submit"
        disabled={sending}
      >
        SEND
      </button>
    </form>
  );
}
