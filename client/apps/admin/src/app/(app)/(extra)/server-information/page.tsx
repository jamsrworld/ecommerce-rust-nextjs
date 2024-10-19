import { serverInformation } from "@/api";
import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@jamsr-ui/react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Information",
};

const Page = async () => {
  const { data } = await serverInformation();
  if (!data) return <Skeleton className="h-12" />;

  const items = {
    "Last Cron": data.lastCron,
    "Last Success Cron": data.lastSuccessCron,
    "Free Memory": `${data.freeMemory} MiB`,
    "CPU Usage": `${data.cpuUsage}%`,
    "Host Name": data.osHostname,
    "OS Version": data.osVersion,
    "Total Memory": data.totalMemory,
    "OS Type": data.osPlatform,
    "Up Time": data.upTime,
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
