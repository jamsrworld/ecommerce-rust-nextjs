import { getProduct } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import { FetchError } from "@repo/components/fetch-error";
import { permanentRedirect } from "next/navigation";
import { ProductBreadcrumb } from "./_lib/components/product-breadcrumb";
import { ProductData } from "./_lib/components/product-data";
import { ProductDescription } from "./_lib/components/product-description";
import { ProductHighlights } from "./_lib/components/product-highlights";
import { ProductImages } from "./_lib/components/product-images";
import { ProductInfo } from "./_lib/components/product-info";

type Params = Promise<{ slug: string; id: string }>;

type Props = {
  params: Params;
};

const page = async (props: Props) => {
  const { id, slug: slugParam } = await props.params;
  const { data: product, error } = await getProduct({
    path: {
      id,
    },
  });
  if (error) return <FetchError error={error} />;
  const { images, highlights, video, slug } = product;
  if (slugParam !== slug) permanentRedirect(APP_ROUTES.products.view(id, slug));
  return (
    <div className="flex flex-col gap-8 p-2 md:gap-24">
      <section className="grid grid-cols-1 gap-2 md:grid-cols-12">
        <div className="md:col-span-7">
          <ProductImages
            images={images}
            video={video}
          />
        </div>
        <div className="flex flex-col gap-6 md:col-span-5 md:px-4">
          <ProductBreadcrumb title={product.title} />
          <ProductData product={product} />
          <ProductHighlights highlights={highlights} />
          <ProductInfo product={product} />
        </div>
      </section>
      <ProductDescription description={product.description} />
    </div>
  );
};

export default page;
