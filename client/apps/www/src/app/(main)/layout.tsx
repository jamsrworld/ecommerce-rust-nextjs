import { AppHeader } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <AppHeader />
      <SmoothScroll>{children}</SmoothScroll>
      {/* {children} */}
    </>
  );
};

export default layout;
