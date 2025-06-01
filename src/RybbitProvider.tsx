import React from "react";
import Script from "next/script";
import { RybbitProps } from "./types";

const RybbitProvider: React.FC<RybbitProps> = (props) => {
  const config = React.useMemo(() => {
    return {
      analyticsHost: props.analyticsHost || "https://api.rybbit.io/api",
      siteId: props.siteId.toString()
    };
  }, [props]);

  const scriptSrc = React.useMemo(() => {
    if (props.src) return props.src;
    const baseUrl = (props.analyticsHost || "https://api.rybbit.io/api").replace(/\/api\/?$/, "");
    return `${baseUrl}/api/script.js`;
  }, [props.src, props.analyticsHost]);

  return (
    <div style={{ display: 'contents' }}>
      {typeof window !== 'undefined' &&
        !(props.trackLocalhost === false && window.location.hostname === "localhost") && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.rybbitConfig = ${JSON.stringify(config)};`
            }}
          />
          <Script
            src={scriptSrc}
            data-site-id={props.siteId}
            strategy="afterInteractive"
            integrity={props.integrity}
            crossOrigin={props.integrity ? "anonymous" : undefined}
            async
          />
        </>
      )}
    </div>
  );
};

export default RybbitProvider;
