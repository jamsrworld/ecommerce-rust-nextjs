import { ProductCompanyInfo } from "./_lib/components/company-info";
import { ProductExtraDetails } from "./_lib/components/extra-details";
import { ProductDetails } from "./_lib/components/product-details";
import { ProductFeatures } from "./_lib/components/product-features";
import { ProductImages } from "./_lib/components/product-images";
import { ProductInfo } from "./_lib/components/product-info";

const page = () => {
  return (
    <div className="flex flex-col gap-24 bg-[#f7f6f3]">
      <section className="grid grid-cols-12 gap-12 pt-48">
        <div className="col-span-8">
          <ProductImages />
        </div>
        <div className="col-span-4 flex flex-col gap-6">
          <ProductDetails />
          <ProductFeatures />
          <ProductInfo />
        </div>
      </section>
      <section className="container mx-auto max-w-screen-lg">
        <ProductExtraDetails />
      </section>
      <section className="container mx-auto max-w-screen-lg py-24">
        <ProductCompanyInfo />
      </section>
    </div>
  );
};

export default page;
