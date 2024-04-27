import axios from "axios";
import { headers } from "next/headers";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverAxios.interceptors.request.use((config) => {
  const cookie = headers().get("Cookie");
  config.headers["Cookie"] = cookie;
  return config;
});

export default serverAxios;
