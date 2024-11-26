/* eslint-disable @typescript-eslint/naming-convention */
import { getAddresses } from "@/client";
import { EmptyContent } from "@/components/empty-content";
import { authedClient } from "@/utils/authed-client";
import { Typography } from "@jamsr-ui/react";
import { FetchError } from "@repo/components/fetch-error";
import { LocationIcon } from "@repo/icons";
import React from "react";
import EmptyAddress from "~/empty-address.webp";
import { AddAddressBtn } from "./add-address-btn";
import { DefaultAddress } from "./default-address";
import { DeleteAddress } from "./delete-address";
import { EditAddress } from "./edit-address";
import { SetAsDefaultAddress } from "./set-as-default";

export const AddressList = async () => {
  const fetchClient = await authedClient();
  const response = await getAddresses({
    client: fetchClient,
  });
  if (response.error) return <FetchError error={response.error} />;
  const { data } = response;
  return (
    <div>
      <ul className="flex flex-col divide-y divide-divider">
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
            <React.Fragment key={id}>
              <li className="flex items-start gap-2 py-4 md:gap-4">
                <LocationIcon className="mt-6" />
                {/* <div className="relative mt-8 flex items-center justify-center text-foreground-secondary">
                  <HexagonIcon className="text-foreground-secondary" />
                  <LocationIcon className="absolute" />
                </div> */}
                <div className="flex grow flex-col">
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
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      <div className="flex flex-col items-center">
        {data.length === 0 && (
          <EmptyContent
            heading="No addresses found"
            image={EmptyAddress}
          />
        )}
        <AddAddressBtn
          addresses={data.length}
          maximumAddresses={5}
        />
      </div>
    </div>
  );
};
