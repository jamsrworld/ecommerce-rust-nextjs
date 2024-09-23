"use client";

import type { AvatarProps } from "@jamsr-ui/react";
import { Avatar as UIAvatar } from "@jamsr-ui/react";
import type { ImageProps } from "./image";
import { Image } from "./image";

export const Avatar = (props: Omit<AvatarProps, "src"> & ImageProps) => {
  return <UIAvatar as={Image} {...props} />;
};