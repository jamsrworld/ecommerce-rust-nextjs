import { SearchItem } from "./components/search-item";
import { searchProducts } from "./list";

const Page = () => {
  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {searchProducts.map((item, idx) => {
          return (
            <SearchItem
              {...item}
              key={idx}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
