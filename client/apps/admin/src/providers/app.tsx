"use client";

import { Confirmation, ToastProvider, UIProvider } from "@jamsr-ui/react";
import { UIStylesProvider } from "@jamsr-ui/styles";
import { QueryProvider } from "@repo/components/query-client";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;
  return (
    <UIProvider>
      <ToastProvider toastOptions={{  }} />
      <Confirmation />
      <QueryProvider>
        <UIStylesProvider>{children}</UIStylesProvider>
      </QueryProvider>
    </UIProvider>
  );
};
