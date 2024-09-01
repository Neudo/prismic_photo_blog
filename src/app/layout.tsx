import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./global.css"
import { Inter } from 'next/font/google'
import Header from "@/components/Header/index"
import Footer from "@/components/Footer"
import SmoothScroller from "@/components/Lenis"
import {Suspense} from "react";
import {NavProvider} from "@/context/NavContext";


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
        <html lang="fr-FR" className={`${dmSans.variable} `}>
        <body >
        <Suspense>
            <SmoothScroller />
        </Suspense>
        <NavProvider>
        <Header/>
            <main>
                <div id="inner">
                    <div id="slide" className="fixed top-0 left-0 w-screen h-screen bg-white z-20"/>
                    <div id="page">
                        <div id="opacity">
                            {children}
                        </div>
                    </div>

                </div>
            </main>
        <Footer/>
        </NavProvider>
        </body>
        <PrismicPreview repositoryName={repositoryName} />
        </html>
    );
}
