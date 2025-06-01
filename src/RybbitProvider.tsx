import React from 'react';
import Script from 'next/script';

export interface RybbitProviderProps {
  siteId: string;
  analyticsHost?: string;
  children: React.ReactNode;
}

export const RybbitProvider: React.FC<RybbitProviderProps> = ({
  siteId,
  analyticsHost = 'https://app.rybbit.io/api',
  children
}) => {
  const scriptSrc = `${analyticsHost}/script.js`;

  return (
    <>
      {children}
      <Script
        src={scriptSrc}
        data-site-id={siteId}
        strategy="afterInteractive"
      />
    </>
  );
};

export default RybbitProvider;