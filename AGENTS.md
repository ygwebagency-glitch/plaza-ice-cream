<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All site copy lives in `src/data/site.ts` and `src/data/content.ts`; components read from there so wording changes stay in one place.
- Every photo renders through `src/components/Img.tsx` using `src/data/image-manifest.json` (pre-sized WebP files in `public/images/`), so only the first hero image loads eagerly and nothing is shown larger than its original.
- Colours come only from the tokens in `src/styles.css`; button styles (`.btn-*`) live in `@layer components` so Tailwind utilities like `hidden` can override them.
- Old website URLs (`/classic-ice-cream-vans`, `/our-gallery`) redirect to the new pages to keep links working.
- Retain the TanStack Start/Lovable bootstrap and prerender all four public pages; Netlify runs a static export after building so dist contains only public files and build-time artifacts stay in the ignored .output directory.
