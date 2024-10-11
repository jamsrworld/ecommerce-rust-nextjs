import { Button, Divider, Rating, Typography } from "@jamsr-ui/react";
import { cn } from "@repo/utils/class-name";

export const ProductDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography
          as="h1"
          variant="h3"
          className="font-bold uppercase"
        >
          Vola Sneakers
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
          129.00 €
        </Typography>
        <Typography
          as="p"
          variant="h6"
        >
          99.00 €
        </Typography>
      </div>
      <Divider />
      <Typography
        className="font-medium"
        as="h6"
      >
        Select Your Size
      </Typography>
      <div className="flex gap-2">
        {[35, 36, 37, 38, 39, 40, 41].map((item, index) => {
          const isSelected = index === 2;
          return (
            <Button
              key={index}
              color="default"
              variant="outlined"
              size="lg"
              isIconOnly
              className={cn(isSelected && "bg-black text-white", "rounded")}
            >
              {item}
            </Button>
          );
        })}
      </div>
      <Button
        fullWidth
        color="default"
        variant="solid"
        size="lg"
        className="rounded-full"
      >
        Add to cart
      </Button>
      <Button
        fullWidth
        color="default"
        variant="outlined"
        size="lg"
        className="rounded-full"
      >
        Checkout
      </Button>
      <Typography
        className="text-center text-foreground-tertiary"
        as="p"
      >
        Free shipping on orders over 100€
      </Typography>
    </div>
  );
};