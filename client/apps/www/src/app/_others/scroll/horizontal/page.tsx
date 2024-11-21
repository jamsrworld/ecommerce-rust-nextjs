"use client";

import { HorizontalScroll } from "@/components/horizontal-scroll";
import { Repeater } from "@jamsr-ui/react";

const Page = () => {
  return (
    <HorizontalScroll>
      <Repeater count={10}>
        <div className="size-80 shrink-0 bg-black" />
        {/* Ensure the width of the items */}
      </Repeater>
    </HorizontalScroll>
  );
};

export default Page;
