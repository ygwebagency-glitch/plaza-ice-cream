import { useEffect, useRef, useState } from "react";
import { getImage, srcSetFor, srcFor, type ImageName } from "@/lib/images";
import { alts } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = {
  name: ImageName;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  fit?: "cover" | "contain";
  /** Force an aspect ratio box (e.g. "4/3"). Defaults to the photo's own ratio. */
  ratio?: string;
  fill?: boolean;
};

/** Every photo goes through here: ratio box, flat placeholder, fade-in after decode. */
export function Img({ name, alt, sizes, priority, className, imgClassName, fit = "cover", ratio, fill }: Props) {
  const meta = getImage(name);
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const small = meta.width < 700; // tiny originals get blur-fill so they never stretch

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (img.complete && img.naturalWidth) {
      img.decode().catch(() => {}).finally(() => setLoaded(true));
    }
  }, []);

  const onLoad = () => {
    const img = ref.current;
    if (!img) return setLoaded(true);
    img.decode().catch(() => {}).finally(() => setLoaded(true));
  };

  const useContain = fit === "contain" || (small && !!ratio);

  return (
    <div
      className={cn("relative overflow-hidden bg-vanilla", fill && "absolute inset-0", className)}
      style={fill ? undefined : { aspectRatio: ratio ?? `${meta.width}/${meta.height}` }}
    >
      {useContain && (
        <img
          src={meta.lqip}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
        />
      )}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-3xl" aria-label={alt ?? alts[name]}>
          🍦
        </div>
      ) : (
        <img
          ref={ref}
          src={srcFor(name, meta.widths[Math.min(1, meta.widths.length - 1)]!)}
          srcSet={srcSetFor(name)}
          sizes={sizes}
          width={meta.width}
          height={meta.height}
          alt={alt ?? alts[name]}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          onLoad={onLoad}
          onError={() => setFailed(true)}
          className={cn(
            "photo-tone absolute inset-0 h-full w-full transition-opacity duration-500",
            useContain ? "object-contain" : "object-cover",
            loaded || priority ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
