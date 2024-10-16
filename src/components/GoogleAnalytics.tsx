"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect } from "react";

export default function GoogleAnalyticsClient() {
  useEffect(() => {
    // Google Analytics sera chargé uniquement côté client
    console.log("Google Analytics loaded");
  }, []);

  return <GoogleAnalytics trackPageViews />;
}
