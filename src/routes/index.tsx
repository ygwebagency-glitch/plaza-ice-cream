import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Award, BadgeCheck, Coffee, CupSoda, Dessert, Dog, IceCreamBowl, IceCreamCone, Instagram,
  Landmark, Leaf, Popsicle, ShieldCheck, Sprout, Star, Sun, MapPin, Heart,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Img } from "@/components/Img";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { CTAAnchor, CTALink } from "@/components/CTAButton";
import { AwningDivider, ConeIcon, HandArrow } from "@/components/Decor";
import { BookingPoster, FacebookButton, StepsSection } from "@/components/Sections";
import { about, community, events, findUs, instagramTiles, menu, stackCards, trust } from "@/data/content";
import { meta, site } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.home.title },
      { name: "description", content: meta.home.description },
      { property: "og:title", content: meta.home.title },
      { property: "og:description", content: meta.home.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        imageSrcSet: "/images/hero-1-two-vans-480.webp 480w, /images/hero-1-two-vans-800.webp 800w, /images/hero-1-two-vans-1200.webp 1200w, /images/hero-1-two-vans-1600.webp 1600w, /images/hero-1-two-vans-1920.webp 1920w",
        imageSizes: "100vw",
        fetchPriority: "high",
      } as never,
    ],
  }),
  component: Home,
});

const trustIcons = { hygiene: Award, eco: Leaf, since: Star, shield: ShieldCheck, badge: BadgeCheck, council: Landmark };
const trustTones = ["bg-sun", "bg-mint", "bg-strawberry-pastel", "bg-sky", "bg-peach", "bg-vanilla-2"];
const menuIcons = { whippy: IceCreamCone, lolly: Popsicle, tub: IceCreamBowl, sundae: Dessert, dog: Dog, coffee: Coffee, tea: Leaf, drink: CupSoda, leaf: Sprout };
const menuTones = ["bg-sky", "bg-mint", "bg-peach", "bg-strawberry-pastel", "bg-vanilla-2", "bg-sky", "bg-mint", "bg-peach", "bg-strawberry-pastel"];
const toneBg: Record<string, string> = { sky: "bg-sky", "strawberry-pastel": "bg-strawberry-pastel", mint: "bg-mint", peach: "bg-peach", sun: "bg-sun" };

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setV(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

function CountUp({ from, to }: { from: number; to: number }) {
  const [ref, v] = useInView<HTMLSpanElement>(0.6);
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(from);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, from, to]);
  return <span ref={ref}>{n}</span>;
}

