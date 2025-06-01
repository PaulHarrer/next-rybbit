import React, { useState, useEffect } from "react";
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
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let render = enabled;
    
    // Check for localhost and only execute on client side
    if (!trackLocalhost && window.location.hostname === "localhost") {
      render = false;
    }
    
    setShouldRender(render);
  }, [enabled, trackLocalhost]);

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

  // On the server side, we don't render the script immediately
  if (!shouldRender && typeof window !== 'undefined') {
    return null;
  }

  // Temporary placeholder for server-side rendering
  if (typeof window === 'undefined') {
    return <div id="rybbit-provider-placeholder" />;
  }

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
