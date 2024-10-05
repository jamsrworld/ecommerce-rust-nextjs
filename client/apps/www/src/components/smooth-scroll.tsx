"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const customScrollBarRef = useRef<HTMLDivElement>(null);

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

  // Update custom scrollbar
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      if (customScrollBarRef.current && contentHeight > windowHeight) {
        // Set scrollbar handle height relative to window and content height
        const scrollHeight = (windowHeight / contentHeight) * windowHeight;
        customScrollBarRef.current.style.height = `${scrollHeight}px`;

        // Set the scroll handle position relative to the current scroll progress
        const targetY = v * (windowHeight - scrollHeight);
        customScrollBarRef.current.style.transform = `translateY(${targetY}px)`;
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, contentHeight, windowHeight]);
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

      {/* Custom Scrollbar */}
      <div className="fixed right-2.5 top-0 z-50 h-screen w-[8px] rounded bg-red-700">
        <div
          className="absolute top-0 w-full rounded bg-purple-400 transition-transform"
          ref={customScrollBarRef}
        />
      </div>
    </>
  );
};
