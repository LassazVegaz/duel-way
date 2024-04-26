"use client";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { twMerge } from "tailwind-merge";

// --- PROPS ---
type SystemMessageProps = {
  children: React.ReactNode;
};

type UserMessageProps = {
  currentUser?: boolean;
  userName: string;
  children: React.ReactNode;
};

// --- GENERAL TYPES ---
type Message = {
  content: string;
} & ({ sender: "system" } | { sender: "user"; senderName: string });

const SystemMessage = (props: SystemMessageProps) => (
  <div className="flex justify-center text-slate-200">
    <div className="bg-slate-900 px-5 py-1 rounded border border-slate-700">
      {props.children}
    </div>
  </div>
);

const UserMessage = (props: UserMessageProps) => (
  <div
    className={twMerge("flex", !props.currentUser && "justify-end text-right")}
  >
    <div className="bg-slate-800 rounded py-1">
      <p className="text-xs text-slate-400 px-2 border-b border-slate-700">
        {props.userName}
      </p>
      <p className="mt-1.5 overflow-hidden px-2 text-wrap">{props.children}</p>
    </div>
  </div>
);

const ChatBoard = () => {
  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/chat";
    const connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    connection.on("UserJoined", (user: string) => {
      setMsgs((msgs) => [
        ...msgs,
        { sender: "system", content: `${user} joined the chat` },
      ]);
    });

    connection.on("UserLeft", (user: string) => {
      setMsgs((msgs) => [
        ...msgs,
        { sender: "system", content: `${user} left the chat` },
      ]);
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
    <div className="border border-blue-400 py-2 px-3 flex flex-col gap-5 overflow-y-auto">
      {msgs.map((msg, i) =>
        msg.sender === "user" ? (
          <UserMessage
            key={i}
            currentUser={msg.senderName === "lasindu"}
            userName={msg.senderName}
          >
            {msg.content}
          </UserMessage>
        ) : (
          <SystemMessage key={i}>{msg.content}</SystemMessage>
        )
      )}
    </div>
  );
};

export default ChatBoard;
