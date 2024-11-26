import { AppFooter } from "@/layouts/footer";
import { FooterCTA } from "@/layouts/footer-cta";
import { AppHeader } from "@/layouts/header";
import { GoToTop } from "@repo/components/go-to-top";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <AppHeader />
      <main className="grow">{children}</main>
      <FooterCTA />
      <AppFooter />
      <GoToTop />
      {/* <SmoothScroll key={pathname}>{children}</SmoothScroll> */}
    </>
  );
};

export default Layout;
