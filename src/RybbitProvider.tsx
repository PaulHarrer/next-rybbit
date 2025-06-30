import React from 'react';
import Script from 'next/script';

export interface RybbitProviderProps {
  siteId: string;
  analyticsHost?: string;
  autoTrackPageview?: string;
  trackSpa?: string;
  trackQuery?: string;
  trackOutbound?: string;
  trackErrors?: string;
  sessionReplay?: string;
  webVitals?: string;
  skipPatterns?: string[];
  maskPatterns?: string[];
  debounce?: string;
  apiKey?: string;
  children: React.ReactNode;
}

export const RybbitProvider: React.FC<RybbitProviderProps> = ({
  siteId,
  analyticsHost = 'https://app.rybbit.io/api',
  autoTrackPageview = 'true',
  trackSpa = 'true',
  trackQuery = 'true',
  trackOutbound = 'true',
  trackErrors = 'false',
  sessionReplay = 'false',
  webVitals = 'false',
  skipPatterns = [],
  maskPatterns = [],
  debounce = '500',
  apiKey = undefined,
  children
}) => {
  const scriptSrc = `${analyticsHost}/script.js`;

  return (
    <>
      {children}
      <Script
        src={scriptSrc}
        data-site-id={siteId}
        data-auto-track-pageview={autoTrackPageview}
        data-track-spa={trackSpa}
        data-query={trackQuery}
        data-track-outbound={trackOutbound}
        data-track-errors={trackErrors}
        data-session-replay={sessionReplay}
        data-web-vitals={webVitals}
        data-skip-patterns={skipPatterns}
        data-mask-patterns={maskPatterns}
        data-debounce={debounce}
        data-api-key={apiKey}
        strategy="afterInteractive"
      />
    </>
  );
};

export default RybbitProvider;