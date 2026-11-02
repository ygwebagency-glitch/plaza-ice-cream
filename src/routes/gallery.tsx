import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import { Img } from "@/components/Img";
import { CTAAnchor } from "@/components/CTAButton";
import { Sprinkles } from "@/components/Decor";
import { BookingPoster } from "@/components/Sections";
import { alts, gallery, type GalleryItem } from "@/data/content";
import { meta, site } from "@/data/site";
import { bestSrc } from "@/lib/images";
import { startScroll, stopScroll } from "@/lib/smoothScroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: meta.gallery.title },
      { name: "description", content: meta.gallery.description },
      { property: "og:title", content: meta.gallery.title },
      { property: "og:description", content: meta.gallery.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

const filters = [
  { id: "all", label: "All", tone: "bg-navy text-paper" },
  { id: "vans", label: "Vans", tone: "bg-sky" },
  { id: "icecream", label: "Ice cream", tone: "bg-strawberry-pastel" },
  { id: "team", label: "Team", tone: "bg-mint" },
  { id: "events", label: "Events", tone: "bg-sun" },
] as const;
const frames = ["bg-sky", "bg-strawberry-pastel", "bg-mint", "bg-peach"];

function GalleryPage() {
  const [f, setF] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const items = f === "all" ? gallery : gallery.filter((g) => g.category === f);

  return (
    <>
      <section className="relative overflow-clip bg-sky pb-14 pt-16">
        <Sprinkles count={10} seed={7} />
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm"><Link to="/" className="link-draw">Home</Link> / <span aria-current="page">Gallery</span></nav>
          <h1 className="h1-size">Our <em className="text-sea">Gallery</em></h1>
          <p className="mt-3 max-w-xl text-lg">Vans, whippies and happy event days around the Isle of Wight.</p>
        </div>
      </section>
      <div className="sticky top-16 z-30 border-b border-border bg-vanilla/95">
        <div className="container-site no-scrollbar flex gap-2 overflow-x-auto py-3">
          {filters.map((x) => (
            <button key={x.id} onClick={() => setF(x.id)} aria-pressed={f === x.id}
              className={cn("min-h-11 shrink-0 rounded-full border-2 border-navy px-5 font-bold transition", f === x.id ? x.tone : "bg-paper")}>
              {x.label}
            </button>
          ))}
        </div>
      </div>
      <section className="section-pad bg-vanilla">
        <div className="container-site columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <button key={g.name} onClick={() => setOpen(i)} className={cn("group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[28px] p-2.5 text-left shadow-[var(--shadow-card)] transition-transform duration-300 hover:rotate-1", frames[i % 4])}>
              <Img name={g.name} sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 92vw" className="rounded-[20px]" imgClassName="transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-2.5 bottom-2.5 translate-y-full rounded-b-[20px] bg-navy/90 px-4 py-3 font-hand text-xl text-paper transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">{g.caption}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <CTAAnchor href={site.instagram} external variant="secondary" ariaLabel="The Plaza Ices on Instagram"><Instagram className="h-5 w-5" /> Follow on Instagram</CTAAnchor>
        </div>
      </section>
      {open !== null && <Lightbox items={items} index={open} setIndex={setOpen} />}
      <BookingPoster />
    </>
  );
}

function Lightbox({ items, index, setIndex }: { items: GalleryItem[]; index: number; setIndex: (i: number | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const go = useCallback((d: number) => setIndex((index + d + items.length) % items.length), [index, items.length, setIndex]);
  useEffect(() => {
    stopScroll();
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => { startScroll(); document.body.style.overflow = ""; };
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    const next = new Image();
    next.src = bestSrc(items[(index + 1) % items.length]!.name, 1600);
    return () => window.removeEventListener("keydown", k);
  }, [go, index, items, setIndex]);
  const it = items[index]!;
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Photo viewer" data-lenis-prevent
      className="fixed inset-0 z-[75] flex flex-col bg-navy/95 text-paper animate-in fade-in duration-200"
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}>
      <div className="flex items-center justify-between p-4">
        <span className="font-bold">{index + 1} / {items.length}</span>
        <button aria-label="Close gallery" onClick={() => setIndex(null)} className="grid h-11 w-11 place-items-center rounded-full border-2 border-paper"><X className="h-5 w-5" /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-20">
        <img key={it.name} src={bestSrc(it.name, 1600)} alt={alts[it.name]} className="max-h-[78svh] max-w-full rounded-2xl object-contain animate-in fade-in zoom-in-95 duration-300" />
        <button aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-2 grid h-12 w-12 place-items-center rounded-full bg-paper/15 md:left-6"><ChevronLeft /></button>
        <button aria-label="Next photo" onClick={() => go(1)} className="absolute right-2 grid h-12 w-12 place-items-center rounded-full bg-paper/15 md:right-6"><ChevronRight /></button>
      </div>
      <p className="pb-6 text-center font-hand text-2xl">{it.caption}</p>
    </div>
  );
}
