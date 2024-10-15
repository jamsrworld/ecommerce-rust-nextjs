/* eslint-disable react/no-unescaped-entities */
import { type Metadata } from "next";
import { RegisterContentWrapper } from "./_lib/components/content-wrapper";

export const metadata: Metadata = {
  title: "Register",
};

const page = () => {
  return <RegisterContentWrapper />;
};

export default page;
