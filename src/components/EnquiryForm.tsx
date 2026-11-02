import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { eventTypes, guestOptions } from "@/data/content";
import { site } from "@/data/site";
import { sprinkleBurst } from "./CTAButton";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "phone" | "type" | "message", string>>;

export function validateEnquiry(d: Record<string, string>): Errors {
  const e: Errors = {};
  if (!d.name?.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email?.trim() ?? "")) e.email = "Please enter a valid email address.";
  if ((d.phone ?? "").replace(/\D/g, "").length < 10) e.phone = "Please enter a phone number we can call.";
  if (!d.type) e.type = "Please choose an event type.";
  if ((d.message ?? "").length > 1000) e.message = "Please keep your message under 1000 characters.";
  return e;
}

const field = "mt-1.5 w-full min-h-12 rounded-[16px] border-2 border-navy/20 bg-paper px-4 py-3 text-navy outline-none transition focus:border-sea";

export function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const d = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (d.website) return; // honeypot
    const e = validateEnquiry(d);
    setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setFailed(false);
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
    try {
      if (endpoint) {
        const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
        if (!r.ok) throw new Error("send failed");
      } else {
        const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nEvent type: ${d.type}\nDate: ${d.date || "-"}\nLocation: ${d.location || "-"}\nGuests: ${d.guests || "-"}\n\n${d.message || ""}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Van booking enquiry - ${d.type}`)}&body=${encodeURIComponent(body)}`;
      }
      setDone(true);
      toast("Message sent");
      const r = ev.currentTarget?.getBoundingClientRect?.();
      sprinkleBurst(r ? r.left + r.width / 2 : window.innerWidth / 2, r ? r.top + 120 : 200);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div className="card-soft p-10 text-center">
        <h3 className="h2-size text-strawberry">Thank you!</h3>
        <p className="mt-4 text-lg">We have your enquiry and will be in touch soon. You can also call us on {site.phone}.</p>
      </div>
    );

  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm font-bold text-strawberry">{errors[k]}</p>;
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form noValidate onSubmit={submit} className="card-soft border-navy p-6 shadow-[var(--shadow-sticker)] md:p-9" style={{ borderWidth: 2 }}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block font-bold">Full name*<input name="name" placeholder="Your name" autoComplete="name" className={field} {...aria("name")} />{err("name")}</label>
        <label className="block font-bold">Email address*<input name="email" type="email" placeholder="you@example.com" autoComplete="email" className={field} {...aria("email")} />{err("email")}</label>
        <label className="block font-bold">Phone number*<input name="phone" type="tel" placeholder="07xxx xxxxxx" autoComplete="tel" className={field} {...aria("phone")} />{err("phone")}</label>
        <label className="block font-bold">Event type*
          <select name="type" defaultValue="" className={field} {...aria("type")}>
            <option value="" disabled>Choose an event type</option>
            {eventTypes.map((t) => <option key={t}>{t}</option>)}
          </select>{err("type")}
        </label>
        <label className="block font-bold">Event date<input name="date" type="date" className={field} /></label>
        <label className="block font-bold">Approximate guests
          <select name="guests" defaultValue="" className={field}>
            <option value="">Choose</option>
            {guestOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block font-bold sm:col-span-2">Location on the Isle of Wight<input name="location" className={field} /></label>
        <label className="block font-bold sm:col-span-2">Your message<textarea name="message" rows={5} placeholder="Tell us about your event" className={cn(field, "resize-y")} {...aria("message")} />{err("message")}</label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      </div>
      {failed && <p role="alert" className="mt-4 font-bold text-strawberry">Something went wrong. Please call {site.phone} or email {site.email}.</p>}
      <button type="submit" disabled={busy} className="btn btn-primary mt-7 w-full sm:w-auto">
        {busy && <Loader2 className="h-5 w-5 animate-spin" />} Send enquiry
      </button>
      <p className="mt-4 text-sm text-navy-soft">We only attend events on the Isle of Wight.</p>
    </form>
  );
}
