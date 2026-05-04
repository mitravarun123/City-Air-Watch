import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "City Air Watch" },
      { name: "description", content: "City Air Watch provides real-time air quality monitoring and short-term PM2.5 pollution forecasting." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "City Air Watch" },
      { property: "og:description", content: "City Air Watch provides real-time air quality monitoring and short-term PM2.5 pollution forecasting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "City Air Watch" },
      { name: "twitter:description", content: "City Air Watch provides real-time air quality monitoring and short-term PM2.5 pollution forecasting." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/269eed16-2ae9-40b6-a047-b9a06a1fcb97/id-preview-3a1fb0e3--0f89fbb3-be68-4f08-8503-a08d3d4a6bcd.lovable.app-1777915992008.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/269eed16-2ae9-40b6-a047-b9a06a1fcb97/id-preview-3a1fb0e3--0f89fbb3-be68-4f08-8503-a08d3d4a6bcd.lovable.app-1777915992008.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
