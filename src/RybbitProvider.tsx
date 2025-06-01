import React, { useEffect } from "react";
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
  // Use a client-side effect to set up Rybbit, rather than having conditional rendering
  useEffect(() => {
    if (!enabled) return;
    if (!trackLocalhost && window.location.hostname === "localhost") return;

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
    
    // Make config available globally
    window.rybbitConfig = config;
  }, [
    analyticsHost,
    siteId,
    enabled,
    trackLocalhost,
    debounce,
    autoTrackPageviews,
    autoTrackSpaRoutes,
    trackQuerystring,
    trackOutboundLinks,
    skipPatterns,
    maskPatterns,
    debug
  ]);

  // Build script source URL
  const getScriptSrc = (): string => {
    if (src) return src;
    const baseUrl = analyticsHost.replace(/\/api\/?$/, ""); // Remove /api if present
    return `${baseUrl}/api/script.js`;
  };

  // Always return the same structure for both server and client
  return (
    <Script
      id="rybbit-analytics-script"
      src={getScriptSrc()}
      data-site-id={siteId.toString()}
      strategy="lazyOnload"
      integrity={integrity}
      crossOrigin={integrity ? "anonymous" : undefined}
    />
  );
};

export default RybbitProvider;
