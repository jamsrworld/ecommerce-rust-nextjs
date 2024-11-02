import { type Metadata } from "next";
import { AttributesTable } from "./_lib/components/attributes-table";

export const metadata: Metadata = {
  title: "Attributes",
};

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <AttributesTable />
    </div>
  );
};

export default Page;
