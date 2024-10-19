import { getProfile } from "@/api";
import { Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { cookies } from "next/headers";

export const UserData = async () => {
  const cookieStore = await cookies();
  const userSession = cookieStore.get("x-session")?.value;
  if (!userSession) return "You aren't loggedin";
  const response = await getProfile({
    headers: {
      Cookie: cookieStore.toString(),
    },
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
