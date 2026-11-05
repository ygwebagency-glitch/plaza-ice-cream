import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { prepareStatic, staticOutputPlugin } from "../../scripts/static-output.mjs";

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
    await prepareStatic(root);
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
    await expect(prepareStatic(root)).rejects.toThrow();
  });

  it("prepares static output after framework build hooks", () => {
    const plugin = staticOutputPlugin();
    expect(plugin.apply).toBe("build");
    expect(plugin.enforce).toBe("post");
    expect(plugin.buildApp).toMatchObject({ order: "post" });
  });

  it("uses the requested Netlify command, directory, Node major and fallback", async () => {
    const config = await readFile(join(process.cwd(), "netlify.toml"), "utf8");
    expect(config).toMatch(/command = "npm run build"/);
    expect(config).toMatch(/publish = "dist"/);
    expect(config).toMatch(/NODE_VERSION = "20"/);
    expect((await readFile(join(process.cwd(), "public/_redirects"), "utf8")).trim()).toBe("/*    /index.html    200");
  });
});