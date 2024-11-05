import { type Metadata } from "next";
import { ProductCreateForm } from "./_lib/components/create-form";

export const metadata: Metadata = {
  title: "Create Product",
};

const page = () => {
  return (
    <div className="container grid max-w-screen-2xl gap-4">
      <ProductCreateForm />
    </div>
  );
};

export default page;
