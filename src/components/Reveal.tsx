import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

/** Fades/rises children ([data-reveal]) in once when scrolled into view. */
export function Reveal({ children, className, as: Tag = "div", stagger = 90 }: { children: ReactNode; className?: string; as?: ElementType; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const targets = items.length ? items : [root];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      gsap.set(targets, { opacity: 0, y: 32 });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.disconnect();
            gsap.to(targets, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: stagger / 1000, clearProps: "transform" });
          });
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(root);
      cleanup = () => io.disconnect();
    });
    let cleanup = () => {};
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [stagger]);
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, sub, center, light }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; center?: boolean; light?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p data-reveal className={cn("eyebrow mb-3", light && "text-sun")}>{eyebrow}</p>}
      <h2 data-reveal className={cn("h2-size", light ? "text-paper" : "text-navy")}>{title}</h2>
      {sub && <p data-reveal className={cn("mt-4 text-lg", light ? "text-paper/90" : "text-navy-soft")}>{sub}</p>}
    </div>
  );
}
