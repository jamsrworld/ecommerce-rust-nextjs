import { Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
};

const Page = () => {
  return (
    <div>
      <Typography
        as="h1"
        variant="h1"
        className="text-center"
      >
        FAQs
      </Typography>
      <div className="mt-4 flex flex-col gap-4 md:mt-8">
        <Typography as="p">
          This document is an electronic record in terms of Information
          Technology Act, 2000 and rules there under as applicable and the
          amended provisions pertaining to electronic records in various
          statutes as amended by the Information Technology Act, 2000. This
          electronic record is generated by a computer system and does not
          require any physical or digital signatures.
        </Typography>
      </div>
    </div>
  );
};

export default Page;
