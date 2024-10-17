/* eslint-disable @typescript-eslint/naming-convention */
import { Divider, Typography } from "@jamsr-ui/react";
import { cookies } from "next/headers";
import { getAddresses } from "@/api";
import { DefaultAddress } from "./default-address";
import { DeleteAddress } from "./delete-address";
import { EditAddress } from "./edit-address";
import { SetAsDefaultAddress } from "./set-as-default";

export const AddressList = async () => {
  const response = await getAddresses({
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (response.error) return response.error;
  const { data } = response;
  return (
    <ul className="flex flex-col">
      {data.map((item) => {
        const {
          fullAddress,
          firstName,
          isDefault,
          lastName,
          phoneNumber,
          postalCode,
          state,
          city,
          landmark,
          id,
        } = item;
        return (
          <>
            <li
              className="py-4"
              key={id}
            >
              <div className="flex items-center justify-between">
                <div>{isDefault && <DefaultAddress />}</div>
                <div className="flex gap-4">
                  {!isDefault && <SetAsDefaultAddress id={id} />}
                  <EditAddress
                    formData={item}
                    id={id}
                  />
                  <DeleteAddress id={id} />
                </div>
              </div>
              <div className="text-base font-normal text-foreground-secondary">
                <Typography
                  as="p"
                  className="font-medium text-foreground"
                  style={{
                    fontSize: "inherit",
                  }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography
                  as="p"
                  style={{
                    fontSize: "inherit",
                  }}
                >
                  {fullAddress}
                </Typography>
                <Typography
                  as="p"
                  style={{
                    fontSize: "inherit",
                  }}
                >
                  {postalCode} {city} {state}
                </Typography>
                <Typography
                  as="p"
                  style={{
                    fontSize: "inherit",
                  }}
                >
                  {phoneNumber}
                </Typography>
                <Typography
                  as="p"
                  style={{
                    fontSize: "inherit",
                  }}
                >
                  {landmark}
                </Typography>
              </div>
            </li>
            <Divider />
          </>
        );
      })}
    </ul>
  );
};
