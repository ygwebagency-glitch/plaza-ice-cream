import { useEffect, useRef, useState } from "react";
import { MapPin, IceCreamCone, Leaf } from "lucide-react";
import { Img } from "./Img";
import { CTALink } from "./CTAButton";
import { AwningDivider, Sprinkles, Stamp } from "./Decor";
import { cn } from "@/lib/utils";
import type { ImageName } from "@/lib/images";

const slides: ImageName[] = ["hero-1-two-vans", "hero-2-beach-van", "hero-3-hillside-vans"];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const btn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  // Magnetic hover on desktop pointers
  useEffect(() => {
    const el = btn.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 24;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 24;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <section
      className="relative flex min-h-[600px] items-end overflow-clip bg-navy md:items-center"
      style={{ height: "calc(100svh - 124px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0]!.clientX - touch.current;
        if (Math.abs(dx) > 50) setI((v) => (v + (dx < 0 ? 1 : slides.length - 1)) % slides.length);
        touch.current = null;
      }}
    >
      {slides.map((s, idx) => (
        <div key={s} className={cn("absolute inset-0 transition-opacity duration-1000", idx === i ? "opacity-100" : "opacity-0")} aria-hidden={idx !== i}>
          {(idx === 0 || idx === i || idx === (i + 1) % slides.length) && (
            <Img name={s} fill priority={idx === 0} sizes="100vw" className="bg-navy" imgClassName={idx === i ? "kenburns" : ""} />
          )}
        </div>
      ))}
      <div className="absolute inset-0 md:hidden" style={{ background: "var(--gradient-hero-mobile)" }} />
      <div className="absolute inset-0 hidden md:block" style={{ background: "var(--gradient-hero)" }} />
      <Sprinkles count={8} seed={2} className="opacity-80" />

      <div className="container-site relative pb-24 pt-16 text-paper md:pb-16">
        <p className="mb-5 inline-flex rounded-full border border-paper/40 bg-navy/40 px-4 py-1.5 text-xs font-bold tracking-[0.14em] animate-in fade-in duration-700">
          ISLE OF WIGHT - SINCE 2004
        </p>
        <h1 className="h1-size max-w-3xl">
          {["Book", "one", "of", "our"].map((w, k) => (
            <span key={w} className="mr-[0.25em] inline-block animate-in slide-in-from-bottom-8 fade-in fill-mode-both duration-700" style={{ animationDelay: `${k * 80}ms` }}>{w}</span>
          ))}
          <em className="inline-block text-sun animate-in slide-in-from-bottom-8 fade-in fill-mode-both duration-700" style={{ animationDelay: "380ms" }}>
            Plaza Ice Cream Vans
          </em>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-paper/95 animate-in fade-in fill-mode-both duration-700" style={{ animationDelay: "500ms" }}>
          Eco-friendly battery and solar powered ice cream vans for events, weddings, school fairs and parties across the Isle of Wight.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div ref={btn} className="transition-transform duration-200 animate-in zoom-in-50 fill-mode-both duration-500" style={{ animationDelay: "700ms" }}>
            <CTALink to="/contact-us" className="w-full sm:w-auto">Book a Van</CTALink>
          </div>
          <CTALink to="/our-ice-cream-vans" variant="ghost-light">See Our Vans</CTALink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2 text-sm">
          {[
            { t: "Daily at Princes Esplanade, Gurnard", I: MapPin },
            { t: "Kelly's of Cornwall whippy", I: IceCreamCone },
            { t: "Dairy-free options", I: Leaf },
          ].map(({ t, I }) => (
            <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-paper/15 px-3 py-1.5"><I className="h-4 w-4 text-sun" />{t}</li>
          ))}
        </ul>
      </div>

      <Stamp className="absolute bottom-14 right-6 hidden min-[480px]:block md:bottom-20 md:right-12" />

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-12">
        {slides.map((_, k) => (
          <button key={k} aria-label={`Go to slide ${k + 1}`} onClick={() => setI(k)} className="grid h-11 w-8 place-items-center">
            <span className={cn("block h-2.5 rounded-full transition-all", k === i ? "w-7 bg-sun" : "w-2.5 bg-paper/60")} />
          </button>
        ))}
      </div>
      <AwningDivider className="absolute inset-x-0 bottom-0" flip />
    </section>
  );
}
