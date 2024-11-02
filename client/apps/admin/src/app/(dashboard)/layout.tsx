import { AppHeader } from "@/layouts/header";
import { Sidebar } from "@/layouts/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Sidebar />
      <div
        className="ml-[280px] flex size-full min-h-dvh grow flex-col bg-background-tertiary"
        style={{
          width: "calc(100% - 280px)",
        }}
      >
        <AppHeader />
        <main className="p-4">{children}</main>
      </div>
    </>
  );
};

export default layout;
