import { getProduct, getProducts } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import { FetchError } from "@repo/components/fetch-error";
import { getProductThumbnail } from "@repo/utils/product";
import { getFileSrc } from "@repo/utils/url";
import { type Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ProductBreadcrumb } from "./_components/product-breadcrumb";
import { ProductData } from "./_components/product-data";
import { ProductDescription } from "./_components/product-description";
import { ProductHighlights } from "./_components/product-highlights";
import { ProductImages } from "./_components/product-images";
import { ProductInfo } from "./_components/product-info";
import { getProductData } from "./actions";

type Props = {
  params: Promise<{ slug: string; id: string }>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { id } = await props.params;
  const { data } = await getProductData(id);
  if (!data) return {};
  const { title, seo, slug, images } = data;
  const thumbnail = getProductThumbnail(images);
  return {
    title,
    description: seo.description ?? seo.title ?? title,
    keywords: seo.keywords,
    openGraph: {
      url: APP_ROUTES.products.view(id, slug),
      images: [
        {
          url: getFileSrc(thumbnail.url),
          width: thumbnail.width,
          height: thumbnail.height,
          alt: title,
        },
      ],
    },
    twitter: {
      site: "@jamsrworld",
      images: [
        {
          url: getFileSrc(thumbnail.url),
          width: thumbnail.width,
          height: thumbnail.height,
          alt: title,
        },
      ],
    },
  };
};

export const dynamicParams = true;
export const generateStaticParams = async () => {
  const { data } = await getProducts({
    throwOnError: true,
  });
  return data.map((product) => ({
    id: product.id,
    slug: product.slug,
  }));
};

const Page = async (props: Props) => {
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
    <div className="flex flex-col gap-8 p-1 md:gap-24">
      <section className="grid grid-cols-1 gap-2 md:grid-cols-12">
        <div className="md:col-span-7">
          <ProductImages
            images={images}
            video={video}
          />
        </div>
        {/* TODO: fix scroll */}
        <div className="flex max-h-dvh flex-col gap-6 md:col-span-5 md:px-4">
          <div className="sticky bottom-0 flex flex-col gap-4">
            <ProductBreadcrumb title={product.title} />
            <ProductData product={product} />
            <ProductHighlights highlights={highlights} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>
      <ProductDescription description={product.description} />
    </div>
  );
};

export default Page;
