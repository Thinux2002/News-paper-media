"use client";

import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface QuoteDialogProps {
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultService?: string;
}

const BUDGETS = [
  { value: "Under $1,000", label: "< $1k" },
  { value: "$1,000 – $5,000", label: "$1k – 5k" },
  { value: "$5,000 – $10,000", label: "$5k – 10k" },
  { value: "$10,000+", label: "$10k +" },
];

const NEXT_STEPS = [
  "We review your brief and reply within one business day.",
  "A short call to understand your goals and timeline.",
  "You receive a clear proposal and fixed quote.",
];

export function QuoteDialog({ trigger, open, onOpenChange, defaultService = "Photography" }: QuoteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emptyForm = { name: "", email: "", phone: "", service: defaultService, budget: BUDGETS[1].value, details: "" };
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeOpen = open !== undefined ? open : isOpen;
  const activeSetOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulated request — replace with a real API call.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData(emptyForm);
        activeSetOpen(false);
      }, 2500);
    }, 1200);
  };

  return (
    <Dialog open={activeOpen} onOpenChange={activeSetOpen}>
      {trigger && <DialogTrigger render={trigger} />}

      <DialogContent initialFocus={nameRef} className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-line bg-surface p-0 text-zinc-100 shadow-2xl shadow-black/70 ring-0 sm:max-w-4xl [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:z-20 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:border [&>[data-slot=dialog-close]]:border-line [&>[data-slot=dialog-close]]:bg-background/60">
        <div className="grid md:grid-cols-[0.85fr_1.4fr]">
          {/* ── Side panel ── */}
          <aside className="relative hidden flex-col overflow-hidden border-r border-line bg-[#140607] p-8 md:flex">
            <div aria-hidden className="absolute -left-20 -top-24 size-72 rounded-full bg-brand/35 blur-[90px]" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative">
              <p className="eyebrow mb-4">
                <span className="h-px w-6 bg-brand/60" aria-hidden />
                Start a project
              </p>
              <DialogTitle className="font-heading text-4xl font-bold uppercase leading-[1.02] text-white">
                Request
                <br />a <span className="text-brand">quote</span>
              </DialogTitle>
              <DialogDescription className="mt-4 text-sm leading-relaxed text-zinc-400">
                Tell us about your project and we&apos;ll come back with ideas, a timeline and a clear price.
              </DialogDescription>
            </div>

            <ol className="relative mt-10 space-y-5">
              {NEXT_STEPS.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 font-mono text-xs text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-relaxed text-zinc-300">{step}</span>
                </li>
              ))}
            </ol>

            <div className="relative mt-auto space-y-2.5 border-t border-line pt-6 text-sm">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-zinc-400 transition-colors hover:text-white">
                <Mail className="size-4 text-brand" /> {CONTACT.email}
              </a>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 text-zinc-400 transition-colors hover:text-white">
                <Phone className="size-4 text-brand" /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </aside>

          {/* ── Form ── */}
          <div className="p-6 sm:p-8">
            {/* Compact title for phones (side panel is hidden) */}
            <div className="mb-6 pr-10 md:hidden">
              <p className="font-heading text-3xl font-bold uppercase text-white">
                Request a <span className="text-brand">quote</span>
              </p>
              <p className="mt-1 text-sm text-zinc-400">We reply within one business day.</p>
            </div>

            {isSuccess ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center animate-in fade-in-50 zoom-in-95 duration-300">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="size-7 stroke-[3]" />
                </div>
                <h3 className="text-3xl text-white">Request received</h3>
                <p className="mt-2 max-w-xs text-sm text-zinc-400">
                  Thank you{formData.name ? `, ${formData.name.split(" ")[0]}` : ""}. Our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset>
                  <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">1. What do you need?</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {SERVICES.map((s) => {
                      const Icon = s.icon;
                      const selected = formData.service === s.title;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setFormData((p) => ({ ...p, service: s.title }))}
                          className={cn(
                            "relative flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-[13px] font-medium transition-colors cursor-pointer",
                            selected
                              ? "border-brand bg-brand/10 text-white"
                              : "border-line text-zinc-400 hover:border-line-strong hover:text-white"
                          )}
                        >
                          <Icon className={cn("size-4 shrink-0", selected ? "text-brand" : "text-zinc-500")} />
                          <span className="leading-tight">{s.title}</span>
                          {selected && (
                            <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-brand">
                              <Check className="size-2.5 stroke-[3] text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">2. Estimated budget (USD)</legend>
                  <div className="grid grid-cols-4 gap-1 rounded-xl border border-line bg-background/50 p-1">
                    {BUDGETS.map((b) => {
                      const selected = formData.budget === b.value;
                      return (
                        <button
                          key={b.value}
                          type="button"
                          aria-pressed={selected}
                          aria-label={b.value}
                          onClick={() => setFormData((p) => ({ ...p, budget: b.value }))}
                          className={cn(
                            "h-10 whitespace-nowrap rounded-lg text-[13px] font-medium transition-colors cursor-pointer",
                            selected ? "bg-brand text-white shadow-[0_6px_20px_-8px_rgba(229,9,20,0.8)]" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                          )}
                        >
                          {b.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">3. Your details</legend>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field id="quote-name" label="Full name">
                      <input ref={nameRef} id="quote-name" name="name" type="text" autoComplete="name" placeholder="Jane Perera" value={formData.name} onChange={handleChange} required className="field h-11 px-3.5" />
                    </Field>
                    <Field id="quote-email" label="Email">
                      <input id="quote-email" name="email" type="email" autoComplete="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required className="field h-11 px-3.5" />
                    </Field>
                  </div>
                  <Field id="quote-phone" label="Phone">
                    <input id="quote-phone" name="phone" type="tel" autoComplete="tel" placeholder="+94 77 123 4567" value={formData.phone} onChange={handleChange} required className="field h-11 px-3.5" />
                  </Field>
                  <Field id="quote-details" label="Project details">
                    <textarea
                      id="quote-details"
                      name="details"
                      rows={3}
                      placeholder="Goals, timeline, deliverables…"
                      value={formData.details}
                      onChange={handleChange}
                      required
                      className="field resize-none p-3.5"
                    />
                  </Field>
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(229,9,20,0.7)] transition-colors hover:bg-brand-hover disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send request <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
