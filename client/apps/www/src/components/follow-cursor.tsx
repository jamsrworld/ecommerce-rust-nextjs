"use client";

import { cn } from "@repo/utils/class-name";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Props = {
  parentRef?: React.RefObject<HTMLElement>;
};

export const FollowCursor = (props: Props) => {
  const { parentRef } = props;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;
      if (parentRef?.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const { scrollLeft, scrollTop } = parentRef.current;
        x = e.clientX - parentRect.left + scrollLeft;
        y = e.clientY - parentRect.top + scrollTop;
      }
      mouseX.set(x - 48);
      mouseY.set(y - 48);
    },
    [mouseX, mouseY, parentRef],
  );

  const handleMouseDown = useCallback(() => {
    setIsGrabbing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsGrabbing(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <m.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 grid size-24 place-content-center rounded-full border border-black",
      )}
      style={{ x: springX, y: springY }}
    >
      <div className="size-20 rounded-full border border-dashed border-inherit" />
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
