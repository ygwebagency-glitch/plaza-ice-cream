import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/data/site";
import { AwningDivider, ConeIcon } from "./Decor";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-paper">
      <AwningDivider />
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex items-center gap-2">
            <ConeIcon className="h-9 w-9" />
            <img src="/images/logo.png" alt="The Plaza Ices" width={500} height={63} loading="lazy" className="h-6 w-auto" />
          </div>
          <p className="mt-3 font-hand text-2xl text-sun">{site.slogan}</p>
          <p className="mt-1 text-paper/85">{site.tagline} - Established {site.established}</p>
          <div className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-paper p-2 pr-4 text-navy">
            <img src="/images/food-hygiene-rating-5.jpg" alt="Food Hygiene Rating 5 - Very Good" width={200} height={100} loading="lazy" className="h-12 w-auto rounded-lg" />
            <span className="text-sm font-bold leading-tight">5 stars on all<br />inspections</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl text-sun">Explore</h3>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="link-draw">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl text-sun">Contact</h3>
          <ul className="mt-4 space-y-3">
            <li><a href={site.phoneHref} aria-label="Call The Plaza Ices" className="link-draw inline-flex items-center gap-2"><Phone className="h-4 w-4" />{site.phone}</a></li>
            <li><a href={site.emailHref} aria-label="Email The Plaza Ices" className="link-draw inline-flex items-center gap-2 break-all"><Mail className="h-4 w-4 shrink-0" />{site.email}</a></li>
            <li className="inline-flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0" />{site.address}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl text-sun">Follow</h3>
          <div className="mt-4 flex gap-3">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="The Plaza Ices on Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-sea transition-colors hover:bg-sea-bright"><Facebook className="h-5 w-5" /></a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="The Plaza Ices on Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-sea transition-colors hover:bg-sea-bright"><Instagram className="h-5 w-5" /></a>
          </div>
          <p className="mt-5 inline-block rounded-full border border-paper/30 px-4 py-1.5 text-sm">Serving the Isle of Wight only</p>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-paper/80 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href={site.credit.href} target="_blank" rel="noopener noreferrer" className="link-draw">{site.credit.label}</a>
        </div>
      </div>
    </footer>
  );
}
