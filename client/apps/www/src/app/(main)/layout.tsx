import { AppFooter } from "@/layouts/footer";
import { AppHeader } from "@/layouts/header";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <AppHeader />
      <div className="grow">{children}</div>
      <AppFooter />
      {/* <SmoothScroll key={pathname}>{children}</SmoothScroll> */}
    </>
  );
};

export default Layout;
