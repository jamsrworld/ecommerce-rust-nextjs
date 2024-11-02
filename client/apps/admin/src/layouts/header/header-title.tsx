"use client";

import { Typography } from "@jamsr-ui/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export const HeaderTitle = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  useLayoutEffect(() => {
    setTitle(document.title);
  }, [pathname]);
  return (
    <div>
      <Typography
        as="h1"
        variant="h6"
      >
        {title}
      </Typography>
    </div>
  );
};
