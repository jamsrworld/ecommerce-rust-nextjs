import { Button } from "@jamsr-ui/react";
import { AddIcon, MinusIcon } from "@repo/icons";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { useState } from "react";

type Props = {
  defaultValue: number;
};

type Action = "increase" | "decrease";

const variants: Variants = {
  initial: (action: Action) => {
    return {
      y: action === "increase" ? 24 : -24,
    };
  },
  animate: {
    y: 0,
  },
  exit: (action: Action) => ({
    y: action === "increase" ? -24 : 24,
  }),
};

export const QuantityCounter = (props: Props) => {
  const { defaultValue } = props;
  const [action, setAction] = useState<Action | null>(null);
  const [quantity, setQuantity] = useState(defaultValue);
  const onIncrease = () => {
    setQuantity(quantity + 1);
    setAction("increase");
  };
  const onDecrease = () => {
    setQuantity(quantity - 1);
    setAction("decrease");
  };
  const canDecrease = quantity > 1;
  const canIncrease = quantity < 10;
  return (
    <div className="flex items-center gap-1">
      <Button
        isIconOnly
        variant="text"
        onClick={onDecrease}
        isDisabled={!canDecrease}
        disableRipple
      >
        <MinusIcon />
      </Button>
      <div className="relative grid size-8 place-content-center overflow-hidden border-[1.5px] border-divider p-1 font-medium">
        <AnimatePresence
          mode="popLayout"
          initial={false}
          custom={action}
        >
          {quantity !== 0 && (
            <m.div
              key={quantity}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={action}
              transition={{ type: "spring", duration: 1 }}
            >
              {quantity}
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <Button
        isIconOnly
        variant="text"
        onClick={onIncrease}
        isDisabled={!canIncrease}
        disableRipple
      >
        <AddIcon />
      </Button>
    </div>
  );
};
