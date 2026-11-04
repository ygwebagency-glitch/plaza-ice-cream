// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Build-time server only; Netlify publishes static documents, not this server.
  nitro: {
    preset: "node",
    output: { dir: "dist", publicDir: "dist/client", serverDir: "dist/server" },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: [
      { path: "/" },
      { path: "/our-ice-cream-vans" },
      { path: "/gallery" },
      { path: "/contact-us" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
