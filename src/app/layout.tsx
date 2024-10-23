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
        src="https://tarteaucitron.io/load.js?domain=www.alainb-photo.fr&uuid=98b3877369f196b37e4ad7146213dabda931802d"
      />
    </html>
  );
}
