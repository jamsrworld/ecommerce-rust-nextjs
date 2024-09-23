import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { JamsrUIProvider } from "@jamsr-ui/react";
import { Open_Sans } from "next/font/google";

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
      className={`dark ${inter.variable} ${opensans.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        <JamsrUIProvider>{children}</JamsrUIProvider>
      </body>
    </html>
  );
}
