import { APP_ROUTES } from "@/config/routes";
import { Divider, Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { type Route } from "next";

const items: { heading: string; items: { title: string; href: Route }[] }[] = [
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
        href: APP_ROUTES.home,
      },
      {
        title: "Shipping",
        href: APP_ROUTES.home,
      },
      {
        title: "Cancellation & Returns",
        href: APP_ROUTES.home,
      },
      {
        title: "FAQs",
        href: APP_ROUTES.home,
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
    <footer>
      <Divider />
      <div className="container mx-auto py-8 max-md:px-2">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.heading}
              className="flex flex-col gap-4"
            >
              <h3>{item.heading}</h3>
              <ul className="flex flex-col gap-2">
                {item.items.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      as={NextLink}
                      href={subItem.href}
                      className="text-sm"
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
      <Divider variant="gradient" />
      <div className="py-2 text-center">
        <Typography as="p"> © 2024 Jamscart </Typography>
      </div>
    </footer>
  );
};
