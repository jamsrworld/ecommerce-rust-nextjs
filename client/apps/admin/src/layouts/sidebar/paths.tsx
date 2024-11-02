import { APP_ROUTES } from "@/config/routes";
import { SidebarIcons } from "./icons";
import { type SidebarGroupItemType } from "./sidebar-group-item";

export const sidebarLinkList: SidebarGroupItemType[] = [
  // {
  //   heading: "General",
  //   items: [
  //     {
  //       heading: "Dashboard",
  //       icon: <SidebarIcons.Dashboard />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Blogs",
  //       icon: <SidebarIcons.Blogs />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Products",
  //       icon: <SidebarIcons.Products />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Associate",
  //       icon: <SidebarIcons.Associate />,
  //       path: "/",
  //       items: [
  //         {
  //           heading: "Users",
  //           path: "/",
  //         },
  //         {
  //           heading: "Sellers",
  //           path: "/",
  //         },
  //         {
  //           heading: "Affiliates",
  //           path: "/",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "Visitors",
  //       icon: <SidebarIcons.Associate />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Purchases",
  //       icon: <SidebarIcons.Orders />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Payouts",
  //       icon: <SidebarIcons.Payouts />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Support",
  //       icon: <SidebarIcons.Support />,
  //       path: "/",
  //     },
  //   ],
  // },
  // {
  //   heading: "User control",
  //   items: [
  //     {
  //       heading: "All Users",
  //       icon: <SidebarIcons.Support />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Staffs",
  //       icon: <SidebarIcons.Support />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Attributes",
  //       icon: <SidebarIcons.Support />,
  //       path: "/",
  //     },
  //   ],
  // },
  // {
  //   heading: "Order Management",
  //   items: [
  //     {
  //       heading: "Products",
  //       icon: <SidebarIcons.Support />,
  //       path: "/order-management/products",
  //     },
  //     {
  //       heading: "Categories",
  //       icon: <SidebarIcons.Support />,
  //       path: "/order-management/categories",
  //     },
  //     {
  //       heading: "Attributes",
  //       icon: <SidebarIcons.Support />,
  //       path: "/order-management/attributes",
  //     },
  //   ],
  // },
  {
    heading: "Product Management",
    items: [
      {
        heading: "Products",
        icon: <SidebarIcons.Support />,
        path: APP_ROUTES.productManagement.products.root,
      },
      {
        heading: "Categories",
        icon: <SidebarIcons.Support />,
        path: APP_ROUTES.productManagement.categories.root,
      },
      {
        heading: "Attributes",
        icon: <SidebarIcons.Support />,
        path: APP_ROUTES.productManagement.attributes.root,
      },
    ],
  },
  // {
  //   heading: "Reports",
  //   items: [
  //     {
  //       heading: "Orders",
  //       icon: <SidebarIcons.Support />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Income & History",
  //       icon: <SidebarIcons.Support />,
  //       path: "/",
  //     },
  //     {
  //       heading: "Analytics",
  //       icon: <SidebarIcons.Support />,
  //       path: "/",
  //       items: [
  //         {
  //           heading: "Registrations",
  //           path: "/",
  //         },
  //         {
  //           heading: "Orders",
  //           path: "/",
  //         },
  //         {
  //           heading: "Top Products",
  //           path: "/",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    heading: "Settings",
    items: [
      {
        heading: "Staff Management",
        icon: <SidebarIcons.PaymentMethod />,
        path: APP_ROUTES.settings.staffManagement.root,
        items: [
          {
            heading: "Staffs",
            path: APP_ROUTES.settings.staffManagement.staffs,
          },
          {
            heading: "Roles",
            path: APP_ROUTES.settings.staffManagement.roles,
          },
        ],
      },
      {
        heading: "Payment Settings",
        icon: <SidebarIcons.PaymentMethod />,
        path: APP_ROUTES.settings.payment.root,
        items: [
          {
            heading: "Checkout",
            path: APP_ROUTES.settings.payment.checkout,
          },
        ],
      },
      {
        heading: "System Settings",
        icon: <SidebarIcons.Setting />,
        path: APP_ROUTES.settings.system.root,
        items: [
          {
            heading: "General Settings", // add site configuration and logo page
            path: APP_ROUTES.settings.system.generalSettings,
          },
          {
            heading: "Email Settings",
            path: APP_ROUTES.settings.system.emailSettings,
          },
          {
            heading: "Extensions",
            path: APP_ROUTES.settings.system.extensions,
          },
          {
            heading: "SEO",
            path: APP_ROUTES.settings.system.seo,
          },
          {
            heading: "Services",
            path: APP_ROUTES.settings.system.services,
          },
        ],
      },
    ],
  },
  {
    heading: "Frontend",
    items: [
      {
        heading: "Pages",
        icon: <SidebarIcons.Page />,
        path: APP_ROUTES.frontend.root,
        items: [
          {
            heading: "Privacy Policy",
            path: APP_ROUTES.frontend.pages.privacyPolicy,
          },
          {
            heading: "Refund Policy",
            path: APP_ROUTES.frontend.pages.refundPolicy,
          },
          {
            heading: "Terms of Use",
            path: APP_ROUTES.frontend.pages.termsOfUse,
          },
        ],
      },
    ],
  },
  {
    heading: "Extra",
    items: [
      {
        heading: "Profile",
        icon: <SidebarIcons.Profile />,
        path: APP_ROUTES.extra.profile,
      },
      {
        heading: "Login Sessions",
        icon: <SidebarIcons.LoginSession className="rotate-180" />,
        path: APP_ROUTES.extra.loginSessions,
      },
      {
        heading: "Server Information",
        icon: <SidebarIcons.ServerInfo />,
        path: APP_ROUTES.extra.serverInformation,
      },
    ],
  },
];
