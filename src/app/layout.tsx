import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./global.css"
import { Inter } from 'next/font/google'
import Header from "@/components/Header/index"
import Footer from "@/components/Footer"
import SmoothScroller from "@/components/Lenis"
import {Suspense} from "react";


const dmSans = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-dm-sans',
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${dmSans.variable} `}>
        <body className="" >
        <Suspense>
            <SmoothScroller />
        </Suspense>
        <Header/>
        <main>{children}</main>
        <Footer/>
        </body>
        <PrismicPreview repositoryName={repositoryName} />
        </html>
    );
}
