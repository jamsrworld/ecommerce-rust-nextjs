import { type Product } from "@/client";
import { Button, Rating, Typography } from "@jamsr-ui/react";
import { CartIcon, CheckoutIcon } from "@repo/icons";
import { fPrice } from "@repo/utils/number";
import { SelectColors } from "./select-colors";
import { SelectSize } from "./select-size";

type Props = {
  product: Product;
};

export const ProductDetails = (props: Props) => {
  const { product } = props;
  const { title, brand, price, mrp } = product;
  console.log("i get rendered")
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col">
        <Typography
          as="h1"
          variant="h3"
          className="font-bold uppercase"
        >
          {title}
        </Typography>
        <Typography
          as="h3"
          variant="body1"
          className="text-foreground-secondary"
        >
          {brand}
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
            0 Reviews
          </Typography>
        </div>
        <Typography
          as="p"
          className="text-foreground-secondary line-through"
        >
          {fPrice(mrp)}
        </Typography>
        <Typography
          as="p"
          variant="h6"
        >
          {fPrice(price)}
        </Typography>
      </section>

      <SelectColors />
      <SelectSize />
      <section className="flex flex-col gap-2">
        <Button
          fullWidth
          color="primary"
          variant="solid"
          size="lg"
          className="rounded-full"
          startContent={<CartIcon />}
        >
          Add to Cart
        </Button>
        <Button
          fullWidth
          color="primary"
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
