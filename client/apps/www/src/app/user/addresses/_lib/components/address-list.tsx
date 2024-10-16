/* eslint-disable @typescript-eslint/naming-convention */
import { getAddresses } from "@/api";
import { Typography } from "@jamsr-ui/react";
import { CheckIcon } from "@repo/icons";
import { cookies } from "next/headers";
import { DeleteAddress } from "./delete-address";

export const AddressList = async () => {
  const response = await getAddresses({
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (response.error) return response.error;
  const { data } = response;
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => {
        const {
          first_name,
          city,
          full_address,
          is_default,
          landmark,
          last_name,
          phone_number,
          postal_code,
          state,
          id,
        } = item;
        return (
          <div key={id}>
            {is_default && <CheckIcon className="text-success" />}
            <DeleteAddress id={id} />
            <Typography
              as="p"
              className="font-normal"
            >
              {first_name} {last_name}
            </Typography>
            <Typography
              as="p"
              className="font-normal"
            >
              {full_address}
            </Typography>
            <Typography
              as="p"
              className="font-normal"
            >
              {postal_code} {city} {state}
            </Typography>
            <Typography
              as="p"
              className="font-normal"
            >
              {phone_number}
            </Typography>
            <Typography
              as="p"
              className="font-normal"
            >
              {landmark}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
