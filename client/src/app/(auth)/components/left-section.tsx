import { Typography } from "@jamsr-ui/react";
import Image from "next/image";
import BoyImage from "./assets/login-boy.png";
import UnderlineSvg from "./assets/underline.svg";

export const LeftSection = () => {
  return (
    <div className="bg-gradient-to-b flex flex-col from-primary-300 relative overflow-auto from-60% via-primary-500 via-80% to-primary-600 to-90% rounded-3xl p-8">
      <div className="noise absolute size-full inset-0 pointer-events-none" />
      <Typography as="h3" variant="h3" className="leading-tight">
        Simply <br /> management with
        <br /> our{" "}
        <div className="inline-flex flex-col">
          dashboard
          <Image src={UnderlineSvg} alt="" className="w-36" />
        </div>
      </Typography>
      <p className="mt-4">
        Simply your e-commerce management with our user-friendly admin dashboard
      </p>
      <Image
        src={BoyImage}
        alt="boy"
        className="h-80 align-self-end w-auto mx-auto mt-auto"
      />
    </div>
  );
};
