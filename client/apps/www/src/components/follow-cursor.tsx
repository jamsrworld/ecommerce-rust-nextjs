"use client";

import { cn } from "@repo/utils/class-name";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Props = {
  parentRef: React.RefObject<HTMLElement>;
};

const INITIAL_CURSOR_SIZE = 96;
const MINI_CURSOR_SIZE = 70;

export const FollowCursor = (props: Props) => {
  const { parentRef } = props;
  const [isGrabbing, setIsGrabbing] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorSize = useSpring(INITIAL_CURSOR_SIZE, {
    stiffness: 120,
    damping: 20,
  });
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const currentCursorSize = cursorSize.get();
      let x = e.clientX;
      let y = e.clientY;
      if (parentRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const { scrollLeft, scrollTop } = parentRef.current;
        x = e.clientX - parentRect.left + scrollLeft;
        y = e.clientY - parentRect.top + scrollTop;
      }
      const translateX = x - currentCursorSize / 2;
      const translateY = y - currentCursorSize / 2;
      mouseX.set(translateX);
      mouseY.set(translateY);
      // console.log({
      //   translateX,
      //   translateY,
      //   x,
      //   y,
      //   cursorSize: cursorSize.get(),
      //   mouseX: mouseX.get(),
      //   mouseY: mouseY.get(),
      // });
    },
    [cursorSize, mouseX, mouseY, parentRef],
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
    const container = window;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <m.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 grid place-content-center rounded-full border border-black",
      )}
      style={{
        x: springX,
        y: springY,
        width: cursorSize,
        height: cursorSize,
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
