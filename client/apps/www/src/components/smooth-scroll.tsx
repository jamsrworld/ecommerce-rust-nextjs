"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    mass: 0.3,
    stiffness: 50,
  });

  const y = useTransform(
    smoothProgress,
    (v) => v * -(contentHeight - windowHeight),
  );

  const handleResize = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  const debouncedResize = useDebounce(handleResize, 100);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [handleResize, debouncedResize]);
  return (
    <>
      <div style={{ height: contentHeight }} />
      <m.div
        className="fixed top-0 flex w-screen flex-col"
        style={{ y, width: "calc(100% - 6px)" }}
        ref={contentRef}
      >
        {children}
      </m.div>
    </>
  );
};
