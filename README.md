# Plaza Ice Cream Cruisers

Read deep and start build

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1419838f-5b2d-4a86-951d-109622082756).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Static Netlify deployment

The site retains TanStack Start routing and its existing design. The four public pages are prerendered during `vite build`; no application server runs on Netlify.

Use the checked-in `netlify.toml` settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Base directory:** repository root
- **Node.js:** Netlify Node 20 (20.19+); alternatively Node 22.12+

Both `npm run build` and `bun run build` run `vite build`. Outside Lovable, a final build hook verifies all four public pages, copies client output into `dist`, and moves build-only files into the ignored `.output/netlify-build` directory. The public entries are `dist/index.html`, `dist/assets`, and the three page directories. Lovable-managed builds retain their required `dist/client` and `dist/server` layout.

The incorrect listening `node-server` preset has been replaced with an explicit fetch-compatible build target so prerendering can invoke the server correctly without starting that Node server. The site remains TanStack Start: Lovable requires its bootstrap, so a Router-only migration, removal of all build-time server dependencies, and complete removal of prerendering were not performed. Netlify serves only static public files, with no application server. Old URL route files still redirect to the current pages; unknown URLs use the Netlify fallback and the site's existing not-found view. Existing static files and page directories are served directly.

Do not set `NITRO_PRESET` or `SERVER_PRESET` to `node`/`node-server`. No custom Netlify adapter is needed. A sub-minute Netlify build cannot be guaranteed without measuring that service's build; dependency installation and the build are separate timings.

### Environment variables
No environment variables are required for the current email-app enquiry flow. `VITE_FORM_ENDPOINT` is optional: configure it only with a real external service accepting the form's JSON submissions. Browser configuration is public; never put private keys into `VITE_*` variables.

GitHub connection and synchronization are managed by Lovable; local deployment checks cannot confirm that the remote repository is connected or up to date.
