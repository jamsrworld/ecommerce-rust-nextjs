"use client";

import { AppHeader } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  const pathname = usePathname();
  return (
    <>
      <AppHeader />
      <SmoothScroll key={pathname}>{children}</SmoothScroll>
    </>
  );
};

export default Layout;
