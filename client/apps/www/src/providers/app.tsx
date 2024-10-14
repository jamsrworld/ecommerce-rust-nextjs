"use client";

import {
  Confirmation,
  Toast,
  UIProvider,
  UIStyleProvider,
} from "@jamsr-ui/react";
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
      <QueryProvider>
        <UIStyleProvider
          input={{
            classNames: {
              inputWrapper: "group-data-[focus=true]:border-black",
            },
          }}
        >
          {children}
        </UIStyleProvider>
      </QueryProvider>
    </UIProvider>
  );
};
