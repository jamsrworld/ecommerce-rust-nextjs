import { Button, Divider, Input, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";

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
            <Typography
              className="text-base"
              as="p"
            >
              admin@gmail.com
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
