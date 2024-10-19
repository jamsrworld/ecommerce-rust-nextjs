import { getProfile } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { cookies } from "next/headers";

export const UserData = async () => {
  const fetchClient = await authedClient();
  const cookieStore = await cookies();
  const userSession = cookieStore.get("x-session")?.value;
  if (!userSession) return "You aren't loggedin";
  const response = await getProfile({
    client: fetchClient,
  });
  if (response.error) return response.error;
  const fullName = response.data?.fullName;
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
        href="/user/profile"
        className="block"
      >
        Profile
      </Link>
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
