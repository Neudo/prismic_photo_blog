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
  const photographerSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Alain B Photo",
    "description": "Photographe professionnel en Bourgogne spécialisé en mariage, portrait et événementiel",
    "url": "https://alainbphoto.fr",
    "image": "https://alainbphoto.fr/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Bourgogne-Franche-Comté",
      "addressCountry": "FR",
      "addressLocality": "Bourgogne"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "47.0833",
      "longitude": "4.8333"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "47.0833",
        "longitude": "4.8333"
      },
      "geoRadius": "100000"
    },
    "priceRange": "€€-€€€",
    "openingHours": "Mo-Sa 09:00-18:00",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Photographiques",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Photographie de Mariage",
            "description": "Reportage photo complet de votre mariage en Bourgogne",
            "serviceType": "Mariage"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Photographie Portrait",
            "description": "Séance portrait professionnelle ou personnelle",
            "serviceType": "Portrait"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Photographie Événementielle",
            "description": "Couverture photographique de vos événements",
            "serviceType": "Événementiel"
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Côte-d'Or"
      },
      {
        "@type": "Place",
        "name": "Saône-et-Loire"
      },
      {
        "@type": "Place",
        "name": "Yonne"
      },
      {
        "@type": "Place",
        "name": "Nièvre"
      },
      {
        "@type": "City",
        "name": "Dijon"
      },
      {
        "@type": "City",
        "name": "Beaune"
      },
      {
        "@type": "City",
        "name": "Chalon-sur-Saône"
      },
      {
        "@type": "City",
        "name": "Mâcon"
      }
    ],
    "knowsAbout": [
      "Photographie de mariage",
      "Photographie de portrait",
      "Photographie événementielle",
      "Photographie artistique",
      "Retouche photo"
    ],
    "sameAs": [
      "https://www.instagram.com/alainbphoto",
      "https://www.facebook.com/alainbphoto"
    ]
  };

  return (
    <html lang="fr-FR" className={`${dmSans.variable} `}>
      <Seo />
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerSchema) }}
        />
      </head>
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
