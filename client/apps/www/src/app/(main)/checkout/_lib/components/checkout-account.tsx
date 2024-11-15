import { getProfile } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { Divider, Typography } from "@jamsr-ui/react";
import { FetchError } from "@repo/components/fetch-error";

export const CheckoutAccount = async () => {
  const fetchClient = await authedClient();
  const { error, data } = await getProfile({
    client: fetchClient,
  });
  if (error) return <FetchError error={error} />;
  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="h3"
        variant="h6"
      >
        Account
      </Typography>
      <Typography
        as="p"
        className="text-foreground-secondary"
      >
        {" "}
        {data?.email}
      </Typography>
      <Divider className="mt-4" />
    </div>
  );
};
