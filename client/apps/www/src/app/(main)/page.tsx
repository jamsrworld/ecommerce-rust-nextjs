import { getProducts } from "@/client";
import { FetchError } from "@repo/components/fetch-error";
import { SearchItem } from "./products/components/search-item";

const Page = async () => {
  const products = await getProducts();
  const { data, error } = products;
  if (error) return <FetchError error={error} />;
  return (
    <div className="flex flex-col gap-4 p-4">
      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((item, idx) => {
          return (
            <SearchItem
              key={idx}
              {...item}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
