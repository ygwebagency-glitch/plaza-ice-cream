import type Lenis from "lenis";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export async function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] = await Promise.all([
    import("lenis"),
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  lenis = new LenisCtor({ lerp: 0.09, smoothWheel: true, syncTouch: false, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.config({ ignoreMobileResize: true });
  return lenis;
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
