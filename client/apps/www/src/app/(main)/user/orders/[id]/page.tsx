import { Divider, Typography } from "@jamsr-ui/react";
import { fPrice } from "@repo/utils/number";
import Image from "next/image";
import Img1 from "../assets/1.webp";
import Img2 from "../assets/2.webp";
import Img3 from "../assets/3.webp";

// Enum for order status
enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

// Example data from the image
const order = {
  id: "0876432",
  status: OrderStatus.Pending,
  products: [
    {
      title: "Ipad Pro 11",
      specifications: ["Space gray", "256GB"],
      price: 999.0,
      quantity: 1,
      thumbnail: Img1,
    },
    {
      title: "Airpods Pro",
      specifications: ["White"],
      price: 249.0,
      quantity: 1,
      thumbnail: Img2,
    },
    {
      title: 'Macbook Pro 14"',
      specifications: ["Space gray", "16GB ", "1TB"],
      price: 1999.0,
      quantity: 1,
      thumbnail: Img3,
    },
  ],
  delivery: {
    address: "2626 Rockwell Lane Apt. 120",
    city: "Overland Park",
    country: "US",
    phoneNumber: "913-664-1217",
    method: "Free (12 days)",
    estimatedDelivery: "Mar 12, 2024",
  },
  summary: {
    subtotal: 2914.2,
    discount: 323.8,
    deliveryCost: 0.0,
    tax: 291.42,
    total: 3205.62,
  },
};

const Page = () => {
  const { delivery, products, id, status, summary } = order;
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
          {products.map((item, idx) => {
            const { title, price, quantity, thumbnail, specifications } = item;
            return (
              <div
                key={idx}
                className="flex gap-4"
              >
                <Image
                  src={thumbnail}
                  alt={title}
                  className="size-14 rounded"
                />
                <div className="flex grow flex-col gap-1">
                  <Typography as="p">{title}</Typography>
                  <div className="flex gap-1 text-foreground-secondary">
                    {specifications.map((item) => {
                      return (
                        <Typography
                          key={item}
                          as="p"
                          variant="paragraph2"
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
            );
          })}
        </div>
      </section>
      <Divider className="my-8" />
      <section className="flex flex-col gap-4">
        <Typography
          as="p"
          variant="h6"
        >
          Delivery
        </Typography>
        <div className="grid grid-cols-2 text-sm">
          <div className="flex flex-col gap-1">
            <Typography
              className="text-foreground-tertiary"
              as="p"
            >
              Address
            </Typography>
            <div>
              <Typography as="p">{delivery.address}</Typography>
              <Typography as="p">
                {delivery.city}, {delivery.country}
              </Typography>
              <Typography as="p">{delivery.phoneNumber}</Typography>
            </div>
            <Typography
              as="p"
              className="mt-4 text-success"
            >
              Estimated Delivery: {delivery.estimatedDelivery}
            </Typography>
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              className="text-foreground-tertiary"
              as="p"
            >
              Delivery Method
            </Typography>
            <div>
              <Typography as="p">{delivery.method}</Typography>
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
            <Typography as="p">{fPrice(summary.subtotal)}</Typography>
          </div>
          <div className="flex justify-between text-foreground-tertiary">
            <Typography as="p">Discount</Typography>
            <Typography as="p">{fPrice(summary.discount)}</Typography>
          </div>
          <div className="flex justify-between text-foreground-tertiary">
            <Typography as="p">Delivery</Typography>
            <Typography as="p">{fPrice(summary.deliveryCost)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography as="p">Tax</Typography>
            <Typography as="p">{fPrice(summary.tax)}</Typography>
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
              {fPrice(summary.total)}
            </Typography>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
