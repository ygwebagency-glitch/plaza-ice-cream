import { createFileRoute } from "@tanstack/react-router";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { Img } from "@/components/Img";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { CTAAnchor, CTALink } from "@/components/CTAButton";
import { Stamp } from "@/components/Decor";
import { BookingPoster, FAQAccordion, FacebookButton, PageHero } from "@/components/Sections";
import { findUs, inside, safety, vans } from "@/data/content";
import { meta, site } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/our-ice-cream-vans")({
  head: () => ({
    meta: [
      { title: meta.vans.title },
      { name: "description", content: meta.vans.description },
      { property: "og:title", content: meta.vans.title },
      { property: "og:description", content: meta.vans.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VansPage,
});

const tone: Record<string, string> = { sky: "bg-sky", "strawberry-pastel": "bg-strawberry-pastel", mint: "bg-mint" };

function VansPage() {
  return (
    <>
      <PageHero image="hero-2-beach-van" title={<>Our <em>Ice Cream</em> Vans</>} crumb="Our Ice Cream Vans">
        <Stamp text="THE ISLE OF WIGHT'S FIRST ECO ICE CREAM VAN • " className="absolute bottom-12 right-6 hidden md:block" />
      </PageHero>

      <section className="section-pad bg-vanilla">
        <Reveal className="container-site mx-auto max-w-3xl text-center">
          <p data-reveal className="font-display text-2xl leading-snug md:text-3xl">
            Eco friendly battery and solar-serve ice cream vans with the latest modern technology, catering for events large and small across the Isle of Wight.
          </p>
          <ul data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {[["Battery / Solar", "bg-mint"], ["Kelly's whippy", "bg-sky"], ["Dairy-free options", "bg-strawberry-pastel"]].map(([t, c]) => (
              <li key={t} className={cn("rounded-full border-2 border-navy px-4 py-1.5 font-bold", c)}>{t}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="pb-24 bg-vanilla">
        <Reveal className="container-site grid gap-6 md:grid-cols-3">
          {vans.map((v) => (
            <article key={v.id} data-reveal className={cn("lift group overflow-hidden rounded-[28px] border-2 border-navy/10 p-3 shadow-[var(--shadow-card)] hover:-rotate-1", tone[v.tone])}>
              <Img name={v.image} sizes="(min-width:768px) 33vw, 92vw" ratio="4/5" className="rounded-[22px]" imgClassName="transition-transform duration-500 group-hover:scale-105" />
              <div className="p-4">
                <h3 className="text-2xl">{v.title}</h3>
                <p className="mt-2">{v.caption}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.chips.map((c) => <span key={c} className="rounded-full bg-paper px-3 py-1 text-sm font-bold">{c}</span>)}
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="section-pad bg-peach">
        <Reveal className="container-site grid items-center gap-10 md:grid-cols-2">
          <div data-reveal className="mx-auto w-full max-w-sm rotate-2 rounded-[28px] bg-paper p-3 shadow-[var(--shadow-card)]">
            <Img name="van-interior-portrait" sizes="320px" ratio="3/4" className="rounded-[20px]" />
          </div>
          <div>
            <SectionHeading eyebrow="INSIDE THE VAN" title={<>Clean, modern, <em className="text-strawberry">ready to serve</em></>} />
            <ul className="mt-6 space-y-3">
              {inside.map((t) => (
                <li key={t} data-reveal className="flex items-center gap-3 text-lg"><span className="grid h-8 w-8 place-items-center rounded-full bg-eco text-paper"><Check className="h-5 w-5" /></span>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="section-pad bg-sea text-paper">
        <Reveal className="container-site grid items-center gap-10 md:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading light eyebrow="SAFETY FIRST" title={<>Safe hands, <em className="text-sun">5-star hygiene</em></>} />
            <img data-reveal src="/images/food-hygiene-rating-5.jpg" alt="Food Hygiene Rating 5 - Very Good" width={200} height={100} loading="lazy" className="mt-8 h-24 w-auto rounded-2xl bg-paper p-2" />
          </div>
          <ul className="space-y-3">
            {safety.map((t) => (
              <li key={t} data-reveal className="flex items-center gap-4 rounded-[20px] bg-paper/10 p-4 text-lg"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sun text-navy"><Check className="h-5 w-5" /></span>{t}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section-pad bg-vanilla">
        <Reveal className="container-site">
          <SectionHeading eyebrow="FIND US" title={<>Where you can <em className="text-sea">find us</em></>} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {findUs.map((f) => (
              <article key={f.title} data-reveal className="lift rounded-[28px] bg-mint p-7">
                <MapPin className="h-7 w-7 text-strawberry" />
                <h3 className="mt-3 text-xl">{f.title}</h3>
                <p className="mt-2">{f.text}</p>
              </article>
            ))}
          </div>
          <div data-reveal className="mt-8"><FacebookButton /></div>
        </Reveal>
      </section>

      <section className="pb-24 bg-vanilla">
        <Reveal className="container-site">
          <div data-reveal className="rounded-[28px] border-4 border-sun bg-paper p-8 shadow-[var(--shadow-card)] md:p-12">
            <span className="rounded-full bg-sky px-3 py-1 text-sm font-bold">Isle of Wight only</span>
            <h2 className="h2-size mt-4">Hire us for your <em className="text-strawberry">event</em></h2>
            <p className="mt-4 max-w-2xl text-lg">For school and charity events: we pay you to come to your show or fete, helping you to raise funds for your school or charity.</p>
            <p className="mt-3 max-w-2xl text-navy-soft">We can bring a van to your workplace for a cooling ice cream on a hot day or a staff treat. Very reasonable rates for private parties and weddings - contact us with your requirements.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAAnchor href={site.phoneHref} ariaLabel="Call The Plaza Ices"><Phone className="h-5 w-5" /> Call now</CTAAnchor>
              <CTAAnchor href={site.emailHref} variant="secondary" ariaLabel="Email The Plaza Ices"><Mail className="h-5 w-5" /> Email us</CTAAnchor>
              <CTALink to="/contact-us" variant="ghost">Send enquiry</CTALink>
            </div>
          </div>
        </Reveal>
      </section>

      <FAQAccordion tone="bg-vanilla-2" />
      <BookingPoster />
    </>
  );
}
