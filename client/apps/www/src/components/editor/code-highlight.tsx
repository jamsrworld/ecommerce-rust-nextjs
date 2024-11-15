"use client";

import { Button, Card } from "@jamsr-ui/react";
import { CopyIcon } from "@repo/icons";
import { copyToClipboard } from "@repo/utils/clipboard";

type Props = {
  code: React.ReactNode;
};

export const CodeHighlight = (props: Props) => {
  const { code } = props;

  const handleCopy = () => {
    void copyToClipboard(code as string);
  };

  return (
    <Card className="mb-12 border border-divider shadow-none">
      <Button
        isIconOnly
        onClick={handleCopy}
        className="absolute right-2 top-2"
        aria-label="Copy Code"
      >
        <CopyIcon />
      </Button>
      <pre className="max-h-[800px] overflow-auto">
        <code>{code}</code>
      </pre>
    </Card>
  );
};
