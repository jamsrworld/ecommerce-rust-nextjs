import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-2 md:bg-background-secondary">
      {children}
    </div>
  );
};

export default layout;
