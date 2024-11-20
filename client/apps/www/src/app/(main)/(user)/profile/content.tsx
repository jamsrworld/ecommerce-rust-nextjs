import { getProfile, type UserProfile } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { FetchError } from "@repo/components/fetch-error";
import React, { cache } from "react";

type Props = {
  children: (data: UserProfile) => React.ReactNode;
};

const getCachedProfile = cache(async () => {
  const fetchClient = await authedClient();
  return getProfile({
    client: fetchClient,
  });
});

export const ProfileContent = async (props: Props) => {
  const { children } = props;
  const { data, error } = await getCachedProfile();
  if (error) return <FetchError error={error} />;
  return <>{children(data!)}</>;
};
