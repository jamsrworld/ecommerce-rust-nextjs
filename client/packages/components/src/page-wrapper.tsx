import { m } from "framer-motion";

type Props = { children: React.ReactNode };

export const DashboardPageWrapper = (props: Props) => {
  const { children } = props;
  return (
    <>
      <m.main
        className="_md:!pl-0"
        initial={{
          opacity: 0,
          paddingLeft: 0,
        }}
        animate={{
          opacity: 1,
          paddingLeft: 0,
        }}
        style={{
          backgroundImage: "url(/images/dashboard-bg.webp)",
        }}
      >
        {children}
      </m.main>
      <noscript>
        <style id="motionStyle">{`
          .motion {
            opacity: 1 !important;
          }
        `}</style>
      </noscript>
    </>
  );
};
