"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { twMerge } from "tailwind-merge";
import { getConnection } from "@/lib/chat.client";

// --- PROPS ---
type SystemMessageProps = {
  children: React.ReactNode;
};

type ChatBoardProps = {
  loggedInUser: string;
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

const ChatBoard = (props: ChatBoardProps) => {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      boardRef.current?.scrollTo({
        top: boardRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  useEffect(() => {
    const connection = getConnection();

    const onUserJoined = (user: string) => {
      setMsgs((msgs) => [
        ...msgs,
        { sender: "system", content: `${user} joined the chat` },
      ]);
      scrollToBottom();
    };

    const onUserLeft = (user: string) => {
      setMsgs((msgs) => [
        ...msgs,
        { sender: "system", content: `${user} left the chat` },
      ]);
      scrollToBottom();
    };

    const onRecieveMessage = (user: string, message: string) => {
      setMsgs((msgs) => [
        ...msgs,
        { sender: "user", content: message, senderName: user },
      ]);
      scrollToBottom();
    };

    connection.on("UserJoined", onUserJoined);
    connection.on("UserLeft", onUserLeft);
    connection.on("ReceiveMessage", onRecieveMessage);

    return () => {
      connection.off("UserJoined", onUserJoined);
      connection.off("UserLeft", onUserLeft);
      connection.off("ReceiveMessage", onRecieveMessage);
    };
  }, [scrollToBottom]);

  return (
    <div
      ref={boardRef}
      className="border border-blue-400 py-2 px-3 flex flex-col gap-5 overflow-y-auto"
    >
      {msgs.map((msg, i) =>
        msg.sender === "user" ? (
          <UserMessage
            key={i}
            currentUser={msg.senderName === props.loggedInUser}
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
