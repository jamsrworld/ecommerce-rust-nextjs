import { type Product } from "@/client";
import { EditorRender } from "@/components/editor";
import { Typography } from "@jamsr-ui/react";

type Props = Pick<Product, "description">;
export const ProductDescription = (props: Props) => {
  const { description } = props;
  return (
    <section>
      <div className="container max-w-screen-xl">
        <Typography
          as="h3"
          variant="h3"
          className="mb-4"
        >
          Product Description
        </Typography>
        <EditorRender data={description} />
      </div>
    </section>
  );
};
