import { Divider, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";
import { Suspense } from "react";
import { ChangePasswordDialog } from "./_components/change-password-form";
import { ProfileUpdateForm } from "./_components/profile-form";
import { AuthedUserData } from "../../../_components/user";

export const metadata: Metadata = {
  title: "Profile",
};

const Page = () => {
  return (
    <div>
      <section className="flex flex-col gap-2">
        <Typography
          as="h1"
          variant="h3"
          className="font-normal"
        >
          Personal Information
        </Typography>
        <Divider />
      </section>
      <section className="flex flex-col gap-2 py-6">
        <Typography
          as="h3"
          variant="h5"
          className="font-normal"
        >
          Login Information
        </Typography>
        <ul className="flex max-w-sm flex-col gap-2 text-foreground-secondary">
          <li className="flex justify-between">
            <Typography
              className="text-base"
              as="p"
            >
              Email
            </Typography>
            <Suspense>
              <AuthedUserData>
                {({ email }) => (
                  <Typography
                    className="text-base"
                    as="p"
                  >
                    {email}
                  </Typography>
                )}
              </AuthedUserData>
            </Suspense>
          </li>
          <li className="flex justify-between">
            <Typography
              className="text-base"
              as="p"
            >
              Password
            </Typography>
            <div className="flex items-center">
              <Typography
                className="text-base"
                as="p"
              >
                ************
              </Typography>
              <ChangePasswordDialog />
            </div>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-2">
        <div>
          <Typography
            as="h3"
            variant="h5"
            className="font-normal"
          >
            About Me
          </Typography>
          <Typography
            className="text-foreground-secondary"
            as="p"
          >
            Your information will be used for easy account lookup in-store.
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Suspense>
            <AuthedUserData>
              {({ fullName }) => <ProfileUpdateForm fullName={fullName} />}
            </AuthedUserData>
          </Suspense>
        </div>
      </section>
    </div>
  );
};
export default Page;
