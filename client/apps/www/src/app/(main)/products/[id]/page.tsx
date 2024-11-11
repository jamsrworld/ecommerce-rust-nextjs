import { getProduct } from "@/client";
import { FetchError } from "@repo/components/fetch-error";
import { ProductBreadcrumb } from "./_lib/components/product-breadcrumb";
import { ProductDetails } from "./_lib/components/product-details";
import { ProductFeatures } from "./_lib/components/product-features";
import { ProductImages } from "./_lib/components/product-images";
import { ProductInfo } from "./_lib/components/product-info";

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

const page = async (props: Props) => {
  const { id } = await props.params;
  const { data: product, error } = await getProduct({
    path: {
      id,
    },
  });
  if (error) return <FetchError error={error} />;
  const { images, highlights, video } = product;
  return (
    <div className="flex flex-col gap-8 p-2 md:gap-24">
      <section className="grid grid-cols-1 gap-2 md:grid-cols-12">
        <div className="md:col-span-7">
          <ProductImages
            images={images}
            video={video}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-5 md:px-4">
          <ProductBreadcrumb />
          <ProductDetails product={product} />
          <ProductFeatures highlights={highlights} />
          <ProductInfo />
        </div>
      </section>
    </div>
  );
};

export default page;
