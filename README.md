# next-rybbit

Next.js integration for Rybbit Analytics - A simple, privacy-focused analytics solution.

## Installation

```bash
npm install next-rybbit
# or
yarn add next-rybbit
# or
pnpm add next-rybbit
```

## Usage

### App Router (Recommended)

Wrap your app in the `RybbitProvider` in your root layout:

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
        <RybbitProvider siteId="YOUR_SITE_ID">
          {children}
        </RybbitProvider>
      </body>
    </html>
  );
}
```

### Pages Router

Wrap your app in the `RybbitProvider` in `_app.tsx`:

```tsx
// pages/_app.tsx
import { RybbitProvider } from 'next-rybbit';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RybbitProvider siteId="YOUR_SITE_ID">
      <Component {...pageProps} />
    </RybbitProvider>
  );
}
```

## Configuration

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `siteId` | `string` | ✅ | - | Your Rybbit site ID |
| `analyticsHost` | `string` | ❌ | `https://app.rybbit.io/api` | Custom analytics host URL                                                                                                                                                                                                                                 |
| `autoTrackPageview` | `string` | ❌ | `true` | Set to `"false"` to disable automatic tracking of the initial pageview when the script loads. You will need to manually call `window.rybbit.pageview()` to track pageviews. |
| `trackSpa` | `string` | ❌ | `true` | 	Set to `"false"` to disable automatic pageview tracking for single page applications (React, Vue, etc). You will need to manually call `window.rybbit.pageview()` or `window.rybbit.track()` for all but the initial pageview. |
| `trackQuery` | `string` | ❌ | `true` | Set to `"false"` to disable tracking of URL query strings. This enhances privacy by preventing potentially sensitive information in query parameters from being stored in your analytics data. |
| `trackOutbound` | `string` | ❌ | `true` | Set to `"false"` to disable automatic tracking of outbound link clicks. |
| `trackErrors` | `string` | ❌ | `false` | Set to `"true"` to enable automatic tracking of JavaScript errors and unhandled promise rejections. Only tracks errors from the same origin to avoid noise from third-party scripts. |
| `sessionReplay` | `string` | ❌ | `false` | Set to `"true"` to enable session replay recording. Captures user interactions, mouse movements, and DOM changes for debugging and user experience analysis. |
| `webVitals` | `string` | ❌ | `false` | Set to `"true"` to enable Web Vitals performance metrics collection (LCP, CLS, INP, FCP, TTFB). Web Vitals are disabled by default to reduce script size and network requests. |
| `skipPatterns` | `string[]` | ❌ | `[]` | A JSON string array of URL path patterns to ignore. Pageviews matching these patterns won’t be tracked. Supports two types of wildcards: `*` (matches within a segment) and `**` (matches across segments). |
| `maskPatterns` | `string[]` | ❌ | `[]` | A JSON string array of URL path patterns to mask for privacy. Pageviews matching these patterns will be tracked, but the actual URL path will be replaced with the pattern itself in analytics data. Supports the same wildcards as `data-skip-patterns`. |
| `debounce` | `string` | ❌ | `500` | The delay (in milliseconds) before tracking a pageview after URL changes via the History API (`pushState`, `replaceState`). Set to `0` to disable debouncing. |
| `apiKey` | `string` | ❌ | - | API key for tracking from localhost during development. Bypasses origin validation. |
| `children` | `React.ReactNode` | ✅ | - | Your app content |

### Custom Analytics Host

If you're using a self-hosted Rybbit instance, you can specify a custom analytics host:

```tsx
<RybbitProvider 
  siteId="YOUR_SITE_ID" 
  analyticsHost="https://your-custom-host.com/api"
>
  {children}
</RybbitProvider>
```

## How it works

The `RybbitProvider` component automatically loads the Rybbit analytics script with the correct configuration. It uses Next.js's `Script` component with the `afterInteractive` strategy to ensure optimal performance.

The script is loaded from `{analyticsHost}/script.js` and configured with your site ID.

## Tracking API

You can use the `useRybbit` hook to access tracking functions in your components:

```tsx
import { useRybbit } from 'next-rybbit';

function MyComponent() {
  const { trackEvent, trackPageview, identify, clearUserId, getUserId } = useRybbit();
  
  // Use tracking functions here
}
```

### trackEvent

Tracks a custom event with a name and optional parameters.

```tsx
const { trackEvent } = useRybbit();

// Basic usage - just the event name
trackEvent('button_clicked');

// With custom properties
trackEvent('product_purchased', {
  props: {
    productId: 'prod-123',
    price: 49.99,
    currency: 'USD'
  }
});

// With callback function
trackEvent('form_submitted', {
  props: { formId: 'contact' },
  callback: () => {
    console.log('Event tracked successfully');
  }
});
```

### trackPageview

Tracks a page view with optional parameters.

```tsx
const { trackPageview } = useRybbit();

// Basic usage - tracks current page
trackPageview();

// With custom URL and properties
trackPageview({
  url: '/custom-path',
  referrer: 'https://example.com',
  deviceWidth: 1024,
  props: {
    section: 'blog',
    category: 'tech'
  }
});
```

### identify

Associates the current visitor with a user ID and optional properties.

```tsx
const { identify } = useRybbit();

// Basic usage - just set user ID
identify('user-123');

// With user properties
identify('user-123', {
  plan: 'premium',
  subscribed: true,
  loginCount: 42
});
```

### clearUserId

Clears the currently set user ID.

```tsx
const { clearUserId } = useRybbit();

// Use on logout
const handleLogout = () => {
  // Logout logic
  clearUserId();
};
```

### getUserId

Returns the currently set user ID.

```tsx
const { getUserId } = useRybbit();

// Check if user is identified
const currentUserId = getUserId();
if (currentUserId) {
  console.log('User is identified as:', currentUserId);
} else {
  console.log('User is anonymous');
}
```

## TypeScript Support

This package includes full TypeScript support with type definitions.

## License

MIT