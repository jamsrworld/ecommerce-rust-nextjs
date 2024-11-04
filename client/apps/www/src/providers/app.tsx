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
      <ToastProvider />
      <Confirmation />
      <QueryProvider>
        <UIStylesProvider
        // input={{
        //   classNames: {
        //     innerWrapper: "bg-gray-100/20",
        //   },
        // }}
        >
          {children}
        </UIStylesProvider>
      </QueryProvider>
    </UIProvider>
  );
};
