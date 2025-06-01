export interface RybbitOptions {
  analyticsHost: string;
  siteId: string | number;
  debounce?: number;
  autoTrackPageviews?: boolean;
  autoTrackSpaRoutes?: boolean;
  trackQuerystring?: boolean;
  trackOutboundLinks?: boolean;
  skipPatterns?: string[];
  maskPatterns?: string[];
  debug?: boolean;
}

export interface RybbitProps {
  analyticsHost: string;
  siteId: string | number;
  enabled?: boolean;
  trackLocalhost?: boolean;
  debounce?: number;
  autoTrackPageviews?: boolean;
  autoTrackSpaRoutes?: boolean;
  trackQuerystring?: boolean;
  trackOutboundLinks?: boolean;
  skipPatterns?: string[];
  maskPatterns?: string[];
  debug?: boolean;
  integrity?: string;
  src?: string;
}

export interface EventOptions {
  callback?: () => void;
  props?: Record<string, string | number | boolean>;
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
