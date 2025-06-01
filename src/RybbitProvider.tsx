import React from "react";
import Script from "next/script";
import { RybbitProps } from "./types";

const RybbitProvider: React.FC<RybbitProps> = ({
  analyticsHost = "https://api.rybbit.io/api",
  siteId,
  enabled = true,
  trackLocalhost = false,
  debounce = 500,
  autoTrackPageviews = true,
  autoTrackSpaRoutes = true,
  trackQuerystring = true,
  trackOutboundLinks = true,
  skipPatterns = [],
  maskPatterns = [],
  debug = false,
  integrity,
  src,
}) => {
  // Skip rendering if disabled
  if (!enabled) {
    return null;
  }

  // Skip localhost tracking if not enabled
  if (!trackLocalhost && typeof window !== "undefined" && window.location.hostname === "localhost") {
    return null;
  }

  // Build script source URL
  const getScriptSrc = (): string => {
    if (src) return src;

    // analyticsHost should include the full path like https://rybbit.yourdomain.com/api
    const baseUrl = analyticsHost.replace(/\/api\/?$/, ""); // Remove /api if present
    return `${baseUrl}/api/script.js`;
  };

  const scriptSrc = getScriptSrc();

  // Build configuration object
  const config = {
    analyticsHost,
    siteId: siteId.toString(),
    debounce,
    autoTrackPageviews,
    autoTrackSpaRoutes,
    trackQuerystring,
    trackOutboundLinks,
    skipPatterns,
    maskPatterns,
    debug,
  };

  return (
    <>
      {/* Initialize rybbit config before script loads */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.rybbitConfig = ${JSON.stringify(config)};`
        }}
      />
      <Script
        src={scriptSrc}
        data-site-id={siteId}
        strategy="afterInteractive"
        integrity={integrity}
        crossOrigin={integrity ? "anonymous" : undefined}
        async
      />
    </>
  );
};

export default RybbitProvider;