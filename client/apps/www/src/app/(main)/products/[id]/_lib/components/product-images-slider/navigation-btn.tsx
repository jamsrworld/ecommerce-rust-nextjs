import { useFollowCursor } from "@/components/follow-cursor/provider";
import { cn } from "@repo/utils/class-name";
import { m, type SpringOptions, type Variants } from "framer-motion";

type Props = {
  className: string;
  children?: React.ReactNode;
};

const variantsOuter: Variants = {
  initial: {
    scale: 1,
  },
  hovered: {
    scale: 0.75,
  },
};

const variantsInner: Variants = {
  initial: {
    scale: 0.75,
  },
  hovered: {
    scale: 1,
  },
};
const physics: SpringOptions = { mass: 1, stiffness: 100, damping: 15 };

const NavigationBtn = (props: Props) => {
  const { className, children } = props;
  const { setShowCursor } = useFollowCursor();
  const handleMouseEnter = () => setShowCursor(false);
  const handleMouseLeave = () => setShowCursor(true);

  const btnSize = 100;
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <m.button
      style={{
        width: btnSize,
        height: btnSize,
      }}
      type="button"
      className={cn(
        "absolute top-1/2 z-20 flex items-center justify-center rounded-full",
        className,
      )}
      aria-label="Next"
      initial="initial"
      whileHover="hovered"
      whileTap="tapped"
      variants={{
        tapped: {
          scale: 0.9,
        },
      }}
      transition={{ type: "spring", ...physics }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <m.div
        className="absolute size-full rounded-full border border-black"
        variants={variantsOuter}
        transition={{ type: "spring", ...physics }}
      />
      <m.div
        className="absolute size-full rounded-full border border-dashed border-black"
        variants={variantsInner}
        transition={{ type: "spring", ...physics }}
      />
      <span className="absolute">{children}</span>
    </m.button>
  );
};

const Arrow = (props: { direction: "left" | "right" }) => {
  const { direction } = props;
  return (
    <m.div
      variants={{
        initial: {
          width: 0,
          [direction]: -7,
        },
        hovered: {
          width: 28,
          [direction]: 0,
        },
      }}
      className={cn(
        "relative h-0.5 bg-black",
        direction === "right" && "rotate-180",
      )}
      transition={{ type: "spring", ...physics }}
    >
      <m.div className="absolute -bottom-1 -left-0.5 h-0.5 w-[0.8rem] rotate-45 bg-black" />
      <m.div className="absolute -left-0.5 -top-1 h-0.5 w-[0.8rem] -rotate-45 bg-black" />
    </m.div>
  );
};

export const NavigationPrevBtn = () => {
  return (
    <NavigationBtn className="left-4">
      <Arrow direction="left" />
    </NavigationBtn>
  );
};

export const NavigationNextBtn = () => {
  return (
    <NavigationBtn className="right-4">
      <Arrow direction="right" />
    </NavigationBtn>
  );
};
