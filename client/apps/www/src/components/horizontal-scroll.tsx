"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
};

export const HorizontalScroll = (props: Props) => {
  const { children, ref: propRef } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

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
  const onResizeDebounced = useDebounce(handleResize, 200);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener("resize", onResizeDebounced);
    return () => {
      window.removeEventListener("resize", onResizeDebounced);
    };
  }, [onResizeDebounced]);

  return (
    <div className="w-full overflow-hidden">
      <m.div
        className="flex gap-8"
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.1}
        ref={(ref) => {
          containerRef.current = ref;
          if (propRef && ref) propRef.current = ref;
        }}
        style={{ cursor: "grab" }}
      >
        {children}
      </m.div>
    </div>
  );
};
