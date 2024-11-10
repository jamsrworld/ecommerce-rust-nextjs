import { AppProvider } from "@/providers/app";
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
  icons: [{ rel: "icon", url: "/favicon.png" }],
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
