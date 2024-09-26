"use client";

import { Confirmation, JamsrUIProvider, Toast } from "@jamsr-ui/react";
import { QueryProvider } from "./client";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;
  return (
    <JamsrUIProvider>
      <Toast />
      <Confirmation />
      <QueryProvider>{children}</QueryProvider>;
    </JamsrUIProvider>
  );
};
