"use client";
import store from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

type Props = {
  children?: ReactNode;
};

export default function ReduxProvider(props: Props) {
  return <Provider store={store}>{props.children}</Provider>;
}
