import { type Product } from "@/client";
import { Rating, Typography } from "@jamsr-ui/react";
import { fPrice } from "@repo/utils/number";
import { AddToCart } from "./add-to-cart";
import { CheckoutProduct } from "./checkout-product";

type Props = {
  product: Product;
};

export const ProductData = (props: Props) => {
  const { product } = props;
  const { title, price, mrp } = product;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col-reverse gap-4 md:flex-col">
        <section className="flex flex-col gap-1">
          <Typography
            as="h1"
            variant="h6"
            className="font-bold uppercase"
          >
            {title}
          </Typography>
          <div className="flex items-center gap-2 md:items-end">
            <Rating
              isReadonly
              classNames={{
                star: "size-3 md:size-4",
              }}
            />
            <Typography
              as="p"
              variant="paragraph2"
            >
              0 Reviews
            </Typography>
          </div>
          <div className="flex items-end gap-1">
            <Typography
              as="p"
              variant="h5"
            >
              {fPrice(price)}
            </Typography>
            <Typography
              as="p"
              className="text-foreground-secondary line-through"
              variant="paragraph"
            >
              {fPrice(mrp)}
            </Typography>
          </div>
        </section>
      </div>
      <section className="flex flex-col gap-3">
        <AddToCart id={product.id} />
        <CheckoutProduct id={product.id} />
        <Typography
          className="text-center text-foreground-tertiary"
          as="p"
          variant="paragraph2"
        >
          Free shipping on orders over $100
        </Typography>
      </section>
    </div>
  );
};
