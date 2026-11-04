import { cp, mkdir, readdir, rename, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Build tooling only; never imported by the deployed application.
export async function exportStatic(root = process.cwd()) {
  const dist = resolve(root, "dist");
  const client = resolve(dist, "client");
  for (const page of ["", "contact-us", "gallery", "our-ice-cream-vans"]) {
    const html = resolve(client, page, "index.html");
    if (!(await stat(html)).isFile()) throw new Error(`Missing static page: ${html}`);
  }
  const staging = resolve(root, ".output/netlify-static-staging");
  const buildOnly = resolve(root, ".output/netlify-build");
  await rm(staging, { recursive: true, force: true });
  await cp(client, staging, { recursive: true });
  // Preserve build-time files outside the publish directory, never expose them.
  await rm(buildOnly, { recursive: true, force: true });
  await mkdir(buildOnly, { recursive: true });
  for (const entry of await readdir(dist)) {
    await rename(resolve(dist, entry), resolve(buildOnly, entry));
  }
  for (const entry of await readdir(staging)) {
    await rename(resolve(staging, entry), resolve(dist, entry));
  }
  await rm(staging, { recursive: true, force: true });
  console.log("Static Netlify site prepared in dist (including dist/index.html).");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await exportStatic();
}