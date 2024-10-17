import { UIProvider } from "@jamsr-ui/react";
import type { Metadata } from "next";
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
  title: "Mcart - Modern Shopping Website",
  description: "Modern Shopping website for shopping with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} ${opensans.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
