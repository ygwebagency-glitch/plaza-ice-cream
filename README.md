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
- **Build command:** `npm run build && node scripts/export-static.mjs`
- **Publish directory:** `dist`
- **Base directory:** repository root
- **Node.js:** 22.12 or newer

Both `npm run build` and `bun run build` run `vite build`. The export then verifies every public page, copies the complete client output into `dist`, and moves build-only files into the ignored `.output/netlify-build` directory. The public entry is `dist/index.html`. Rebuild before repeating the export. The build command alone retains the framework's `dist/client` layout; the Netlify command performs the final static export.

Permanent redirects preserve both old URLs before the unknown-page fallback. Existing static files and page directories are served directly.

### Environment variables
No environment variables are required for the current email-app enquiry flow. `VITE_FORM_ENDPOINT` is optional: configure it only with a real external service accepting the form's JSON submissions. Browser configuration is public; never put private keys into `VITE_*` variables.

GitHub connection and synchronization are managed by Lovable; local deployment checks cannot confirm that the remote repository is connected or up to date.
