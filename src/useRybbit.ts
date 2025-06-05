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

    window.rybbit("custom_event", eventData);

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

  const identify = useCallback((userId: string, props?: Record<string, string | number | boolean>) => {
    if (typeof window === "undefined" || !window.rybbit) return;

    const userData: any = { id: userId };

    if (props) {
      userData.props = props;
    }

    window.rybbit("identify", userData);
  }, []);

  const clearUserId = useCallback(() => {
    if (typeof window === "undefined" || !window.rybbit) return;

    window.rybbit("clearUserId");
  }, []);

  const getUserId = useCallback(() => {
    if (typeof window === "undefined" || !window.rybbit) return null;
    return window.rybbit("getUserId");
  }, []);

  return {
    rybbit,
    trackEvent,
    trackPageview,
    identify,
    clearUserId,
    getUserId,
  };
};
