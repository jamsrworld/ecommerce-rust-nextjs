import { Button } from "@jamsr-ui/react";
import { AddIcon, MinusIcon } from "@repo/icons";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";

export const QuantityCounter = () => {
  const [quantity, setQuantity] = useState(1);
  const onIncrease = () => setQuantity(quantity + 1);
  const onDecrease = () => setQuantity(quantity - 1);
  const canDecrease = quantity > 1;
  const canIncrease = quantity < 10;
  return (
    <div className="flex items-center gap-1">
      <Button
        isIconOnly
        variant="link"
        className="text-foreground"
        onClick={onDecrease}
        isDisabled={!canDecrease}
      >
        <MinusIcon />
      </Button>
      <div className="relative grid size-8 place-content-center overflow-hidden border-[1.5px] border-divider p-1 font-medium">
        <AnimatePresence mode="popLayout">
          {quantity !== 0 && (
            <m.div
              key={quantity}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              transition={{ type: "spring", duration: 1 }}
            >
              {quantity}
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <Button
        isIconOnly
        variant="link"
        className="text-foreground"
        onClick={onIncrease}
        isDisabled={!canIncrease}
      >
        <AddIcon />
      </Button>
    </div>
  );
};
