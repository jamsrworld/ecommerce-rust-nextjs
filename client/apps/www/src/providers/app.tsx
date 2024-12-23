"use client";

import { Confirmation, ToastProvider, UIProvider } from "@jamsr-ui/react";
import { QueryProvider } from "@repo/components/query-client";
import { Analytics } from "@vercel/analytics/react";
import { ThemeScript } from "./theme-script";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;
  return (
    <UIProvider>
      <ThemeScript />
      <Analytics />
      <ToastProvider />
      <Confirmation />
      <QueryProvider>{children}</QueryProvider>
      {/* Make scroll container to relative when js is disabled for native scrolling */}
      {/* <noscript>
        <style>{`#smooth-scroll-container{position:relative}`}</style>
      </noscript> */}
    </UIProvider>
  );
};
