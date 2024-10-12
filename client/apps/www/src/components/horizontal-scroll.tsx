"use client";

import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  ref?: React.MutableRefObject<HTMLDivElement>;
};

export const HorizontalScroll = (props: Props) => {
  const { children, ref: propRef } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = containerRef.current.scrollWidth;
      const left = -(contentWidth - containerWidth);
      setConstraints({
        left,
        right: 0,
      });
    }
  }, [containerRef]);

  return (
    <div className="w-full overflow-hidden">
      <m.div
        className="flex gap-8" // Allow the content to be arranged in a row
        drag="x" // Enable horizontal dragging
        dragConstraints={constraints} // Apply dynamic constraints
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
