import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Mail, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { CTAAnchor, CTALink } from "./CTAButton";
import { AwningDivider, ConeIcon } from "./Decor";
import { startScroll, stopScroll } from "@/lib/smoothScroll";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="The Plaza Ices home" className={cn("wobble-hover inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5", className)}>
      <ConeIcon className="wobble-target h-7 w-7 shrink-0" />
      <img src="/images/logo.png" alt="The Plaza Ices" width={500} height={63} className="h-[18px] w-auto sm:h-6" />
    </Link>
  );
}

function AnnouncementBar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      setOpen(localStorage.getItem("pi-announce") !== "closed");
    } catch {
      setOpen(true);
    }
  }, []);
  if (!open) return null;
  return (
    <div className="relative bg-navy text-sun">
      <div className="container-site flex min-h-10 items-center justify-center gap-3 py-2 pr-10 text-center text-sm font-medium">
        <ConeIcon className="hidden h-5 w-5 shrink-0 sm:block" />
        <Link to="/contact-us" className="link-draw break-words">
          {site.announcement}
        </Link>
        <a href={site.phoneHref} aria-label="Call The Plaza Ices" className="ml-2 hidden items-center gap-1 text-paper md:inline-flex">
          <Phone className="h-4 w-4" /> {site.phone}
        </a>
      </div>
      <button
        aria-label="Close announcement"
        onClick={() => {
          setOpen(false);
          try {
            localStorage.setItem("pi-announce", "closed");
          } catch {
            /* ignore */
          }
        }}
        className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-paper hover:bg-paper/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[height,background-color] duration-300",
          scrolled ? "border-border bg-vanilla/95" : "border-transparent bg-vanilla/90",
        )}
      >
        <div className={cn("container-site flex items-center justify-between gap-4 transition-[height] duration-300", scrolled ? "h-16" : "h-[84px]")}>
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="group relative py-2 font-medium text-navy"
                activeOptions={{ exact: true }}
                activeProps={{ "aria-current": "page" } as never}
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    {n.label}
                    <span className={cn("absolute bottom-0 left-0 h-[3px] rounded-full bg-strawberry transition-all duration-300", isActive ? "w-full" : "w-0 group-hover:w-full")} />
                  </>
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <CTALink to="/contact-us" className="hidden min-h-11 px-5 sm:inline-flex">
              Book a Van
            </CTALink>
            <button
              aria-label="Open menu"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-navy text-navy lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      {menu && <MobileMenu onClose={() => setMenu(false)} />}
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    stopScroll();
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      startScroll();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-sea text-paper animate-in fade-in duration-200">
      <AwningDivider />
      <div className="container-site flex items-center justify-between py-4">
        <span className="font-hand text-2xl">{site.tagline}</span>
        <button aria-label="Close menu" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border-2 border-paper">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav aria-label="Mobile" className="container-site flex flex-1 flex-col gap-2 py-6">
        {nav.map((n, i) => (
          <Link
            key={n.to}
            to={n.to}
            onClick={onClose}
            className="font-display text-[34px] font-bold animate-in slide-in-from-bottom-4 fade-in fill-mode-both"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="container-site flex flex-col gap-3 pb-10">
        <CTAAnchor href={site.phoneHref} ariaLabel="Call The Plaza Ices">
          <Phone className="h-5 w-5" /> Call {site.phone}
        </CTAAnchor>
        <CTAAnchor href={site.emailHref} variant="ghost-light" ariaLabel="Email The Plaza Ices">
          <Mail className="h-5 w-5" /> Email us
        </CTAAnchor>
        <div className="mt-2 flex justify-center gap-3">
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="The Plaza Ices on Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-paper/15"><Facebook className="h-5 w-5" /></a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="The Plaza Ices on Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-paper/15"><Instagram className="h-5 w-5" /></a>
        </div>
      </div>
    </div>
  );
}
