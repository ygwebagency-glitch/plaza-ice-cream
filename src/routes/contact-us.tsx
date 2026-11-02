import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Copy, Facebook, Leaf, Mail, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { ConeIcon } from "@/components/Decor";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BookingPoster, FAQAccordion, PageHero } from "@/components/Sections";
import { steps } from "@/data/content";
import { meta, site } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: meta.contact.title },
      { name: "description", content: meta.contact.description },
      { property: "og:title", content: meta.contact.title },
      { property: "og:description", content: meta.contact.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const copy = (t: string) => navigator.clipboard?.writeText(t).then(() => toast("Copied"));

function ContactPage() {
  const cards = [
    { title: "Call", value: site.phone, href: site.phoneHref, I: Phone, tone: "bg-strawberry-pastel", aria: "Call The Plaza Ices", copy: site.phone },
    { title: "Email", value: site.email, href: site.emailHref, I: Mail, tone: "bg-sky", aria: "Email The Plaza Ices", copy: site.email },
    { title: "Facebook", value: "facebook.com/theplazaices", href: site.facebook, I: Facebook, tone: "bg-mint", aria: "The Plaza Ices on Facebook", copy: site.facebook, ext: true },
  ];
  return (
    <>
      <PageHero image="hero-3-hillside-vans" height="min-h-[55svh]" title={<>Let's bring the <em>ice cream</em> to you</>} crumb="Contact us">
        <p className="mt-2 font-hand text-3xl text-sun">(we come to you!)</p>
      </PageHero>

      <section className="relative z-10 -mt-4 bg-vanilla pb-16 pt-12">
        <Reveal className="container-site grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <article key={c.title} data-reveal className={cn("lift rounded-[28px] border-2 border-navy/10 p-7 shadow-[var(--shadow-card)]", c.tone, i === 1 && "md:-translate-y-4")}>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-paper"><c.I className="h-7 w-7" /></span>
              <p className="eyebrow mt-5">CONTACT</p>
              <h2 className="mt-1 text-3xl">{c.title}</h2>
              <a href={c.href} aria-label={c.aria} className="mt-2 block break-words text-lg font-bold link-draw" {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.value}</a>
              <button onClick={() => copy(c.copy)} className="btn btn-ghost mt-5 min-h-11 px-5"><Copy className="h-4 w-4" /> Copy</button>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="section-pad bg-vanilla-2">
        <div className="container-site grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal><SectionHeading eyebrow="CONTACT" title={<>Send us an <em className="text-strawberry">enquiry</em></>} /></Reveal>
            <div className="mt-8"><EnquiryForm /></div>
          </div>
          <aside className="card-soft h-fit p-8 lg:mt-24">
            <ConeIcon className="h-16 w-16" />
            <h3 className="mt-4 text-2xl">What happens next</h3>
            <ol className="mt-5 space-y-5">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-navy bg-sun font-display font-extrabold">{i + 1}</span>
                  <div><p className="font-bold">{s.title}</p><p className="text-sm text-navy-soft">{s.text}</p></div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-vanilla">
        <Reveal className="container-site">
          <SectionHeading title={<>Why book <em className="text-sea">with us</em></>} center />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[["5-star hygiene", Award, "bg-sun"], ["Eco vans", Leaf, "bg-mint"], ["Fully insured", ShieldCheck, "bg-sky"], ["DBS checked", BadgeCheck, "bg-strawberry-pastel"]].map(([t, I, c]) => {
              const Icon = I as typeof Award;
              return (
                <div key={t as string} data-reveal className={cn("lift flex flex-col items-center gap-3 rounded-[28px] p-7 text-center", c as string)}>
                  <Icon className="h-9 w-9" /><span className="font-display text-lg font-bold">{t as string}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section className="bg-mint section-pad">
        <Reveal className="container-site grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="FIND US" title={<>Princes Esplanade, <em className="text-sea">Gurnard</em></>} sub="We currently attend functions and weddings on the Isle of Wight only." />
            <a data-reveal href={site.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-6">Open in Maps</a>
          </div>
          <div data-reveal className="overflow-hidden rounded-[28px] border-4 border-paper shadow-[var(--shadow-card)]">
            <iframe title="Map of Princes Esplanade, Gurnard" src={site.mapEmbed} loading="lazy" className="h-80 w-full" />
          </div>
        </Reveal>
      </section>

      <FAQAccordion />
      <BookingPoster />
    </>
  );
}
