import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Facebook } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { faqs, steps } from "@/data/content";
import { site } from "@/data/site";
import { bestSrc, type ImageName } from "@/lib/images";
import { cn } from "@/lib/utils";
import { CTALink, CTAAnchor } from "./CTAButton";
import { AwningDivider, Sprinkles, Stamp } from "./Decor";
import { Img } from "./Img";
import { Reveal, SectionHeading } from "./Reveal";

export function BookingPoster() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="relative overflow-clip bg-vanilla">
      <AwningDivider />
      <div className={cn("absolute inset-x-0 bottom-0 top-6 origin-left bg-sea transition-transform duration-1000 ease-out md:top-9", inView ? "scale-x-100" : "scale-x-0")} />
      <img src={bestSrc("hero-1-two-vans", 1200)} alt="" aria-hidden loading="lazy" className="absolute inset-x-0 bottom-0 top-6 h-[calc(100%-1.5rem)] w-full object-cover opacity-[0.12]" />
      <Sprinkles count={12} seed={4} />
      <div className="container-site relative section-pad text-center text-paper">
        <Reveal>
          <p data-reveal className="font-hand text-3xl text-sun">Zero emission - Solar serve</p>
          <h2 data-reveal className="mt-2 font-display font-extrabold" style={{ fontSize: "clamp(3rem, 10vw, 7.5rem)", lineHeight: 0.95 }}>
            Now booking <em className="text-sun">2027</em>
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-paper/95">
            Zero emission and solar serve ice cream vans for your event, show, fete or wedding on the Isle of Wight.
          </p>
          <div data-reveal className="mt-9">
            <CTALink to="/contact-us" className="pulse-soft">Book a Van</CTALink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FAQAccordion({ eyebrow = "GOOD TO KNOW", tone = "bg-vanilla" }: { eyebrow?: string; tone?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={cn("section-pad cv-auto", tone)}>
      <Reveal className="container-site grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow={eyebrow} title={<>Questions, <em>answered</em></>} sub={<>Anything else? Call us on <a className="font-bold text-strawberry link-draw" href={site.phoneHref}>{site.phone}</a>.</>} />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} data-reveal className="card-soft overflow-hidden">
              <button
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-lg font-bold md:p-6"
              >
                {f.q}
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", open === i && "rotate-180")} />
              </button>
              <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-6 text-navy-soft md:px-6">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function StepsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setDrawn(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="section-pad cv-auto bg-vanilla">
      <Reveal className="container-site">
        <SectionHeading eyebrow="HOW IT WORKS" title={<>Booking is <em>easy</em></>} center />
        <div ref={ref} className="relative mt-14 grid gap-6 md:grid-cols-3">
          <svg aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden h-2 w-[68%] md:block" viewBox="0 0 100 2" preserveAspectRatio="none">
            <line x1="0" y1="1" x2="100" y2="1" stroke="var(--sea)" strokeWidth="2" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" style={{ clipPath: drawn ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", transition: "clip-path 1.4s ease-out" }} />
          </svg>
          {steps.map((s, i) => (
            <div key={s.title} data-reveal className="card-soft lift relative p-7 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-navy bg-sun font-display text-2xl font-extrabold">{i + 1}</span>
              <h3 className="mt-5 text-xl">{s.title}</h3>
              <p className="mt-2 text-navy-soft">{s.text}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mx-auto mt-10 w-fit rounded-full bg-strawberry-pastel px-5 py-2 font-hand text-2xl">Summer dates go fast - enquire early</p>
      </Reveal>
    </section>
  );
}

export function PageHero({ image, title, crumb, children, height = "min-h-[60svh]" }: { image: ImageName; title: ReactNode; crumb: string; children?: ReactNode; height?: string }) {
  return (
    <section className={cn("relative flex items-end overflow-clip bg-navy", height)}>
      <Img name={image} fill priority sizes="100vw" className="bg-navy" imgClassName="kenburns" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero-mobile)" }} />
      <div className="container-site relative pb-16 pt-28 text-paper md:pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
          <Link to="/" className="link-draw">Home</Link> <span aria-hidden>/</span> <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="h1-size max-w-3xl animate-in slide-in-from-bottom-6 fade-in duration-700 [&_em]:text-sun">{title}</h1>
        {children}
      </div>
      <AwningDivider className="absolute inset-x-0 bottom-0" flip />
    </section>
  );
}

export function FacebookButton() {
  return (
    <CTAAnchor href={site.facebook} external variant="secondary" ariaLabel="The Plaza Ices on Facebook">
      <Facebook className="h-5 w-5" /> Follow our news on Facebook
    </CTAAnchor>
  );
}

export { Stamp };
