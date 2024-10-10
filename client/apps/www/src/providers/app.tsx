"use client";

import { Confirmation, Toast, UIProvider } from "@jamsr-ui/react";
import { QueryProvider } from "./client";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;
  return (
    <UIProvider>
      <Toast />
      <Confirmation />
      <QueryProvider>{children}</QueryProvider>
    </UIProvider>
  );
};
