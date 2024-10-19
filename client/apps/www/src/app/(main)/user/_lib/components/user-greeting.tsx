import { getProfile } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { Skeleton, Typography } from "@jamsr-ui/react";

export const UserGreeting = async () => {
  const fetchClient = await authedClient();
  const { data } = await getProfile({
    client: fetchClient,
  });
  if (!data) return <Skeleton className="h-10" />;
  const { fullName } = data;
  return (
    <div className="my-4">
      <Typography
        as="p"
        variant="h3"
      >
        Hi, {fullName}
      </Typography>
    </div>
  );
};
