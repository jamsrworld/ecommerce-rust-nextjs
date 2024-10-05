"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  // Scroll progress (0 to 1) of the window
  const { scrollYProgress } = useScroll();

  // Use framer motion's useSpring() hook to smooth the scrollYProgress value
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20, // Slightly higher for smoother stops
    mass: 0.3, // Feels more fluid with a bit of weight
    stiffness: 50, // Moderate stiffness for a balanced speed
  });

  // The height of the content in pixels
  const [contentHeight, setContentHeight] = useState(0);

  // The value to transform the content to
  const y = useTransform(
    smoothProgress,
    (v) => v * -(contentHeight - window.innerHeight),
  );

  // A reference to hold the value of the content
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset the `contentHeight` value when the children change, or when the window resizes
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    // Call the resize handler once, initially
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [contentRef]);

  return (
    <>
      {/**
       * An invisible div with the actual height of the content.
       * This will expand the height of the body and trigger the default browser scrollbar.
       */}
      <div style={{ height: contentHeight }} />

      {/**
       * The content.  If it exceeds the height of the viewport, translate its y-position to the top.
       * Its position is fixed by default and moves when the user scrolls.
       */}
      <m.div
        className="fixed top-0 flex w-screen flex-col"
        style={{ y }}
        ref={contentRef}
      >
        {children}
      </m.div>
    </>
  );
};
