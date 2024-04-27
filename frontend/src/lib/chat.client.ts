import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

let connection: HubConnection | undefined;

export const getConnection = () => {
  if (typeof connection === "undefined") {
    const url = process.env.NEXT_PUBLIC_API_URL + "/chat";
    connection = new HubConnectionBuilder().withUrl(url).build();

    connection
      .start()
      .then(() => console.log("Connected to the chat server"))
      .catch((e) => console.error("Connecting to the chat server failed:", e));
  }
  return connection;
};