function TrustStrip() {
  return (
    <section className="relative z-10 -mt-6 bg-transparent">
      <div className="container-site">
        <ul className="card-soft no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto p-5 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
          {trust.map((t, i) => {
            const I = trustIcons[t.icon];
            return (
              <li key={t.label} className="flex min-w-[150px] snap-start flex-col items-center gap-2 text-center">
                {t.icon === "hygiene" ? (
                  <img src="/images/food-hygiene-rating-5.jpg" alt="Food Hygiene Rating 5 - Very Good" width={200} height={100} className="h-12 w-auto rounded-md" />
                ) : (
                  <span className={cn("grid h-12 w-12 place-items-center rounded-full", trustTones[i])}><I className="h-6 w-6 text-navy" /></span>
                )}
                <span className="text-sm font-bold leading-tight">{t.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function About() {
  const [ref, v] = useInView<HTMLDivElement>(0.35);
  return (
    <section className="section-pad bg-vanilla">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p data-reveal className="eyebrow mb-3">SINCE 2004</p>
          <h2 data-reveal className="h2-size">Welcome to The Plaza Ices. Ice cream vans for the <em className="text-sea">Isle of Wight</em>.</h2>
          <div className="mt-6 space-y-4 text-navy-soft">
            {about.map((p) => <p data-reveal key={p}>{p}</p>)}
          </div>
          <p data-reveal className="mt-6 font-hand text-3xl text-strawberry">{site.slogan}</p>
          <div data-reveal className="mt-6 flex flex-wrap items-center gap-6">
            <CTALink to="/contact-us">Book a Van</CTALink>
            <p className="font-display text-navy"><span className="text-4xl font-extrabold text-sea"><CountUp from={1990} to={2004} /></span> <span className="text-sm">established</span></p>
          </div>
        </Reveal>
        <div ref={ref} className="relative mx-auto w-full max-w-md pb-24 lg:max-w-none lg:pl-16">
          <div className="relative rotate-3 rounded-[28px] bg-paper p-3 shadow-[var(--shadow-card)]">
            <Img name="about-cone-portrait" sizes="(min-width:1024px) 40vw, 90vw" ratio="4/5" className="rounded-[20px]" />
            <span className="absolute -right-3 top-6 rotate-6 rounded-full border-2 border-navy bg-sun px-4 py-2 font-hand text-xl">Kelly's of Cornwall whippy</span>
          </div>
          {/* annotations */}
          <div className={cn("pointer-events-none absolute -left-2 top-10 hidden transition-opacity duration-700 md:block", v ? "opacity-100" : "opacity-0")}>
            <p className="font-hand text-2xl">with a Flake</p>
            <HandArrow drawn={v} className="h-12 w-24" />
          </div>
          <div className={cn("pointer-events-none absolute -bottom-2 right-0 hidden text-right transition-opacity delay-500 duration-700 md:block", v ? "opacity-100" : "opacity-0")}>
            <HandArrow drawn={v} d="M95 45 C 70 10, 40 10, 10 20" className="ml-auto h-12 w-24 -scale-x-100" />
            <p className="font-hand text-2xl">made for people of good taste</p>
          </div>
          <div className="absolute -bottom-2 left-0 w-1/2 -rotate-3 rounded-[24px] bg-paper p-2 shadow-[var(--shadow-card)] lg:left-4">
            <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-sun/80" />
            <Img name="about-staff-van-window" sizes="(min-width:1024px) 20vw, 45vw" ratio="4/3" className="rounded-[18px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StackCards() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.firstElementChild, {
            scale: 0.95, ease: "none", force3D: true,
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        });
      }, wrap);
    });
    return () => ctx?.revert();
  }, []);
  return (
    <section className="relative bg-vanilla" style={{ overflow: "clip" }}>
      <AwningDivider />
      <div className="container-site pt-20">
        <Reveal><SectionHeading eyebrow="WHY PLAZA ICES" title={<>Why people <em>choose us</em></>} /></Reveal>
      </div>
      <div ref={wrap} className="container-site pb-24 pt-10">
        {stackCards.map((c, i) => (
          <div key={c.title} data-stack className="sticky pb-8" style={{ top: `${96 + i * 18}px` }}>
            <article className={cn("grid origin-top items-center gap-6 overflow-hidden rounded-[28px] border-2 border-navy/10 p-6 shadow-[var(--shadow-card)] md:grid-cols-[1.1fr_1fr] md:p-10", toneBg[c.tone])}>
              <div>
                <span className="font-display text-7xl font-extrabold text-transparent md:text-8xl" style={{ WebkitTextStroke: "2px var(--navy)" }}>0{i + 1}</span>
                <h3 className="mt-2 text-3xl md:text-4xl">{c.title}</h3>
                <p className="mt-4 max-w-md text-navy">{c.text}</p>
                {"badge" in c && c.badge && (
                  <img src="/images/food-hygiene-rating-5.jpg" alt="Food Hygiene Rating 5 - Very Good" width={200} height={100} loading="lazy" className="mt-5 h-16 w-auto rounded-lg bg-paper p-1" />
                )}
              </div>
              <Img name={c.image} sizes="(min-width:768px) 40vw, 85vw" ratio="4/3" className="rounded-[22px]" />
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

function MenuSection() {
  const [ref, v] = useInView<HTMLUListElement>(0.15);
  return (
    <section className="section-pad cv-auto bg-strawberry-pastel">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.5fr]">
        <Reveal className="relative">
          <SectionHeading eyebrow="OUR MENU" title={<>Fresh from the <em className="text-strawberry">van</em></>} sub="Kelly's of Cornwall whippy and plenty more." />
          <div data-reveal className="relative mt-8 max-w-xs -rotate-2 rounded-[28px] bg-paper p-3 shadow-[var(--shadow-card)]">
            <Img name="menu-board-portrait" sizes="(min-width:1024px) 320px, 80vw" ratio="3/4" className="rounded-[20px]" />
          </div>
          <div data-reveal className="mt-4 flex items-center gap-2">
            <HandArrow className="h-10 w-20 rotate-12" />
            <p className="font-hand text-2xl">Dairy-free options too</p>
          </div>
        </Reveal>
        <ul ref={ref} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {menu.map((m, i) => {
            const I = menuIcons[m.icon as keyof typeof menuIcons];
            return (
              <li
                key={m.name}
                className={cn("wobble-hover card-soft lift relative flex aspect-square flex-col items-center justify-center gap-3 p-4 text-center transition-all duration-500", v ? "scale-100 opacity-100" : "scale-[0.6] opacity-0")}
                style={{ transitionDelay: `${i * 60}ms`, transitionTimingFunction: "cubic-bezier(.34,1.7,.64,1)" }}
              >
                {m.ribbon && <span className="absolute right-3 top-3 rounded-full bg-strawberry px-2 py-0.5 text-[11px] font-bold text-paper">{m.ribbon}</span>}
                <span className={cn("wobble-target grid h-16 w-16 place-items-center rounded-full md:h-20 md:w-20", menuTones[i])}>
                  <I className="h-8 w-8 text-navy md:h-10 md:w-10" strokeWidth={1.75} />
                </span>
                <span className="font-display text-base font-bold leading-tight md:text-lg">{m.name}</span>
                {m.note && <span className="hidden text-xs text-navy-soft sm:block">{m.note}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Marquee() {
  const row = (rev?: boolean, dur = "30s") => (
    <div className="marquee flex overflow-hidden">
      <div className={cn("marquee-track flex shrink-0 items-center gap-8 pr-8", rev && "marquee-reverse")} style={{ ["--dur" as string]: dur }}>
        {Array.from({ length: 8 }).map((_, k) => (
          <span key={k} className="flex items-center gap-8 whitespace-nowrap font-display text-2xl italic text-paper md:text-[28px]">
            {site.slogan}
            {k % 2 ? <Star className="h-6 w-6 fill-sun text-sun" /> : <ConeIcon className="h-8 w-8" />}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <section aria-label={site.slogan} className="space-y-3 overflow-hidden bg-sea py-8">
      {row(false, "30s")}
      {row(true, "38s")}
    </section>
  );
}

function Events() {
  return (
    <section className="section-pad cv-auto bg-sky">
      <Reveal className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="EVENTS" title={<>Your event, <em className="text-sea">our van</em></>} sub="Isle of Wight only. Large or small, we will make it sweeter." />
          <CTALink to="/contact-us" variant="secondary">Send enquiry</CTALink>
        </div>
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {events.map((e) => (
            <article key={e.title} data-reveal className="card-soft lift group w-[82%] shrink-0 snap-start overflow-hidden md:w-auto">
              <div className="relative overflow-hidden">
                <Img name={e.image} sizes="(min-width:1024px) 380px, (min-width:768px) 45vw, 82vw" ratio="4/3" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                <span className={cn("absolute left-4 top-4 rounded-full border-2 border-navy px-3 py-1 text-xs font-bold", toneBg[e.tone])}>{e.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl">{e.title}</h3>
                <p className="mt-2 text-navy-soft">{e.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FindUs() {
  return (
    <section className="section-pad cv-auto bg-mint">
      <Reveal className="container-site grid gap-6 lg:grid-cols-2">
        <article data-reveal className="card-soft p-7 md:p-9">
          <p className="eyebrow">FIND US</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Where's the <em className="text-sea">van</em> today?</h2>
          <ul className="mt-6 space-y-4">
            {findUs.map((f) => (
              <li key={f.title} className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-strawberry" />
                <div><p className="font-bold">{f.title}</p><p className="text-navy-soft">{f.text}</p></div>
              </li>
            ))}
          </ul>
          <div className="mt-6 overflow-hidden rounded-[20px] border-2 border-navy/10" data-lenis-prevent>
            <iframe title="Map of Princes Esplanade, Gurnard" src={site.mapEmbed} loading="lazy" className="h-60 w-full" />
          </div>
          <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-bold text-sea link-draw">Open in Maps</a>
        </article>
        <article data-reveal className="card-soft flex flex-col p-7 md:p-9">
          <p className="eyebrow">COMMUNITY</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Part of the <em className="text-strawberry">Island</em></h2>
          <ul className="mt-6 flex-1 space-y-5">
            {community.map((c, i) => (
              <li key={c.title} className="flex gap-4 rounded-[20px] bg-vanilla p-5">
                <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-full", i ? "bg-sky" : "bg-strawberry-pastel")}>
                  {i ? <Sun className="h-6 w-6" /> : <Heart className="h-6 w-6" />}
                </span>
                <div><p className="font-bold">{c.title}</p><p className="text-navy-soft">{c.text}</p></div>
              </li>
            ))}
          </ul>
          <div className="mt-6"><FacebookButton /></div>
        </article>
      </Reveal>
    </section>
  );
}

function InstagramTiles() {
  return (
    <section className="section-pad cv-auto bg-paper">
      <Reveal className="container-site text-center">
        <SectionHeading eyebrow="INSTAGRAM" title={<em className="text-sea">{site.instagramHandle}</em>} center />
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {instagramTiles.map((n, i) => (
            <li key={n} data-reveal className={cn("overflow-hidden rounded-[24px] bg-paper p-2 shadow-[var(--shadow-card)] transition-transform hover:rotate-0", i % 2 ? "rotate-2" : "-rotate-2")}>
              <Img name={n} sizes="(min-width:1024px) 380px, 50vw" ratio="1/1" className="rounded-[18px]" />
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-10">
          <CTAAnchor href={site.instagram} external variant="secondary" ariaLabel="The Plaza Ices on Instagram"><Instagram className="h-5 w-5" /> Follow on Instagram</CTAAnchor>
        </div>
      </Reveal>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <StackCards />
      <MenuSection />
      <Marquee />
      <Events />
      <FindUs />
      <StepsSection />
      <InstagramTiles />
      <BookingPoster />
    </>
  );
}


