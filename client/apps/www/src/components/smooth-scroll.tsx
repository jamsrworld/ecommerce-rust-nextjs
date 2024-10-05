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
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollY, setStartScrollY] = useState(0);

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

  // Custom scrollbar mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartScrollY(window.scrollY);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !customScrollBarRef.current) return;

      const deltaY = e.clientY - startY;
      const scrollFactor = contentHeight / windowHeight;
      window.scrollTo(0, startScrollY + deltaY * scrollFactor);
    },
    [contentHeight, isDragging, startScrollY, startY, windowHeight],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Update custom scrollbar size and position
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      if (customScrollBarRef.current) {
        const scrollHeight = (windowHeight / contentHeight) * windowHeight;
        const targetY = v * (windowHeight - scrollHeight);
        customScrollBarRef.current.style.height = `${scrollHeight}px`;
        customScrollBarRef.current.style.transform = `translateY(${targetY}px)`;
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, contentHeight, windowHeight]);

  // Add mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      document.body.style.cursor = ""; // Reset cursor after drag
      document.body.style.userSelect = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, isDragging]);

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
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="fixed right-0.5 top-0 z-50 h-screen w-1.5 bg-transparent transition-[width] duration-300 hover:w-3"
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute top-0 w-full rounded-full bg-[#757575] transition-[width] duration-300"
          ref={customScrollBarRef}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        />
      </div>
    </>
  );
};
