"use client";
// import { Metadata } from "next";
import { usePathname } from "next/navigation";
import LANG from "../config/language.config";
import Link from "next/link";

import "./css/globals.css";


// export const metadata = Metadata({
//     title: "Oppia",
//     description: "La référence du logiciel pédagogique",
// });

export default function RootLayout({ children }) {

    const pathname = usePathname();

    return (
        <html lang={LANG.lang}>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Oppia</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                {pathname === '/connection' ? null : (
                    <header>
                        <Link href="/">{LANG.menu.home}</Link>
                        <Link href="/notes">{LANG.menu.home}</Link>
                    </header>
                )}
                {children}
            </body>
        </html>
    );
}
