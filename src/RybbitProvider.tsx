import React from "react";
import Script from "next/script";
import { RybbitProps } from "./types";

const RybbitProvider: React.FC<RybbitProps> = ({
  siteId,
  enabled = true,
  trackLocalhost = false,
  manualPageViews = false,
  taggedEvents = false,
  revenue = false,
  outboundLinks = false,
  customDomain,
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

    const baseUrl = customDomain || "app.rybbit.io";
    const protocol = baseUrl.startsWith("localhost") ? "http" : "https";

    let scriptPath = "/api/script.js";

    // Add extensions based on options
    const extensions: string[] = [];
    if (outboundLinks) extensions.push("outbound-links");
    if (taggedEvents) extensions.push("tagged-events");
    if (revenue) extensions.push("revenue");
    if (manualPageViews) extensions.push("manual");

    if (extensions.length > 0) {
      scriptPath = `/api/script.${extensions.join(".")}.js`;
    }

    return `${protocol}://${baseUrl}${scriptPath}`;
  };

  const scriptSrc = getScriptSrc();

  return (
    <Script
      src={scriptSrc}
      data-site-id={siteId}
      strategy="afterInteractive"
      integrity={integrity}
      crossOrigin={integrity ? "anonymous" : undefined}
      async
    />
  );
};

export default RybbitProvider;
