import { getProduct } from "@/client";
import { FetchError } from "@repo/components/fetch-error";
import { ProductUpdateForm } from "./product-update-form";

type Params = Promise<{ id: string }>;
type Props = {
  params: Params;
};

const Page = async (props: Props) => {
  const { id } = await props.params;
  const { error, data } = await getProduct({
    path: {
      id,
    },
  });
  if (error) return <FetchError error={error} />;
  return (
    <div>
      <ProductUpdateForm formData={data} />
    </div>
  );
};

export default Page;
