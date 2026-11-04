import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

// @ts-expect-error The standalone Node deployment script has no TS declaration.
import { exportStatic } from "../../scripts/export-static.mjs";

const temporaryRoots: string[] = [];
afterEach(async () => {
  await Promise.all(temporaryRoots.map((root) => rm(root, { recursive: true, force: true })));
  temporaryRoots.length = 0;
});

describe("Netlify static export", () => {
  it("exports all four pages and assets into dist without publishing server files", async () => {
    const root = await mkdtemp(join(tmpdir(), "plaza-static-"));
    temporaryRoots.push(root);
    for (const page of ["", "contact-us", "gallery", "our-ice-cream-vans"]) {
      const directory = join(root, "dist/client", page);
      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, "index.html"), `<html>${page || "home"}</html>`);
    }
    await mkdir(join(root, "dist/client/assets"));
    await writeFile(join(root, "dist/client/assets/app.js"), "public-app");
    await mkdir(join(root, "dist/server"));
    await writeFile(join(root, "dist/server/index.js"), "server-only");
    await exportStatic(root);
    expect(await readFile(join(root, "dist/index.html"), "utf8")).toBe("<html>home</html>");
    for (const page of ["contact-us", "gallery", "our-ice-cream-vans"]) {
      expect(await readFile(join(root, "dist", page, "index.html"), "utf8")).toBe(`<html>${page}</html>`);
    }
    expect(await readFile(join(root, "dist/assets/app.js"), "utf8")).toBe("public-app");
    expect(await readdir(join(root, "dist"))).not.toContain("server");
    expect(await readdir(join(root, "dist"))).not.toContain("client");
    expect(await readFile(join(root, ".output/netlify-build/server/index.js"), "utf8")).toBe("server-only");
  });

  it("rejects incomplete output instead of publishing missing pages", async () => {
    const root = await mkdtemp(join(tmpdir(), "plaza-static-"));
    temporaryRoots.push(root);
    await mkdir(join(root, "dist/client"), { recursive: true });
    await expect(exportStatic(root)).rejects.toThrow();
  });
});