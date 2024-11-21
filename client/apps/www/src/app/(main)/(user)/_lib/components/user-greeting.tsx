import { Typography } from "@jamsr-ui/react";
import { Suspense } from "react";
import { ProfileContent } from "../../profile/content";

export const UserGreeting = () => {
  return (
    <div className="my-4">
      <Suspense>
        <ProfileContent>
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
        </ProfileContent>
      </Suspense>
    </div>
  );
};
