import { AppHeader } from "@/components/header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="p-1">
      <AppHeader />
      {children}
    </div>
  );
};

export default layout;
