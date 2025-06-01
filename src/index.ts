export interface RybbitOptions {
  siteId: string;
  apiKey?: string;
  enabled?: boolean;
  trackLocalhost?: boolean;
  manualPageViews?: boolean;
  taggedEvents?: boolean;
  revenue?: boolean;
  outboundLinks?: boolean;
  customDomain?: string;
  integrity?: string;
}

export interface RybbitProps {
  siteId: string;
  enabled?: boolean;
  trackLocalhost?: boolean;
  manualPageViews?: boolean;
  taggedEvents?: boolean;
  revenue?: boolean;
  outboundLinks?: boolean;
  customDomain?: string;
  integrity?: string;
  src?: string;
}

export interface EventOptions {
  callback?: () => void;
  props?: Record<string, string | number | boolean>;
  revenue?: {
    currency: string;
    amount: number;
  };
}

export interface PageviewOptions {
  url?: string;
  referrer?: string;
  deviceWidth?: number;
  props?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    rybbit?: {
      (...args: any[]): void;
      q?: any[];
    };
  }
}
