import { getUser } from "@/api";
import { Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { cookies } from "next/headers";

export const UserData = async () => {
  const userSession = cookies().get("x-session")?.value;
  if (!userSession) return "You aren't loggedin";
  const response = await getUser({
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (response.error) return response.error;
  const fullName = response.data?.fullName as unknown as string;
  return (
    <div>
      <Typography
        variant="h1"
        as="p"
      >
        Hello👋 {fullName}
      </Typography>
      <Link
        as={NextLink}
        href="/logout"
      >
        Logout
      </Link>
      <pre>{JSON.stringify(response.data, null, 2)}</pre>
    </div>
  );
};
