"use client";

import { cn } from "@repo/utils/class-name";
import { m, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useFollowCursor } from "./provider";

type Props = {
  parentRef: React.RefObject<HTMLElement>;
};

const INITIAL_CURSOR_SIZE = 96;
const MINI_CURSOR_SIZE = 70;
const physics = { stiffness: 120, damping: 20 };

export const FollowCursor = (props: Props) => {
  const { parentRef } = props;
  const [isGrabbing, setIsGrabbing] = useState(false);
  const cursorSize = useSpring(INITIAL_CURSOR_SIZE, physics);
  const mouseX = useSpring(0, physics);
  const mouseY = useSpring(0, physics);
  const cursorScale = useSpring(1, physics);
  const { showCursor } = useFollowCursor();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const currentCursorSize = cursorSize.get();
      let x = e.clientX;
      let y = e.clientY;
      if (parentRef.current) {
        const { scrollLeft, scrollTop } = parentRef.current;
        x = e.clientX + scrollLeft;
        y = e.clientY + scrollTop;
      }
      const translateX = x - currentCursorSize / 2;
      const translateY = y - currentCursorSize / 2;
      mouseX.set(translateX);
      mouseY.set(translateY);
      console.log({
        clientX: e.clientX,
        clientY: e.clientY,
        x,
        y,
        translateX,
        translateY,
        currentCursorSize,
      });
    },
    [cursorSize, parentRef, mouseX, mouseY],
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsGrabbing(true);
      cursorSize.set(MINI_CURSOR_SIZE);
      handleMouseMove(e);
    },
    [cursorSize, handleMouseMove],
  );

  const handleMouseUp = useCallback(() => {
    setIsGrabbing(false);
    cursorSize.set(INITIAL_CURSOR_SIZE);
  }, [cursorSize]);

  useEffect(() => {
    const container = parentRef.current;
    if (!container) return () => {};
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, parentRef]);

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
