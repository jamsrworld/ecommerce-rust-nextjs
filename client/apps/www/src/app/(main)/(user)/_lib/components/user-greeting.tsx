import { AuthedUserData } from "@/app/_components/user";
import { Typography } from "@jamsr-ui/react";
import { Suspense } from "react";

export const UserGreeting = () => {
  return (
    <div className="my-4 max-md:hidden">
      <Suspense>
        <AuthedUserData>
          {({ fullName }) => {
            return (
              <Typography
                as="p"
                variant="h3"
              >
                Hi, {fullName}
              </Typography>
            );
          }}
        </AuthedUserData>
      </Suspense>
    </div>
  );
};
