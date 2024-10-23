import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./global.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer";
import SmoothScroller from "@/components/Lenis";
import React, { Suspense } from "react";
import { NavProvider } from "@/context/NavContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalyticsClient from "@/components/GoogleAnalytics";
import Script from "next/script";

const dmSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR" className={`${dmSans.variable} `}>
      <link
        rel="icon"
        type="image/png"
        href="/favicon-48x48.png"
        sizes="48x48"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      <link rel="manifest" href="/site.webmanifest" />
      <body>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalyticsClient />
        <Suspense>
          <SmoothScroller />
        </Suspense>
        <NavProvider>
          <Header />
          <main>
            <div id="inner">
              <div
                id="slide"
                className="fixed left-0 top-0 z-20 h-screen w-screen bg-white"
              />
              <div id="page">
                <div id="opacity">
                  <React.StrictMode>{children}</React.StrictMode>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </NavProvider>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
      <Script
        strategy="afterInteractive"
        src="https://tarteaucitron.io/load.js?domain=alainbphoto.fr&uuid=98b3877369f196b37e4ad7146213dabda931802d"
      />
    </html>
  );
}
