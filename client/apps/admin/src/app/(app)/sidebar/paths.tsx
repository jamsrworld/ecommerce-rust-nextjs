import { SidebarIcons } from "./icons";
import { type SidebarGroupItemType } from "./sidebar-group-item";

export const sidebarLinkList: SidebarGroupItemType[] = [
  {
    heading: "General",
    items: [
      {
        heading: "Dashboard",
        icon: <SidebarIcons.Dashboard />,
        path: "/",
      },
      {
        heading: "Blogs",
        icon: <SidebarIcons.Blogs />,
        path: "/",
      },
      {
        heading: "Products",
        icon: <SidebarIcons.Products />,
        path: "/",
      },
      {
        heading: "Associate",
        icon: <SidebarIcons.Associate />,
        path: "/",
        items: [
          {
            heading: "Users",
            path: "/",
          },
          {
            heading: "Sellers",
            path: "/",
          },
          {
            heading: "Affiliates",
            path: "/",
          },
        ],
      },
      {
        heading: "Visitors",
        icon: <SidebarIcons.Associate />,
        path: "/",
      },
      {
        heading: "Purchases",
        icon: <SidebarIcons.Orders />,
        path: "/",
      },
      {
        heading: "Payouts",
        icon: <SidebarIcons.Payouts />,
        path: "/",
      },
      {
        heading: "Support",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
    ],
  },
  {
    heading: "User control",
    items: [
      {
        heading: "All Users",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Staffs",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Attributes",
        icon: <SidebarIcons.Support />,
        path: "/",
        items: [
          {
            heading: "Registrations",
            path: "/",
          },
          {
            heading: "Orders",
            path: "/",
          },
          {
            heading: "Top Products",
            path: "/",
          },
        ],
      },
    ],
  },
  {
    heading: "Order Management",
    items: [
      {
        heading: "Products",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Categories",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Attributes",
        icon: <SidebarIcons.Support />,
        path: "/",
        items: [
          {
            heading: "Registrations",
            path: "/",
          },
          {
            heading: "Orders",
            path: "/",
          },
          {
            heading: "Top Products",
            path: "/",
          },
        ],
      },
    ],
  },
  {
    heading: "Product Management",
    items: [
      {
        heading: "Products",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Categories",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Attributes",
        icon: <SidebarIcons.Support />,
        path: "/",
        items: [
          {
            heading: "Registrations",
            path: "/",
          },
          {
            heading: "Orders",
            path: "/",
          },
          {
            heading: "Top Products",
            path: "/",
          },
        ],
      },
    ],
  },
  {
    heading: "Reports",
    items: [
      {
        heading: "Orders",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Income & History",
        icon: <SidebarIcons.Support />,
        path: "/",
      },
      {
        heading: "Analytics",
        icon: <SidebarIcons.Support />,
        path: "/",
        items: [
          {
            heading: "Registrations",
            path: "/",
          },
          {
            heading: "Orders",
            path: "/",
          },
          {
            heading: "Top Products",
            path: "/",
          },
        ],
      },
    ],
  },
  {
    heading: "Site management",
    items: [
      {
        heading: "Staff Management",
        icon: <SidebarIcons.PaymentMethod />,
        path: "/",
        items: [
          {
            heading: "Checkout",
            path: "/",
          },
         
        ],
      },
      {
        heading: "Payment Settings",
        icon: <SidebarIcons.PaymentMethod />,
        path: "/",
        items: [
          {
            heading: "Checkout",
            path: "/",
          },
         
        ],
      },
      {
        heading: "System Settings",
        icon: <SidebarIcons.Setting />,
        path: "/",
        items: [
          {
            heading: "General Settings", // add site configuration and logo page
            path: "/",
          },
          {
            heading: "Email Configuration",
            path: "/",
          },
          {
            heading: "Extensions",
            path: "/",
          },
          {
            heading: "Seo",
            path: "/",
          },
          {
            heading: "Services",
            path: "/",
          },
        ],
      },
    ],
  },
  {
    heading: "Frontend Manager",
    items: [
      {
        heading: "Pages",
        icon: <SidebarIcons.Page />,
        path: "/",
        items: [
          {
            heading: "Privacy Policy",
            path: "/",
          },
          {
            heading: "Refund Policy",
            path: "/",
          },
          {
            heading: "Terms of Use",
            path: "/",
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
        path: "/",
      },
      {
        heading: "Login Sessions",
        icon: <SidebarIcons.LoginSession className="rotate-180" />,
        path: "/",
      },
      {
        heading: "System Information",
        icon: <SidebarIcons.ServerInfo />,
        path: "/",
      },
    ],
  },
];
