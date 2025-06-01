import { useCallback } from "react";
import { EventOptions, PageviewOptions } from "./types";

export const useRybbit = () => {
  const rybbit = useCallback((...args: any[]) => {
    if (typeof window !== "undefined" && window.rybbit) {
      window.rybbit(...args);
    }
  }, []);

  const trackEvent = useCallback((eventName: string, options?: EventOptions) => {
    if (typeof window === "undefined" || !window.rybbit) return;

    const eventData: any = { name: eventName };

    if (options?.props) {
      eventData.props = options.props;
    }

    if (options?.revenue) {
      eventData.revenue = options.revenue;
    }

    window.rybbit("event", eventData);

    if (options?.callback) {
      options.callback();
    }
  }, []);

  const trackPageview = useCallback((options?: PageviewOptions) => {
    if (typeof window === "undefined" || !window.rybbit) return;

    const pageviewData: any = {};

    if (options?.url) {
      pageviewData.url = options.url;
    }

    if (options?.referrer) {
      pageviewData.referrer = options.referrer;
    }

    if (options?.deviceWidth) {
      pageviewData.deviceWidth = options.deviceWidth;
    }

    if (options?.props) {
      pageviewData.props = options.props;
    }

    window.rybbit("pageview", pageviewData);
  }, []);

  return {
    rybbit,
    trackEvent,
    trackPageview,
  };
};
