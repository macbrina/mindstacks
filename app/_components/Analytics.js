"use client";

import Script from "next/script";
import { useEffect } from "react";

const Analytics = () => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`, {
        page_path: url,
      });
    };

    window.addEventListener("popstate", () =>
      handleRouteChange(window.location.pathname)
    );
    window.addEventListener("pushState", () =>
      handleRouteChange(window.location.pathname)
    );
    window.addEventListener("replaceState", () =>
      handleRouteChange(window.location.pathname)
    );

    // Initial page load
    handleRouteChange(window.location.pathname);

    return () => {
      window.removeEventListener("popstate", () =>
        handleRouteChange(window.location.pathname)
      );
      window.removeEventListener("pushState", () =>
        handleRouteChange(window.location.pathname)
      );
      window.removeEventListener("replaceState", () =>
        handleRouteChange(window.location.pathname)
      );
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default Analytics;
