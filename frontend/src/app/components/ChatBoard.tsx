"use client";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const ChatBoard = () => {
  const [msgs, setMsgs] = useState<string[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/chat";
    const connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    connection.on("UserJoined", (user: string) => {
      setMsgs((msgs) => [...msgs, `${user} joined the chat`]);
    });

    connection.on("UserLeft", (user: string) => {
      setMsgs((msgs) => [...msgs, `${user} left the chat`]);
    });

    connection
      .start()
      .then(() => {
        console.log("Connected to chat server");
      })
      .catch(() => {});

    return () => {
      connection.stop().then(() => {
        console.log("Disconnected from chat server");
      });
    };
  }, []);

  return (
    <div className="border border-blue-400 py-2 px-3 flex flex-col gap-5">
      {msgs.map((msg, i) => (
        <div key={i} className="flex justify-center text-slate-200">
          <div className="bg-slate-900 px-5 py-1 rounded border border-slate-700">
            {msg}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBoard;
