import { cp, mkdir, readdir, rename, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

// Build tooling only: Netlify receives public files, never a server bundle.
export async function prepareStatic(root = process.cwd()) {
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
  await rm(buildOnly, { recursive: true, force: true });
  await mkdir(buildOnly, { recursive: true });
  for (const entry of await readdir(dist)) {
    await rename(resolve(dist, entry), resolve(buildOnly, entry));
  }
  for (const entry of await readdir(staging)) {
    await rename(resolve(staging, entry), resolve(dist, entry));
  }
  await rm(staging, { recursive: true, force: true });
  console.log("Static Netlify site prepared in dist (four pages and public assets only).");
}

export function staticOutputPlugin() {
  let root;
  return {
    name: "plaza-static-output",
    apply: "build",
    enforce: "post",
    configResolved(config) { root = config.root; },
    buildApp: {
      order: "post",
      async handler() { await prepareStatic(root); },
    },
  };
}