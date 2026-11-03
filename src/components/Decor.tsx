import { cn } from "@/lib/utils";

/** Blue-and-white striped awning edge, like the vans. */
export function AwningDivider({ className, flip }: { className?: string; flip?: boolean }) {
  const n = 14;
  const w = 100 / n;
  return (
    <div aria-hidden className={cn("pointer-events-none w-full leading-none", className)} style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <svg viewBox="0 0 100 9" preserveAspectRatio="none" className="block h-6 w-full md:h-9">
        {Array.from({ length: n * 2 }).map((_, i) => (
          <rect key={i} x={(i * w) / 2} y="0" width={w / 2 + 0.05} height="5" fill={i % 2 ? "var(--paper)" : "var(--sea)"} />
        ))}
        {Array.from({ length: n }).map((_, i) => (
          <path
            key={i}
            d={`M${i * w} 5 h${w} q0 4 -${w / 2} 4 q-${w / 2} 0 -${w / 2} -4z`}
            fill={i % 2 ? "var(--paper)" : "var(--sea)"}
          />
        ))}
      </svg>
    </div>
  );
}

export function WaveDivider({ color = "var(--vanilla)", className }: { color?: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className={cn("block h-8 w-full md:h-14", className)}>
      <path d="M0 30 C 240 70 480 -10 720 30 S 1200 70 1440 30 V60 H0Z" fill={color} />
    </svg>
  );
}

const sprinkleColors = ["var(--strawberry)", "var(--sun)", "var(--mint)", "var(--sea-bright)"];

export function Sprinkles({ count = 10, className, seed = 1 }: { count?: number; className?: string; seed?: number }) {
  const rnd = (i: number) => {
    const x = Math.sin(i * 9301 + seed * 49297) * 233280;
    return Math.round((x - Math.floor(x)) * 1000) / 1000;
  };
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="float absolute block h-2 w-6 rounded-full"
          style={{
            left: `${Math.round(rnd(i) * 95)}%`,
            top: `${Math.round(rnd(i + 50) * 90)}%`,
            background: sprinkleColors[i % 4],
            ["--rot" as string]: `${Math.round((rnd(i + 7) - 0.5) * 120)}deg`,
            animationDelay: `${Math.round(rnd(i + 3) * -60) / 10}s`,
            animationDuration: `${Math.round(50 + rnd(i + 9) * 40) / 10}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Rotating circular proof stamp. */
export function Stamp({ text = "5-STAR FOOD HYGIENE • ECO VANS • SINCE 2004 • ", className, tone = "sun" }: { text?: string; className?: string; tone?: "sun" | "paper" }) {
  return (
    <div aria-hidden className={cn("relative h-32 w-32 md:h-40 md:w-40", className)}>
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 h-full w-full">
        <circle cx="100" cy="100" r="96" fill={tone === "sun" ? "var(--sun)" : "var(--paper)"} stroke="var(--navy)" strokeWidth="3" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="var(--navy)" strokeWidth="2" strokeDasharray="5 6" />
        <defs>
          <path id="stamp-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text fill="var(--navy)" style={{ fontFamily: "var(--font-hand)", fontSize: 21, fontWeight: 600, letterSpacing: 1 }}>
          <textPath href="#stamp-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <ConeIcon className="h-12 w-12 md:h-14 md:w-14" />
      </div>
    </div>
  );
}

export function ConeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M20 30 L32 60 L44 30Z" fill="var(--sun)" stroke="var(--choc)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 36 L40 36 M27 44 L37 44" stroke="var(--choc)" strokeWidth="2" />
      <path d="M17 31 C14 20 22 12 32 12 C42 12 50 20 47 31Z" fill="var(--paper)" stroke="var(--navy)" strokeWidth="2.5" />
      <path d="M26 13 C26 6 38 6 38 13" fill="var(--paper)" stroke="var(--navy)" strokeWidth="2.5" />
      <rect x="40" y="4" width="5" height="20" rx="2" transform="rotate(20 42 14)" fill="var(--choc)" />
    </svg>
  );
}

/** Hand-drawn arrow, draws itself via stroke-dashoffset when `drawn`. */
export function HandArrow({ className, d = "M5 40 C 30 5, 70 5, 95 30", drawn = true }: { className?: string; d?: string; drawn?: boolean }) {
  return (
    <svg viewBox="0 0 100 50" className={className} aria-hidden fill="none">
      <path
        d={d}
        stroke="var(--navy)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={drawn ? 0 : 1}
        style={{ transition: "stroke-dashoffset 1s ease-out" }}
      />
      <path d="M86 22 L95 30 L84 34" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
