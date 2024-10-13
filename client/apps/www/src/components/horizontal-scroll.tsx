"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { m, useSpring } from "framer-motion";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type ScrollHandle = {
  slideLeft: () => void;
  slideRight: () => void;
  canSlideLeft: boolean;
  canSlideRight: boolean;
  current: HTMLDivElement | null;
};

type Props = {
  children: React.ReactNode;
  ref?: React.RefObject<ScrollHandle>;
};

const physics = { stiffness: 120, damping: 20 };
export const HorizontalScroll = (props: Props) => {
  const { children, ref: propRef } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const position = useSpring(0, physics);
  const [canSlideLeft, setCanSlideLeft] = useState(false);
  const [canSlideRight, setCanSlideRight] = useState(true);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = containerRef.current.scrollWidth;
      const left = -(contentWidth - containerWidth);
      setConstraints({
        left,
        right: 0,
      });
    }
  }, []);
  const onResizeDebounced = useDebounce(handleResize, 100);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener("resize", onResizeDebounced);
    return () => {
      window.removeEventListener("resize", onResizeDebounced);
    };
  }, [onResizeDebounced]);

  // Function to slide manually
  const slide = useCallback(
    (direction: "left" | "right") => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const slideDistance = containerWidth / 2;
        if (direction === "left") {
          position.set(
            Math.min((position.getPrevious() ?? 0) + slideDistance, 0),
          );
        } else {
          position.set(
            Math.max(
              (position.getPrevious() ?? 0) - slideDistance,
              constraints.left,
            ),
          );
        }
      }
    },
    [constraints.left, position],
  );

  const onChangePosition = useCallback(
    (value: number) => {
      setCanSlideLeft(value < 0);
      setCanSlideRight(value > constraints.left);
    },
    [constraints.left],
  );

  const onChangePositionDebounce = useDebounce(onChangePosition, 10);
  position.on("change", onChangePositionDebounce);

  const slideLeft = useCallback(() => {
    slide("left");
  }, [slide]);
  const slideRight = useCallback(() => {
    slide("right");
  }, [slide]);

  useImperativeHandle(
    propRef,
    () => ({
      slideLeft,
      slideRight,
      canSlideLeft,
      canSlideRight,
      current: containerRef.current,
    }),
    [canSlideLeft, canSlideRight, slideLeft, slideRight],
  );

  return (
    <div className="w-full overflow-hidden">
      <m.div
        className="flex gap-8"
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.1}
        ref={containerRef}
        style={{ cursor: "grab", x: position }}
      >
        {children}
      </m.div>
    </div>
  );
};
