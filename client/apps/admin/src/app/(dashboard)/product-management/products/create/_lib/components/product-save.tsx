import { Button, Link } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { type Route } from "next";

type Props = { isMutating: boolean; productPreviewUrl?: Route };

export const ProductSaveFooter = (props: Props) => {
  const { isMutating, productPreviewUrl } = props;
  return (
    <div className="sticky bottom-1 z-1 flex items-center justify-end gap-4 rounded bg-background/50 p-2 shadow-lg backdrop-blur backdrop-saturate-150">
      {productPreviewUrl && (
        <Link
          color="secondary"
          as={NextLink}
          href={productPreviewUrl}
          target="_blank"
          className="text-sm font-medium"
          underline="always"
        >
          Preview Product
        </Link>
      )}
      <Button
        type="submit"
        color="primary"
        isLoading={isMutating}
      >
        {productPreviewUrl ? "Update" : "Save"} Product
      </Button>
    </div>
  );
};
