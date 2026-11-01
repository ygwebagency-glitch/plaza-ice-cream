import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { site } from "@/data/site";
import { ConeIcon } from "./Decor";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div className="h-full origin-left bg-strawberry" style={{ transform: `scaleX(${p})` }} />
      <ConeIcon className="absolute -top-1 h-4 w-4 -translate-x-1/2" />
      <style>{`.pi-prog-cone{}`}</style>
      <span className="absolute -top-1" style={{ left: `${p * 100}%` }} />
    </div>
  );
}

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <a
        href={site.phoneHref}
        aria-label="Call The Plaza Ices"
        className="btn-primary fixed bottom-4 right-4 z-40 grid h-14 w-14 place-items-center rounded-full md:hidden"
        style={{ borderWidth: 2 }}
      >
        <Phone className="h-6 w-6" />
      </a>
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 left-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-navy text-paper shadow-lg transition-all md:left-auto md:right-6 md:bottom-6 ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}

export function CookieNotice() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      setOpen(localStorage.getItem("pi-cookie") !== "ok");
    } catch {
      /* ignore */
    }
  }, []);
  if (!open) return null;
  return (
    <div role="region" aria-label="Cookie notice" className="card-soft fixed inset-x-4 bottom-20 z-40 flex items-center justify-between gap-4 p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
      <p className="text-sm">We use cookies to give you the best experience on our website.</p>
      <button
        className="btn btn-secondary min-h-11 px-5"
        onClick={() => {
          setOpen(false);
          try { localStorage.setItem("pi-cookie", "ok"); } catch { /* ignore */ }
        }}
      >
        OK
      </button>
    </div>
  );
}

/** Colour panel that wipes away on every route change. */
export function PageTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (first) { setFirst(false); return; }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  if (first) return null;
  const tone = path.includes("vans") ? "bg-sky" : path.includes("gallery") ? "bg-strawberry-pastel" : path.includes("contact") ? "bg-mint" : "bg-sun";
  return <div key={path} aria-hidden className={`page-wipe pointer-events-none fixed inset-0 z-[70] ${tone}`} />;
}

export function Preloader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("pi-loaded")) return;
      sessionStorage.setItem("pi-loaded", "1");
    } catch { /* ignore */ }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div aria-hidden className="fixed inset-0 z-[80] grid place-items-center bg-vanilla animate-out fade-out duration-300 fill-mode-forwards" style={{ animationDelay: "650ms" }}>
      <svg viewBox="0 0 64 80" className="h-24 w-20">
        <g className="drop-in"><circle cx="32" cy="22" r="16" fill="var(--strawberry-pastel)" stroke="var(--navy)" strokeWidth="2.5" /></g>
        <path d="M18 36 L32 76 L46 36Z" fill="var(--sun)" stroke="var(--choc)" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
