import { Typography } from "@jamsr-ui/react";
import { Suspense } from "react";
import { AuthedUserData } from "../../../../_components/user";

export const UserGreeting = () => {
  return (
    <div className="my-4">
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
