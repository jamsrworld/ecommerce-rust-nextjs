import { AppHeader } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="p-1">
      <AppHeader />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
};

export default layout;
