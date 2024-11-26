import { Button, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { APP_NAME } from "@repo/config/app";
import { MCART_DOWNLOAD_URL } from "@repo/config/others";
import { LightningIcon } from "@repo/icons";
import { ArrowRightIcon } from "@repo/icons/arrow";

export const FooterCTA = () => (
  <div className="bg-warning-200 p-4">
    <div className="container flex max-w-screen-lg items-center justify-between">
      <div className="flex items-center gap-4">
        <LightningIcon className="[&>path]:stroke-2" />
        <Typography
          as="p"
          variant="h6"
        >
          Start your online store with {APP_NAME}
        </Typography>
      </div>
      <Button
        color="warning"
        isRounded
        className="group"
        as={NextLink}
        href={MCART_DOWNLOAD_URL}
        target="_blank"
        endContent={
          <ArrowRightIcon
            width={20}
            height={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        }
      >
        Get Started
      </Button>
    </div>
  </div>
);
