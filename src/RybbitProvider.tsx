import React from 'react';
import Script from 'next/script';

export interface RybbitProviderProps {
    analyticsHost?: string;
    siteId: string;
    debounce?: string;
    webVitals?: string;
    skipPatterns?: string[];
    maskPatterns?: string[];
    replayMaskTextSelectors?: string[];
    apiKey?: string;
    children: React.ReactNode;
}

export const RybbitProvider: React.FC<RybbitProviderProps> = ({
  siteId,
  analyticsHost = 'https://app.rybbit.io/api',
  webVitals = 'false',
  skipPatterns = [],
  maskPatterns = [],
  replayMaskTextSelectors = [],
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
        data-web-vitals={webVitals}
        data-skip-patterns={skipPatterns}
        data-mask-patterns={maskPatterns}
        data-replay-mask-text-selectors={replayMaskTextSelectors}
        data-debounce={debounce}
        data-api-key={apiKey}
        strategy="afterInteractive"
      />
    </>
  );
};

export default RybbitProvider;