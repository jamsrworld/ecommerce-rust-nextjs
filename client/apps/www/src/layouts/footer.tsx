import { AppLogo } from "@/components/app-logo";
import { APP_ROUTES } from "@/config/routes";
import { Divider, Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { type Route } from "next";

const items: { heading: string; items: { title: string; href: Route }[] }[] = [
  {
    heading: "Shop",
    items: [
      {
        title: "Shop",
        href: APP_ROUTES.home,
      },
      {
        title: "Women",
        href: APP_ROUTES.home,
      },
      {
        title: "Men",
        href: APP_ROUTES.home,
      },
      {
        title: "Shoes",
        href: APP_ROUTES.home,
      },
      {
        title: "Accessories",
        href: APP_ROUTES.home,
      },
      {
        title: "Sale",
        href: APP_ROUTES.home,
      },
    ],
  },
  {
    heading: "About",
    items: [
      {
        title: "About Us",
        href: APP_ROUTES.aboutUs,
      },
      {
        title: "Contact Us",
        href: APP_ROUTES.contactUs,
      },
    ],
  },
  {
    heading: "Help",
    items: [
      {
        title: "Payments",
        href: APP_ROUTES.help.payments,
      },
      {
        title: "Shipping",
        href: APP_ROUTES.help.shipping,
      },
      {
        title: "Cancellation & Returns",
        href: APP_ROUTES.help.cancellation,
      },
      {
        title: "FAQs",
        href: APP_ROUTES.help.faqs,
      },
    ],
  },
  {
    heading: "Policy",
    items: [
      {
        title: "Privacy Policy",
        href: APP_ROUTES.privacyPolicy,
      },
      {
        title: "Return Policy",
        href: APP_ROUTES.returnPolicy,
      },
      {
        title: "Terms of Use",
        href: APP_ROUTES.termsOfUse,
      },
    ],
  },
];

export const AppFooter = () => {
  return (
    <>
      <Divider color="light" />
      <footer className="dark container max-w-screen-4xl bg-background text-foreground max-md:hidden md:p-6">
        <div className="container mx-auto grid grid-cols-12 py-8 max-md:px-2">
          <div className="col-span-3 flex flex-col gap-4">
            <AppLogo />
            <Typography
              as="p"
              variant="caption"
              className="max-w-[150px] font-light"
            >
              29 SE 2nd Ave, Miami, Florida 33131, United States
            </Typography>
            <div>
              <Typography as="p">(786) 425-1900</Typography>
              <Typography
                variant="paragraph2"
                as="p"
              >
                (contact@jamsrworld.com)
              </Typography>
            </div>
          </div>
          <ul className="col-span-9 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {items.map((item) => (
              <li
                key={item.heading}
                className="flex flex-col gap-2"
              >
                <h3 className="font-semibold">{item.heading}</h3>
                <ul className="flex flex-col gap-2">
                  {item.items.map((subItem) => (
                    <li key={subItem.title}>
                      <Link
                        as={NextLink}
                        href={subItem.href}
                        className="text-sm text-inherit"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <Divider
          color="light"
          variant="gradient"
        />
        <div className="py-2 text-center">
          <Typography
            as="p"
            variant="paragraph2"
            className="text-foreground-secondary"
          >
            © 2024 Jamscart. All rights reserved
          </Typography>
        </div>
      </footer>
    </>
  );
};
