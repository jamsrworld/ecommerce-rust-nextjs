import React from "react";
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Sidebar />
      <div
        className="ml-[280px] flex size-full min-h-dvh grow flex-col bg-background-tertiary p-4"
        style={{
          width: "calc(100% - 280px)",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default layout;