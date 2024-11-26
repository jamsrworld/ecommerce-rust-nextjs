"use client";

import { Button } from "@jamsr-ui/react";
import { ArrowUpIcon } from "@repo/icons/arrow";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export const GoToTop = () => {
  const [screenHeight, setScreenHeight] = useState(0);
  const { scrollY } = useScroll();
  const [isShow, SetIsShow] = useState(false);
  const maxRange = screenHeight * 2;

  useMotionValueEvent(scrollY, "change", (value) => {
    const isScrollingUp = value < (scrollY.getPrevious() ?? 0);
    if (value > maxRange && isScrollingUp) SetIsShow(true);
    else SetIsShow(false);
  });

  const handleOnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const setHeight = () => {
      setScreenHeight(window.innerHeight);
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  if (!isShow) return null;
  return (
    <Button
      isRounded
      isIconOnly
      className="fixed bottom-20 right-8"
      onClick={handleOnClick}
    >
      <ArrowUpIcon />
    </Button>
  );
};
