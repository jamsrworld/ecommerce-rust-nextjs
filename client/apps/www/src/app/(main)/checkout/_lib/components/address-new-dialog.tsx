import { AddAddressBtn } from "@/app/(main)/(user)/addresses/_lib/components/add-address-btn";

export const AddressNewDialog = () => {
  return (
    <AddAddressBtn
      addresses={2}
      maximumAddresses={3}
    />
  );
};
