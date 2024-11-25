import { getProducts } from "@/client";
import { Typography } from "@jamsr-ui/react";
import { FetchError } from "@repo/components/fetch-error";
import { ProductSearchItem } from "../products/components/product-search-item";

const Page = async () => {
  const products = await getProducts();
  const { data, error } = products;
  if (error) return <FetchError error={error} />;
  return (
    <div className="flex flex-col gap-4 p-1">
      <div>
        <Typography as="p">Results for "t-shirts"</Typography>
      </div>
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((item, idx) => {
          return (
            <ProductSearchItem
              key={idx}
              idx={idx}
              {...item}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
