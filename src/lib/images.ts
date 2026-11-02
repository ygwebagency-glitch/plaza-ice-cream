import manifest from "@/data/image-manifest.json";

export type ImageName = keyof typeof manifest;
export type ImageMeta = { width: number; height: number; widths: number[]; lqip: string; dominant: string };

export function getImage(name: ImageName): ImageMeta {
  return (manifest as Record<string, ImageMeta>)[name]!;
}
export function srcFor(name: ImageName, w: number) {
  return `/images/${name}-${w}.webp`;
}
export function srcSetFor(name: ImageName) {
  return getImage(name).widths.map((w) => `${srcFor(name, w)} ${w}w`).join(", ");
}
/** Smallest file that is at least `target` px wide (or the largest available). */
export function bestSrc(name: ImageName, target = 1200) {
  const ws = getImage(name).widths;
  return srcFor(name, ws.find((w) => w >= target) ?? ws[ws.length - 1]!);
}
