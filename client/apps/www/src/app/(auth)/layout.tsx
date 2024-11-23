import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-2 md:bg-background-secondary">
      {children}
    </main>
  );
};

export default layout;
