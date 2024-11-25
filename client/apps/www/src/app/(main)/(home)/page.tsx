import { BannerSection } from "./components/banner";
import { Banner2Section } from "./components/banner2";
import { Banner3Section } from "./components/banner3";
import { Banner4Section } from "./components/banner4";
import { Banner5Section } from "./components/banner5";
import { CarouselSection } from "./components/carousel";
import { CarouselShortsSection } from "./components/carousel-shorts";
import { CarouselTShirtsSection } from "./components/carousel-tshirts";
import { CategoriesSection } from "./components/categories";
import { CouponsSection } from "./components/coupons";
import { HeroSection } from "./components/hero";

const Page = () => {
  return (
    <div className="container flex max-w-screen-4xl flex-col gap-24 md:px-6 md:pb-6">
      <div className="flex flex-col gap-2">
        <HeroSection />
        <CouponsSection />
      </div>
      <CategoriesSection />
      <div>
        <Banner4Section />
        <Banner3Section />
      </div>
      <CarouselSection />
      <BannerSection />
      <CarouselShortsSection />
      <Banner2Section />
      <CarouselTShirtsSection />
      <Banner5Section />
    </div>
  );
};

export default Page;
