import { AppHeader } from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <AppHeader />
      {children}
      {/* <SmoothScroll key={pathname}>{children}</SmoothScroll> */}
    </>
  );
};

export default Layout;
