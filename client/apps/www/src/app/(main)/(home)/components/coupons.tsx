import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { Typography } from "@jamsr-ui/react";
import { cn } from "@repo/utils/class-name";
import { fPrice } from "@repo/utils/number";

const items: {
  heading: string;
  discount: number;
  specification: string;
  code: string;
}[] = [
  {
    heading: "Save on new shoes",
    discount: 20,
    specification: "For orders over $200",
    code: "NEW200",
  },
  {
    heading: "Save up to $50 for jacket",
    discount: 50,
    specification: "For orders over $400",
    code: "SAVE400",
  },
];

export const CouponsSection = () => {
  const colors = ["bg-warning-200", "bg-blue-200"];
  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {items.map((item, index) => {
        const { heading, discount, specification, code } = item;
        const color = colors[index];
        return (
          <div
            key={index}
            className={cn("flex items-center justify-center gap-4 p-4", color)}
          >
            <Typography
              as="h6"
              variant="h6"
              className="font-normal"
            >
              {heading}
            </Typography>
            <Typography
              as="p"
              variant="h3"
              className="font-semibold"
            >
              -{fPrice(discount)}
            </Typography>
            <Typography
              as="p"
              variant="paragraph2"
            >
              {specification}
            </Typography>
            <CopyToClipboard text={code}>{code}</CopyToClipboard>
          </div>
        );
      })}
    </section>
  );
};
