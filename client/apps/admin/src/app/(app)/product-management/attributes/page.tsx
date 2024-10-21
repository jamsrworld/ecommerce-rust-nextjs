import { type Metadata } from "next";
import { AttributesTable } from "./_lib/components/attributes-table";
import { CreateAttribute } from "./_lib/components/create-attribute";

export const metadata: Metadata = {
  title: "Attributes",
};

const Page = () => {
  return (
    <div>
      <CreateAttribute />
      <AttributesTable />
    </div>
  );
};

export default Page;
