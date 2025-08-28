import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./global.css";

import Header from "@/components/Header/index";
import Footer from "@/components/Footer";
import SmoothScroller from "@/components/Lenis";
import React, { Suspense } from "react";
import { NavProvider } from "@/context/NavContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Seo from "@/components/Seo";
import Script from "next/script";
import { dmSans } from "@/app/ui/fonts";
import { PostHogProvider } from "@/app/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR" className={`${dmSans.variable} `}>
      <Seo />
      <body>
        <SpeedInsights />

        <Suspense>
          <SmoothScroller />
        </Suspense>
        <NavProvider>
          <PostHogProvider>
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
          </PostHogProvider>
        </NavProvider>
        <Script
          src={process.env.COOKIEYES}
          strategy="afterInteractive"
        ></Script>
        <Script
          src="https://www.hectoranalytics.com/script.js"
          strategy="beforeInteractive"
        />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
