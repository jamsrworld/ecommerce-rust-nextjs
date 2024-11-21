import { env } from "@/env";
import { verifyJwtToken } from "@/utils/jwt";
import { cookies } from "next/headers";

type Props = {
  loggedIn?: React.ReactNode;
  loggedOut?: React.ReactNode;
};

// todo:
// @ts-expect-error todo: fix type
export const AuthGuard = async (props: Props): React.ReactNode => {
  const { loggedIn, loggedOut } = props;
  const cookieStore = await cookies();
  const sessionKey = cookieStore.get("x-session")?.value;
  if (!sessionKey) return loggedOut;

  try {
    const validToken = await verifyJwtToken({
      secret: env.JWT_SECRET,
      token: sessionKey,
    });
    // eslint-disable-next-line @typescript-eslint/return-await
    if (!validToken) return loggedOut;
  } catch (err) {
    return loggedOut;
  }

  return loggedIn;
};
