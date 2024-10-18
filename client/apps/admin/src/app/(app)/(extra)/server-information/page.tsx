import { Card, CardContent, CardHeader, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Information",
};

const Page = () => {
  const items = {
    "Last Cron": "17 Oct 2024 17:08:03",
    "Last Success Cron": "17 Oct 2024 17:08:03",
    "Free Memory": "7.51 GiB",
    "Host Name": "81af18c4e620",
    "OS Version": "#41-Ubuntu SMP PREEMPT_DYNAMIC Fri Aug 2 20:41:06 UTC 2024",
    "Total Memory": "15.62 GiB",
    "OS Type": "Linux",
    "Up Time": "1 month 15 days 4 hours 50 minutes 16 seconds",
  };

  return (
    <div className="container max-w-screen-sm">
      <Card className="shadow-lg">
        <CardHeader heading="Server Information" />
        <CardContent>
          <ul className="flex flex-col gap-4">
            {Object.entries(items).map(([key, value]) => {
              return (
                <li
                  className="flex justify-between"
                  key={key}
                >
                  <Typography
                    className="text-foreground-secondary"
                    as="p"
                    variant="paragraph"
                  >
                    {key}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    as="p"
                  >
                    {value}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
