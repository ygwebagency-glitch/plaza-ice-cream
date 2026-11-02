import { Link } from "@tanstack/react-router";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

const colors = ["var(--strawberry)", "var(--sun)", "var(--mint)", "var(--sea)"];

export function sprinkleBurst(x: number, y: number) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 14; i++) {
    const el = document.createElement("span");
    const a = (i / 14) * Math.PI * 2;
    const dist = 50 + Math.random() * 40;
    el.className = "sprinkle-bit";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.background = colors[i % 4]!;
    el.style.setProperty("--dx", `${Math.cos(a) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(a) * dist}px`);
    el.style.setProperty("--r", `${Math.random() * 180}deg`);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 750);
  }
}

type Variant = "primary" | "secondary" | "ghost" | "ghost-light";
type Common = { children: ReactNode; variant?: Variant; className?: string; ariaLabel?: string };

const burst = (e: MouseEvent) => sprinkleBurst(e.clientX, e.clientY);

export function CTALink({ to, children, variant = "primary", className }: Common & { to: "/" | "/contact-us" | "/our-ice-cream-vans" | "/gallery"; hash?: string }) {
  return (
    <Link to={to} onClick={variant === "primary" ? burst : undefined} className={cn("btn", `btn-${variant}`, className)}>
      {children}
    </Link>
  );
}

export function CTAAnchor({ href, children, variant = "primary", className, ariaLabel, external }: Common & { href: string; external?: boolean }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onClick={variant === "primary" ? burst : undefined}
      className={cn("btn", `btn-${variant}`, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
