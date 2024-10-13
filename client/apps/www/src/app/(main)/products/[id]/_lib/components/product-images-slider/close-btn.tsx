import { useFollowCursor } from "@/components/follow-cursor/provider";
import { Button } from "@jamsr-ui/react";
import { CloseIcon } from "@repo/icons";
import { m } from "framer-motion";

type Props = {
  onClose: () => void;
};

export const CloseBtn = (props: Props) => {
  const { onClose } = props;
  const { setShowCursor } = useFollowCursor();
  const handleMouseEnter = () => setShowCursor(false);
  const handleMouseLeave = () => setShowCursor(true);
  return (
    <m.div
      initial={{
        scale: 1.3,
      }}
      whileHover={{
        scale: 1.5,
        rotate: 90,
      }}
      className="absolute right-0 top-0 z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        isIconOnly
        onClick={onClose}
        variant="light"
        rounded
        size="lg"
      >
        <CloseIcon className="[&>path]:stroke-[2]" />
      </Button>
    </m.div>
  );
};
