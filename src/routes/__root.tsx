import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieNotice, FloatingButtons, PageTransition, Preloader, ScrollProgress } from "@/components/Extras";
import { CTALink } from "@/components/CTAButton";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/data/site";

function NotFoundComponent() {
  return (
    <section className="section-pad bg-vanilla">
      <div className="container-site flex flex-col items-center text-center">
        <svg viewBox="0 0 120 150" className="h-44 w-36" aria-hidden>
          <path d="M30 40 C30 10 90 10 90 40 Z" fill="var(--strawberry-pastel)" stroke="var(--navy)" strokeWidth="3" />
          <g className="melt">
            <path d="M30 40 h60 v8 c0 8 -6 8 -6 0 c0 14 -8 14 -8 0 c0 6 -6 6 -6 0 c0 18 -9 18 -9 0 c0 6 -6 6 -6 0 c0 10 -7 10 -7 0 c0 6 -6 6 -6 0 c0 8 -6 8 -6 0z" fill="var(--strawberry-pastel)" stroke="var(--navy)" strokeWidth="3" strokeLinejoin="round" />
          </g>
          <path d="M34 60 L60 145 L86 60Z" fill="var(--sun)" stroke="var(--choc)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
        <h1 className="h1-size mt-6">Oops, this cone has <em className="text-strawberry">melted.</em></h1>
        <p className="mt-4 text-lg text-navy-soft">We could not find that page.</p>
        <div className="mt-8"><CTALink to="/">Back to Home</CTALink></div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Please try again, or call us on {site.phone}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-secondary">Try again</button>
          <a href="/" className="btn btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: site.name,
  slogan: site.slogan,
  telephone: "+447723324454",
  email: site.email,
  foundingDate: "2004",
  areaServed: "Isle of Wight",
  servesCuisine: "Ice cream",
  address: { "@type": "PostalAddress", streetAddress: "Princes Esplanade", addressLocality: "Gurnard", postalCode: "PO31 8LE", addressCountry: "GB" },
  sameAs: [site.facebook, site.instagram],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B2B4C" },
      { name: "author", content: site.name },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
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
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:font-bold">
        Skip to content
      </a>
      <ScrollProgress />
      <Preloader />
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingButtons />
      <CookieNotice />
      <PageTransition />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
