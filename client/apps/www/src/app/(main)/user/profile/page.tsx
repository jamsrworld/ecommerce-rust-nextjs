import { getProfile } from "@/api";
import { Button, Divider, Input, Skeleton, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Profile",
};

const Page = async () => {
  const { data } = await getProfile({
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (!data) return <Skeleton className="h-12" />;
  const { email, fullName } = data;
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
            <Typography
              className="text-base"
              as="p"
            >
              {email}
            </Typography>
          </li>
          <li className="flex justify-between">
            <Typography
              className="text-base"
              as="p"
            >
              Password
            </Typography>
            <Typography
              className="text-base"
              as="p"
            >
              ************
            </Typography>
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
          <Input
            labelPlacement="inside"
            label="Full Name"
            size="lg"
            defaultValue={fullName}
          />
          <Input
            labelPlacement="inside"
            label="Phone Number (Optional)"
            size="lg"
          />
          <Button color="primary">Update Information</Button>
        </div>
      </section>
    </div>
  );
};
export default Page;
