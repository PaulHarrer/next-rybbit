# next-rybbit

Simple integration for [Rybbit Analytics](https://rybbit.io) in Next.js applications.

## Installation

```bash
npm install next-rybbit
# or
yarn add next-rybbit
# or
pnpm add next-rybbit
```

## Usage

### Basic Setup

Add the `RybbitProvider` component to your `_app.tsx` or `layout.tsx`:

```tsx
import { RybbitProvider } from 'next-rybbit';

export default function App({ Component, pageProps }) {
  return (
    <>
      <RybbitProvider siteId="YOUR_SITE_ID" />
      <Component {...pageProps} />
    </>
  );
}
```

### With App Router (Next.js 13+)

```tsx
// app/layout.tsx
import { RybbitProvider } from 'next-rybbit';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RybbitProvider siteId="YOUR_SITE_ID" />
        {children}
      </body>
    </html>
  );
}
```

### Configuration Options

```tsx
<RybbitProvider
  siteId="YOUR_SITE_ID"
  enabled={true} // Set to false to disable tracking
  trackLocalhost={false} // Set to true to track localhost
  manualPageViews={false} // Set to true for manual pageview tracking
  taggedEvents={true} // Enable tagged events
  revenue={true} // Enable revenue tracking
  outboundLinks={true} // Track outbound link clicks
  customDomain="analytics.yourdomain.com" // Use custom domain for self-hosted
  integrity="sha384-..." // Add integrity hash for security
/>
```

### Self-Hosted Setup

For self-hosted Rybbit instances, use the `customDomain` prop:

```tsx
<RybbitProvider
  siteId="YOUR_SITE_ID"
  customDomain="your-rybbit-domain.com"
/>
```

This will load the script from `https://your-rybbit-domain.com/api/script.js` instead of the default cloud URL.

### Using the Hook

Use the `useRybbit` hook to track custom events and pageviews:

```tsx
import { useRybbit } from 'next-rybbit';

function MyComponent() {
  const { trackEvent, trackPageview } = useRybbit();

  const handleClick = () => {
    trackEvent('button-click', {
      props: {
        section: 'header',
        buttonText: 'Sign Up'
      }
    });
  };

  const handlePurchase = () => {
    trackEvent('purchase', {
      revenue: {
        currency: 'USD',
        amount: 99.99
      },
      props: {
        product: 'Pro Plan'
      }
    });
  };

  return (
    <div>
      <button onClick={handleClick}>
        Sign Up
      </button>
      <button onClick={handlePurchase}>
        Buy Pro
      </button>
    </div>
  );
}
```

### Manual Pageview Tracking

If you need to manually track pageviews (useful for SPAs with custom routing):

```tsx
import { useRybbit } from 'next-rybbit';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp() {
  const { trackPageview } = useRybbit();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageview({ url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, trackPageview]);

  return <YourApp />;
}
```

### Environment-Based Tracking

You can conditionally enable tracking based on environment:

```tsx
<RybbitProvider
  siteId="YOUR_SITE_ID"
  enabled={process.env.NODE_ENV === 'production'}
  trackLocalhost={process.env.NODE_ENV === 'development'}
/>
```

## API Reference

### RybbitProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `siteId` | `string` | **required** | Your site ID from Rybbit dashboard |
| `enabled` | `boolean` | `true` | Enable/disable tracking |
| `trackLocalhost` | `boolean` | `false` | Track events on localhost |
| `manualPageViews` | `boolean` | `false` | Disable automatic pageview tracking |
| `taggedEvents` | `boolean` | `false` | Enable tagged events |
| `revenue` | `boolean` | `false` | Enable revenue tracking |
| `outboundLinks` | `boolean` | `false` | Track outbound link clicks |
| `customDomain` | `string` | `undefined` | Custom domain for self-hosted Rybbit |
| `integrity` | `string` | `undefined` | Integrity hash for script |

### useRybbit Hook

Returns an object with the following methods:

#### `trackEvent(eventName, options?)`

Track a custom event.

**Parameters:**
- `eventName` (string): Name of the event
- `options` (object, optional):
  - `props` (object): Custom properties
  - `revenue` (object): Revenue data with `currency` and `amount`
  - `callback` (function): Callback function after tracking

#### `trackPageview(options?)`

Manually track a pageview.

**Parameters:**
- `options` (object, optional):
  - `url` (string): Page URL
  - `referrer` (string): Referrer URL
  - `deviceWidth` (number): Device width
  - `props` (object): Custom properties

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.