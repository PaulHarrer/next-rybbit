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
      <RybbitProvider 
        siteId="YOUR_SITE_ID"
        analyticsHost="https://rybbit.yourdomain.com/api" // Optional: only required if selfhosted
      />
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
        <RybbitProvider
          siteId="YOUR_SITE_ID"
          analyticsHost="https://rybbit.yourdomain.com/api" // Optional: only required if selfhosted
        />
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
  analyticsHost="https://rybbit.yourdomain.com/api" // Optional: only required if selfhosted
  enabled={true} // Set to false to disable tracking
  trackLocalhost={false} // Set to true to track localhost
  debounce={500} // Debounce time for SPA pageviews (ms)
  autoTrackPageviews={true} // Automatically track pageviews
  autoTrackSpaRoutes={true} // Track SPA route changes
  trackQuerystring={true} // Include query string in tracking
  trackOutboundLinks={true} // Track outbound link clicks
  skipPatterns={['/admin/*', '/internal/*']} // Skip tracking for these paths
  maskPatterns={['/user/:id', '/order/:id']} // Mask sensitive paths
  debug={false} // Enable debug logging
  integrity="sha384-..." // Add integrity hash for security
/>
```

### Path Matching

**Skip Patterns**: Pageviews matching these patterns won't be tracked at all.
**Mask Patterns**: For matching paths, the original path is replaced by the pattern in tracked data.

```tsx
<RybbitProvider
  siteId="YOUR_SITE_ID"
  analyticsHost="https://rybbit.yourdomain.com/api" // Optional: only required if selfhosted
  skipPatterns={[
    '/admin/*',     // Skip all admin pages
    '/api/*',       // Skip API routes
    '/internal/*'   // Skip internal pages
  ]}
  maskPatterns={[
    '/user/:id',    // /user/123 becomes /user/:id
    '/order/:id',   // /order/abc becomes /order/:id
    '/profile/*'    // /profile/settings becomes /profile/*
  ]}
/>
```

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

### User Identification

You can identify users and associate events with their identity:

```tsx
import { useRybbit } from 'next-rybbit';

function ProfileComponent() {
  const { identify, clearUserId, getUserId } = useRybbit();
  
  // Identify a user with optional properties
  const handleLogin = (userData) => {
    identify(userData.id, {
      name: userData.name,
      email: userData.email,
      plan: userData.plan
    });
  };
  
  // Clear user identification on logout
  const handleLogout = () => {
    clearUserId();
  };
  
  // Get the current user ID
  const checkCurrentUser = () => {
    const currentUserId = getUserId();
    console.log("Current user:", currentUserId);
  };
  
  return (
    <div>
      <button onClick={() => handleLogin({id: '123', name: 'John', email: 'john@example.com', plan: 'pro'})}>
        Login as John
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>
      <button onClick={checkCurrentUser}>
        Check Current User
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
  analyticsHost="https://rybbit.yourdomain.com/api" // Optional: only required if selfhosted
  enabled={process.env.NODE_ENV === 'production'}
  trackLocalhost={process.env.NODE_ENV === 'development'}
  debug={process.env.NODE_ENV === 'development'}
/>
```

## API Reference

### RybbitProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `analyticsHost` | `string` | `"https://api.rybbit.io/api"` | URL of your Rybbit analytics instance (e.g., `https://rybbit.yourdomain.com/api`) |
| `siteId` | `string \| number` | **required** | The Site ID for your website obtained from your Rybbit instance |
| `enabled` | `boolean` | `true` | Enable/disable tracking |
| `trackLocalhost` | `boolean` | `false` | Track events on localhost |
| `debounce` | `number` | `500` | Debounce time in milliseconds for tracking SPA pageviews after route changes |
| `autoTrackPageviews` | `boolean` | `true` | If `true`, automatically tracks pageviews on initial load |
| `autoTrackSpaRoutes` | `boolean` | `true` | If `true`, automatically tracks pageviews when browser history changes |
| `trackQuerystring` | `boolean` | `true` | If `true`, includes the URL's query string in the tracked data |
| `trackOutboundLinks` | `boolean` | `true` | If `true`, automatically tracks clicks on anchor tags that link to external domains |
| `skipPatterns` | `string[]` | `[]` | Array of path patterns. Pageviews whose path matches any pattern will not be tracked |
| `maskPatterns` | `string[]` | `[]` | Array of path patterns. For matching pageview paths, the original path will be replaced by the pattern |
| `debug` | `boolean` | `false` | If `true`, enables detailed logging to the browser console |
| `integrity` | `string` | `undefined` | Integrity hash for script |

### useRybbit Hook

Returns an object with the following methods:

#### `trackEvent(eventName, options?)`

Track a custom event.

**Parameters:**
- `eventName` (string): Name of the event
- `options` (object, optional):
  - `props` (object): Custom properties
  - `callback` (function): Callback function after tracking

#### `trackPageview(options?)`

Manually track a pageview.

**Parameters:**
- `options` (object, optional):
  - `url` (string): Page URL
  - `referrer` (string): Referrer URL
  - `deviceWidth` (number): Device width
  - `props` (object): Custom properties

#### `identify(userId, props?)`

Identify a user for subsequent events.

**Parameters:**
- `userId` (string): Unique identifier for the user
- `props` (object, optional): Additional user properties

#### `clearUserId()`

Clear the current user identification.

#### `getUserId()`

Get the current user ID if any user is identified.

**Returns:**
- `string | null`: The current user ID or null if no user is identified

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

