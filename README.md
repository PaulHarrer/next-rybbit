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
| `analyticsHost` | `string` | ❌ | `https://app.rybbit.io/api` | Custom analytics host URL |
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
