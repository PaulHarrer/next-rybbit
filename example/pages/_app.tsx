import type { AppProps } from "next/app";
import { RybbitProvider } from "next-rybbit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RybbitProvider
        analyticsHost="https://rybbit.yourdomain.com/api"
        siteId="YOUR_SITE_ID"
        enabled={process.env.NODE_ENV === "production"}
        trackLocalhost={process.env.NODE_ENV === "development"}
        trackOutboundLinks={true}
        skipPatterns={["/admin/*", "/api/*"]}
        maskPatterns={["/user/:id", "/order/:id"]}
        debug={process.env.NODE_ENV === "development"}
      />
      <Component {...pageProps} />
    </>
  );
}

// Example component using the hook
import { useRybbit } from "next-rybbit";

export function ExampleComponent() {
  const { trackEvent } = useRybbit();

  const handleSignup = () => {
    trackEvent("signup", {
      props: {
        method: "email",
        source: "homepage"
      }
    });
  };

  const handlePurchase = () => {
    trackEvent("purchase", {
      props: {
        plan: "premium",
        billing: "monthly",
        amount: 49.99
      }
    });
  };

  return (
    <div>
      <button onClick={handleSignup}>
        Sign Up
      </button>
      <button onClick={handlePurchase}>
        Buy Premium
      </button>
    </div>
  );
}
