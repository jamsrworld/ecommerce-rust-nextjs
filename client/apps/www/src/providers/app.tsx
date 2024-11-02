"use client";

import {
  Confirmation,
  ToastProvider,
  UIProvider,
  UIStyleProvider,
} from "@jamsr-ui/react";
import type { UIStyleType } from "@jamsr-ui/types";
import { QueryProvider } from "@repo/components/query-client";

type Props = {
  children: React.ReactNode;
};

declare module "@jamsr-ui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface UIStyleContextType extends UIStyleType {}
}

export const AppProvider = (props: Props) => {
  const { children } = props;
  return (
    <UIProvider>
      <ToastProvider />
      <Confirmation />
      <QueryProvider>
        <UIStyleProvider
          input={{
            classNames: {
              innerWrapper: "bg-gray-100",
            },
          }}
          card={{
            className: "bg-gray-100",
          }}
          cardContent={{
            className: "bg-red-100",
          }}
        >
          {children}
        </UIStyleProvider>
      </QueryProvider>
    </UIProvider>
  );
};
