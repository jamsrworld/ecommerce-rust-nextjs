"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

const HIDE_SCROLLBAR_TIMEOUT = 2000;

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const customScrollBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollY, setStartScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20, // Increase resistance to slow it down towards the end
    mass: 0.2, // Keep the same mass
    stiffness: 50, // Lower stiffness for a slower response
    restDelta: 0.001, // More precise rest point
    restSpeed: 0.001, // Reduce resting speed threshold
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
    if (customScrollBarRef.current) {
      const scrollHeight = (windowHeight / contentHeight) * windowHeight;
      customScrollBarRef.current.style.height = `${scrollHeight}px`;
    }
  }, [contentHeight, windowHeight]);

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
      document.body.classList.add("is-scrolling");
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      document.body.classList.remove("is-scrolling");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, isDragging]);

  // Function to handle showing scrollbar on scroll
  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, HIDE_SCROLLBAR_TIMEOUT);
  }, []);

  // Hover state for showing the scrollbar track
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isScrolling) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, HIDE_SCROLLBAR_TIMEOUT);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div style={{ height: contentHeight }} />
      <m.div
        className="fixed top-0 flex w-screen flex-col pt-16"
        style={{ y, width: "calc(100% - 6px)" }}
        ref={contentRef}
      >
        {children}
      </m.div>

      {/* Custom Scrollbar */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="fixed right-0.5 top-0 z-50 h-screen w-1.5 bg-transparent transition-[width,opacity] duration-300 hover:w-3"
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: isDragging || isScrolling || isHovered ? 1 : 0, // Show scrollbar when dragging or scrolling
        }}
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
