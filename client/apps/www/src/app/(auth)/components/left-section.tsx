import { Typography } from "@jamsr-ui/react";
import Image from "next/image";
import BoyImage from "./assets/register-boy.png";
import UnderlineSvg from "./assets/underline.svg?url";

export const LeftSection = () => {
  return (
    <div className="relative flex flex-col overflow-auto rounded-3xl bg-gradient-to-b from-primary-300 from-60% via-primary-500 via-80% to-primary-600 to-90% p-8">
      <div className="noise pointer-events-none absolute inset-0 size-full" />
      <Typography
        as="h3"
        variant="h3"
        className="leading-tight"
      >
        Simply <br /> management with
        <br /> our{" "}
        <div className="inline-flex flex-col">
          dashboard
          <Image
            src={UnderlineSvg}
            alt=""
            className="w-36"
          />
        </div>
      </Typography>
      <p className="mt-4">
        Simply your e-commerce management with our user-friendly admin dashboard
      </p>
      <div style={{
        transform:"rotateY(180deg)"
      }} >
      <Image
        src={BoyImage}
        alt="boy"
        className="mx-auto mt-auto h-96 w-auto py-4"
      />
      </div>
    </div>
  );
};
