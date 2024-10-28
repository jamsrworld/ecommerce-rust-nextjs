"use client";

import {
  Confirmation,
  ToastProvider,
  UIProvider,
  UIStyleProvider,
} from "@jamsr-ui/react";
import { QueryProvider } from "@repo/components/query-client";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;
  return (
    <UIProvider>
      <ToastProvider />
      <Confirmation />
      <QueryProvider>
        <UIStyleProvider>{children}</UIStyleProvider>
      </QueryProvider>
    </UIProvider>
  );
};
