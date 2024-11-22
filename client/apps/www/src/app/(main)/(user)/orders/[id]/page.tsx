import { getOrder } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import { authedClient } from "@/utils/authed-client";
import { Divider, Typography } from "@jamsr-ui/react";
import { NextImage, NextLink } from "@repo/components/next";
import { fPrice } from "@repo/utils/number";
import { getProductThumbnail } from "@repo/utils/product";
import { fDateTime } from "@repo/utils/time";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async (props: Props) => {
  const { id } = await props.params;
  const fetchClient = await authedClient();
  const { data } = await getOrder({
    client: fetchClient,
    path: {
      id,
    },
  });
  if (!data) return <div>Order not found</div>;
  const { order, product } = data;
  const { title, price, images, size, color, brand } = product;
  const thumbnail = getProductThumbnail(images);
  const { quantity, address, paymentMethod, status, createdAt, updatedAt } =
    order;
  const specifications = [size, color, brand];
  const productUrl = APP_ROUTES.products.view(product.id, product.slug);
  return (
    <div>
      <Typography
        as="h1"
        variant="h3"
      >
        Order ID: {id}
      </Typography>
      <Divider className="my-8" />
      <section>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <NextLink href={productUrl}>
              <NextImage
                image={thumbnail}
                alt={title}
                className="size-14 rounded object-cover"
              />
            </NextLink>
            <div className="flex grow flex-col gap-1">
              <Typography
                as={NextLink}
                href={productUrl}
              >
                {title}
              </Typography>
              <div className="flex gap-1 divide-x text-foreground-secondary">
                {specifications.map((item) => {
                  return (
                    <Typography
                      key={item}
                      as="p"
                      variant="paragraph2"
                      className="pl-1"
                    >
                      {item}
                    </Typography>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <Typography as="p">{fPrice(price)}</Typography>
              <Typography
                variant="caption"
                as="p"
                className="text-foreground-secondary"
              >
                Qty: {quantity}
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <Divider className="my-8" />
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 text-sm">
          <div className="flex flex-col gap-1">
            <Typography
              className="text-foreground-tertiary"
              as="p"
            >
              Delivery Address
            </Typography>
            <div>
              <Typography as="p">
                {address.first_name} {address.last_name}
              </Typography>
              <Typography as="p">{address.full_address}</Typography>
              <Typography as="p">
                {address.postal_code}, {address.city}, {address.state}
              </Typography>
              <Typography as="p">{address.phone_number}</Typography>
              <Typography as="p">{address.landmark}</Typography>
            </div>
            <Typography
              as="p"
              className="mt-4 text-success"
            >
              Estimated Delivery: {fDateTime(updatedAt)}
            </Typography>
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              className="text-foreground-tertiary"
              as="p"
            >
              Payment Method
            </Typography>
            <div>
              <Typography as="p">{paymentMethod}</Typography>
            </div>
          </div>
        </div>
      </section>
      <Divider className="my-8" />
      <section className="flex flex-col gap-4">
        <Typography
          variant="h6"
          as="p"
        >
          Order Summary
        </Typography>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <Typography as="p">Subtotal</Typography>
            <Typography as="p">{fPrice(price)}</Typography>
          </div>
          <div className="flex justify-between text-foreground-tertiary">
            <Typography as="p">Discount</Typography>
            <Typography as="p">{fPrice(0)}</Typography>
          </div>
          <div className="flex justify-between text-foreground-tertiary">
            <Typography as="p">Delivery</Typography>
            <Typography as="p">{fPrice(0)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography as="p">Tax</Typography>
            <Typography as="p">{fPrice(0)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography
              variant="paragraph"
              as="p"
              className="font-medium"
            >
              Total
            </Typography>
            <Typography
              variant="paragraph"
              as="p"
              className="font-medium"
            >
              {fPrice(price)}
            </Typography>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
