"use client";

import { Button, toast } from "@jamsr-ui/react";
import { CheckIcon, CopyIcon } from "@repo/icons";
import { useState } from "react";

type Props = {
  text: string;
  children?: React.ReactNode;
};

export const CopyToClipboard = (props: Props) => {
  const { text, children } = props;
  const [isCopied, setIsCopied] = useState(false);
  const handleClick = async () => {
    setIsCopied(true);
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      toast.success("Copied to clipboard");
      const audio = new Audio("/copy.mp3");
      void audio.play();
    } catch (err) {
      toast.error("Failed to copy");
    }
  };
  return (
    <Button
      onClick={handleClick}
      endContent={
        isCopied ? (
          <CheckIcon
            width={16}
            height={16}
          />
        ) : (
          <CopyIcon
            width={16}
            height={16}
          />
        )
      }
      className="group relative rounded-none border-none text-inherit hover:bg-transparent"
      variant="outlined"
    >
      <span className="pointer-events-none absolute size-full border border-dashed border-black group-hover:border-2" />
      {children}
    </Button>
  );
};
