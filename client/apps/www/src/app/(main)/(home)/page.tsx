import { Banner2Section } from "./components/banner-2";
import { CarouselSection } from "./components/carousel";
import { CarouselShortsSection } from "./components/carousel-shorts";
import { CarouselTShirtsSection } from "./components/carousel-tshirts";
import { CategoriesSection } from "./components/categories";
import { CouponsSection } from "./components/coupons";
import { HeroSection } from "./components/hero";

const Page = () => {
  return (
    <div className="container flex max-w-screen-2xl flex-col gap-24 p-1 pb-24">
      <div className="flex flex-col gap-2">
        <HeroSection />
        <CouponsSection />
      </div>
      <CategoriesSection />
      <CarouselSection />
      <CarouselShortsSection />
      <Banner2Section />
      <CarouselTShirtsSection />
    </div>
  );
};

export default Page;
