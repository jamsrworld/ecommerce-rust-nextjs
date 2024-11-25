import { Typography } from "@jamsr-ui/react";
import { SearchIcon } from "@repo/icons";
import { ArrowRightIcon } from "@repo/icons/arrow";

const items = [
  "The Mcart Store Evening Events",
  "Find a store",
  "Apple Gift Card",
  "Apple Vision Pro",
  "Apple Trade In",
];

export const SearchHeader = () => {
  return (
    <div className="absolute inset-0 h-dvh w-full bg-white">
      <div className="container max-w-screen-xl p-12">
        <div className="flex items-center">
          <SearchIcon
            width={32}
            height={32}
            className="text-foreground-secondary"
          />
          <input
            placeholder="Search mcart.com"
            className="w-full border-none px-2 font-inter text-xl outline-none placeholder:text-foreground-secondary"
          />
        </div>
        <div className="mt-12 flex flex-col gap-2">
          <Typography
            className="text-foreground-secondary"
            as="p"
            variant="caption"
          >
            Quick Links
          </Typography>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item}
                className="group flex cursor-pointer items-center gap-2 rounded px-1 hover:bg-content2"
              >
                <ArrowRightIcon
                  width={20}
                  height={20}
                  className="text-foreground-secondary transition-colors group-hover:text-foreground"
                />
                <Typography
                  as="p"
                  variant="paragraph2"
                >
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
