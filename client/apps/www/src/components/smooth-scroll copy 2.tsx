"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@repo/utils/class-name";
import { m, useSpring, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

const HIDE_SCROLLBAR_TIMEOUT = 2000;

export const SmoothScroll = ({
  children,
  direction = "vertical",
}: {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
}) => {
  const [contentSize, setContentSize] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(0);
  const customScrollBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startScrollPos, setStartScrollPos] = useState(0);
  const [startClientPos, setStartClientPos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  console.log("containerSize:->", containerSize);
  console.log("contentSize:->", contentSize);

  const smoothProgress = useSpring(0, {
    damping: 20,
    mass: 0.2,
    stiffness: 50,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const axis = direction === "vertical" ? "y" : "x";

  const transformValue = useTransform(
    smoothProgress,
    (v) => v * -(contentSize - containerSize),
  );

  const handleResize = useCallback(() => {
    if (contentRef.current && containerRef.current) {
      setContentSize(
        direction === "vertical"
          ? contentRef.current.scrollHeight
          : contentRef.current.scrollWidth,
      );
      setContainerSize(
        direction === "vertical"
          ? containerRef.current.offsetHeight
          : containerRef.current.offsetWidth,
      );
    }
  }, [direction]);

  const debouncedResize = useDebounce(handleResize, 100);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [handleResize, debouncedResize]);

  // Scroll handling for div
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollPos =
        direction === "vertical"
          ? containerRef.current.scrollTop
          : containerRef.current.scrollLeft;
      const maxScrollPos =
        direction === "vertical"
          ? contentRef.current!.scrollHeight - containerRef.current.offsetHeight
          : contentRef.current!.scrollWidth - containerRef.current.offsetWidth;
      smoothProgress.set(scrollPos / maxScrollPos);

      setIsScrolling(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, HIDE_SCROLLBAR_TIMEOUT);
    }
  }, [direction, smoothProgress]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartClientPos(direction === "vertical" ? e.clientY : e.clientX);
    setStartScrollPos(
      direction === "vertical"
        ? containerRef.current!.scrollTop
        : containerRef.current!.scrollLeft,
    );
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !customScrollBarRef.current) return;
      const deltaPos =
        direction === "vertical"
          ? e.clientY - startClientPos
          : e.clientX - startClientPos;
      const scrollFactor = contentSize / containerSize;
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top:
            direction === "vertical"
              ? startScrollPos + deltaPos * scrollFactor
              : undefined,
          left:
            direction === "horizontal"
              ? startScrollPos + deltaPos * scrollFactor
              : undefined,
        });
      }
    },
    [
      contentSize,
      containerSize,
      direction,
      isDragging,
      startClientPos,
      startScrollPos,
    ],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-hidden"
    >
      <div style={{ [axis === "y" ? "height" : "width"]: contentSize }} />
      <m.div
        className="absolute left-0 top-0 flex"
        style={{
          [axis]: transformValue,
          [axis === "y" ? "width" : "height"]: "100%",
        }}
        ref={contentRef}
      >
        {children}
      </m.div>

      {/* Custom Scrollbar */}
      <div
        className={cn(
          "fixed right-0.5 top-0 z-50 h-screen w-1.5 bg-transparent opacity-0 transition-[width,opacity] duration-300",
          {
            "opacity-100": isDragging || isScrolling || isHovered,
            "w-3": isDragging || isHovered,
          },
        )}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute top-0 w-full rounded-full bg-[#757575] transition-[width] duration-300"
          ref={customScrollBarRef}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        />
      </div>
    </div>
  );
};
