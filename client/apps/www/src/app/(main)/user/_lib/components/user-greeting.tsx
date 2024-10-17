import { getProfile } from "@/api";
import { Skeleton, Typography } from "@jamsr-ui/react";
import { cookies } from "next/headers";

export const UserGreeting = async () => {
  const { data } = await getProfile({
    headers: {
      Cookie: cookies().toString(),
    },
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
