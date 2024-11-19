import { AppProvider } from "@/providers/app";
import type { Metadata, Viewport } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: {
    absolute: "Mcart - Rust E-Commerce Website",
    template: "%s | Mcart",
  },
  description: "An eCommerce website built with Rust and Next.js",
  keywords: [
    "rust",
    "next.js",
    "next js",
    "rust e-commerce website",
    "rust ecommerce",
    "rust with next.js",
    "rust with next js",
    "rust next.js e-commerce website",
  ],
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${opensans.variable} font-inter font-normal antialiased`}
    >
      <body className="flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
