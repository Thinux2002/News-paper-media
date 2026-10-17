"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Mail, MapPin, Phone } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/site/section-heading";
import { SocialLinks } from "@/components/site/social-links";
import { CONTACT, SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const ADDRESS_QUERY = encodeURIComponent(`${CONTACT.addressLine1} ${CONTACT.addressLine2}`);
const MAP_EMBED = `https://maps.google.com/maps?q=${ADDRESS_QUERY}&z=15&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`;

const EMPTY_FORM = { name: "", email: "", phone: "", service: "", message: "" };

export function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated request — replace with a real API call.
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSent(false), 4500);
    }, 1200);
  };

  const details = [
    { icon: MapPin, label: "Studio", value: <>{CONTACT.addressLine1}<br />{CONTACT.addressLine2}</>, href: MAP_LINK, external: true },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  ];

  return (
    <section id="contact" className="section-y relative border-t border-line bg-[#0c0c0e]">
      <div className="container-site">
        <div className="mb-12 grid items-end gap-8 lg:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              index="06"
              eyebrow="Contact"
              title={<>Let&apos;s create something <span className="text-brand">unforgettable.</span></>}
            />
          </div>
          <p className="reveal leading-relaxed text-zinc-400 lg:col-span-5 lg:pb-2">
            Planning a shoot, a rebrand or a new website? Send us a few details and we&apos;ll get back to you with next steps.
          </p>
        </div>

        <div className="reveal grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-12">
          {/* ── Details panel ── */}
          <aside className="relative flex flex-col gap-8 border-b border-line p-6 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_0%,rgba(229,9,20,0.14),transparent_70%)]" />

            <div className="relative">
              <h3 className="text-2xl text-white">Get in touch</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Call, email or visit the studio — whichever suits you.</p>
            </div>

            <ul className="relative divide-y divide-line border-y border-line">
              {details.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-4 py-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">{label}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-white">{value}</span>
                    </span>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-zinc-600 transition-colors group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Map showing the Newspaper Media studio"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-48 w-full border-0 [filter:invert(92%)_hue-rotate(180deg)_grayscale(40%)_contrast(90%)]"
              />
            </div>

            <div className="relative mt-auto flex items-center justify-between gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">Follow us</span>
              <SocialLinks />
            </div>
          </aside>

          {/* ── Form panel ── */}
          <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
            {sent ? (
              <div className="flex h-full min-h-[460px] flex-col items-center justify-center text-center animate-in fade-in-50 zoom-in-95 duration-300">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="size-7 stroke-[3]" />
                </div>
                <h3 className="text-3xl text-white">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-zinc-400">Thanks for reaching out. A member of our team will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl text-white">Send us a message</h3>
                  <p className="mt-2 text-sm text-zinc-500">Fields marked * are required.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="contact-name" label="Full name *">
                    <input id="contact-name" type="text" autoComplete="name" placeholder="Jane Perera" value={form.name} onChange={update("name")} required className="field h-12 px-4" />
                  </Field>
                  <Field id="contact-email" label="Email *">
                    <input id="contact-email" type="email" autoComplete="email" placeholder="name@company.com" value={form.email} onChange={update("email")} required className="field h-12 px-4" />
                  </Field>
                  <Field id="contact-phone" label="Phone">
                    <input id="contact-phone" type="tel" autoComplete="tel" placeholder="+94 77 123 4567" value={form.phone} onChange={update("phone")} className="field h-12 px-4" />
                  </Field>
                  <Field id="contact-service" label="Service">
                    <div className="relative">
                      <select
                        id="contact-service"
                        value={form.service}
                        onChange={update("service")}
                        className={cn("field h-12 appearance-none px-4 pr-10 cursor-pointer", !form.service && "text-zinc-500")}
                      >
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title} className="bg-surface text-white">{s.title}</option>
                        ))}
                        <option value="Other" className="bg-surface text-white">Something else</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                    </div>
                  </Field>
                </div>

                <Field id="contact-message" label="Project details *">
                  <textarea
                    id="contact-message"
                    rows={6}
                    placeholder="Tell us about your goals, timeline and deliverables."
                    value={form.message}
                    onChange={update("message")}
                    required
                    className="field resize-none p-4"
                  />
                </Field>

                <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
                  <p className="text-xs text-zinc-500">We&apos;ll only use your details to reply to this enquiry.</p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:opacity-60 sm:w-auto cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium text-zinc-300">{label}</Label>
      {children}
    </div>
  );
}
