import { Button, Rating, Typography } from "@jamsr-ui/react";
import { CartIcon, CheckoutIcon } from "@repo/icons";
import { SelectColors } from "./select-colors";
import { SelectSize } from "./select-size";

export const ProductDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col">
        <Typography
          as="h1"
          variant="h3"
          className="font-bold uppercase"
        >
          Loreta Wool-Blend Coat
        </Typography>
        <Typography
          as="h3"
          variant="body1"
          className="text-foreground-secondary"
        >
          Mineral Grey
        </Typography>
        <div className="flex items-center gap-2">
          <Rating
            isReadonly
            classNames={{
              star: "size-4",
            }}
          />
          <Typography
            as="p"
            variant="body1"
          >
            711 Reviews
          </Typography>
        </div>
        <Typography
          as="p"
          className="text-foreground-secondary line-through"
        >
          $129.00
        </Typography>
        <Typography
          as="p"
          variant="h6"
        >
          $99.00
        </Typography>
      </section>
      
      <SelectColors />
      <SelectSize />
      
      <section className="flex flex-col gap-2">
        <Button
          fullWidth
          color="default"
          variant="solid"
          size="lg"
          className="rounded-full"
          startContent={<CartIcon />}
        >
          Add to Cart
        </Button>
        <Button
          fullWidth
          color="default"
          variant="outlined"
          size="lg"
          className="rounded-full"
          startContent={<CheckoutIcon />}
        >
          Checkout
        </Button>
        <Typography
          className="text-center text-foreground-tertiary"
          as="p"
        >
          Free shipping on orders over $100
        </Typography>
      </section>
    </div>
  );
};
