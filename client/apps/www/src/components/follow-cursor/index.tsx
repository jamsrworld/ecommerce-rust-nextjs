"use client";

import { cn } from "@repo/utils/class-name";
import { m, useSpring } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useFollowCursor } from "./provider";

type Props = {
  parentDom: HTMLElement | null | undefined;
};

const INITIAL_CURSOR_SIZE = 96;
const MINI_CURSOR_SIZE = 70;
const physics = { stiffness: 120, damping: 20 };

export const FollowCursor = (props: Props) => {
  const { parentDom } = props;
  const [isGrabbing, setIsGrabbing] = useState(false);
  const cursorSize = useSpring(INITIAL_CURSOR_SIZE, physics);
  const mouseX = useSpring(0, physics);
  const mouseY = useSpring(0, physics);
  const cursorScale = useSpring(1, physics);
  const { showCursor } = useFollowCursor();

  const setCursorCoords = useCallback(
    (x: number, y: number, size: number) => {
      const translateX = x - size / 2;
      const translateY = y - size / 2;
      cursorSize.set(size);
      mouseX.set(translateX);
      mouseY.set(translateY);
    },
    [cursorSize, mouseX, mouseY],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;
      if (parentDom) {
        const { scrollLeft, scrollTop } = parentDom;
        x = e.clientX + scrollLeft;
        y = e.clientY + scrollTop;
      }
      setCursorCoords(
        x,
        y,
        isGrabbing ? MINI_CURSOR_SIZE : INITIAL_CURSOR_SIZE,
      );

      // console.log({
      //   clientX: e.clientX,
      //   clientY: e.clientY,
      //   x,
      //   y,
      //   translateX,
      //   translateY,
      //   currentCursorSize,
      // });
    },
    [isGrabbing, parentDom, setCursorCoords],
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsGrabbing(true);
      setCursorCoords(e.clientX, e.clientY, MINI_CURSOR_SIZE);
    },
    [setCursorCoords],
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setIsGrabbing(false);
      setCursorCoords(e.clientX, e.clientY, INITIAL_CURSOR_SIZE);
    },
    [setCursorCoords],
  );

  useEffect(() => {
    const container = window;
    if (!container) return () => {};
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, parentDom]);

  useEffect(() => {
    if (showCursor) {
      cursorScale.set(1);
    } else {
      cursorScale.set(0);
    }
  }, [cursorSize, cursorScale, showCursor]);

  return (
    <m.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 grid place-content-center rounded-full border border-black",
      )}
      style={{
        x: mouseX,
        y: mouseY,
        width: cursorSize,
        height: cursorSize,
        scale: cursorScale,
      }}
    >
      <div className="absolute left-1/2 top-1/2 size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-inherit" />
      {isGrabbing && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2">
          <div className="size-0 border-8 border-y-transparent border-l-transparent border-r-black" />
          <div className="size-3 rounded-full bg-black" />
          <div className="size-0 border-8 border-y-transparent border-l-black border-r-transparent" />
        </div>
      )}
    </m.div>
  );
};
