import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/globals.css";
import LANG from "../config/language.config";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LANG.lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Oppia</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <header>
          <Link href="/">{LANG.menu.home}</Link>
          <Link href="/notes">{LANG.menu.home}</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
