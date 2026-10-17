"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/site/social-links";
import { NAV_LINKS, SERVICES, CONTACT, scrollToSection } from "@/lib/site-data";

const WORDMARK = "NEWSPAPER".split("");

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3500);
  };

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-[#060607] text-sm text-zinc-400">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />

      <div className="container-site grid grid-cols-2 gap-x-8 gap-y-12 pt-16 pb-12 md:grid-cols-12 lg:pt-20">
        {/* ── Brand + newsletter ── */}
        <div className="col-span-2 space-y-7 md:col-span-12 lg:col-span-5">
          <Logo size="md" />
          <p className="max-w-sm leading-relaxed text-zinc-500">
            A media production and design studio creating commercials, photography, brand identities and digital products.
          </p>

          <div className="max-w-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">Studio news</p>
            {subscribed ? (
              <div className="flex h-12 items-center gap-2 rounded-xl border border-brand/40 bg-brand/10 px-4 text-sm font-medium text-white">
                <Check className="size-4 text-brand" /> You&apos;re subscribed — thank you.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="field h-12 flex-1 rounded-xl px-4"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition-colors hover:bg-brand-hover cursor-pointer"
                >
                  <ArrowRight className="size-4" />
                </button>
              </form>
            )}
            <p className="mt-2 text-xs text-zinc-600">Occasional updates on new work. No spam.</p>
          </div>
        </div>

        {/* ── Link columns ── */}
        <FooterColumn title="Services" className="md:col-span-4 lg:col-span-2 lg:col-start-6">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <FooterLink href="#services" onClick={goTo("services")}>{s.title}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Company" className="md:col-span-3 lg:col-span-2">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <FooterLink href={`#${l.id}`} onClick={goTo(l.id)}>{l.label}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <div className="col-span-2 md:col-span-5 lg:col-span-3">
          <h4 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-white">Contact</h4>
          <ul className="space-y-4">
            <ContactItem icon={MapPin}>
              {CONTACT.addressLine1}
              <br />
              {CONTACT.addressLine2}
            </ContactItem>
            <ContactItem icon={Mail} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</ContactItem>
            <ContactItem icon={Phone} href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</ContactItem>
          </ul>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* ── Outlined wordmark: letters flip up in 3D when it scrolls into view ── */}
      <div className="footer-wordmark container-site select-none pb-6" aria-hidden style={{ perspective: "1000px" }}>
        <div className="flex justify-between font-heading text-[18vw] font-bold uppercase leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] lg:text-[15rem]">
          {WORDMARK.map((ch, i) => (
            <span key={i} className="footer-letter inline-block origin-bottom transition-colors duration-300 hover:[-webkit-text-stroke:1px_rgba(229,9,20,0.8)]">
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-line">
        <div className="container-site flex flex-col-reverse items-start justify-between gap-4 py-6 text-xs text-zinc-600 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Newspaper Media. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#contact" onClick={goTo("contact")} className="inline-flex items-center gap-1 transition-colors hover:text-white">
              Start a project <ArrowUpRight className="size-3.5" />
            </a>
            <button
              onClick={() => scrollToSection("top")}
              className="group inline-flex items-center gap-2 text-zinc-500 transition-colors hover:text-white cursor-pointer"
            >
              Back to top
              <span className="flex size-8 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <ArrowUp className="size-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h4 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-white">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, onClick, children }: { href: string; onClick?: (e: React.MouseEvent) => void; children: React.ReactNode }) {
  return (
    <a href={href} onClick={onClick} className="group inline-flex items-center transition-colors hover:text-white">
      <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:mr-2 group-hover:w-3" aria-hidden />
      {children}
    </a>
  );
}

function ContactItem({ icon: Icon, href, children }: { icon: typeof Mail; href?: string; children: React.ReactNode }) {
  const body = (
    <>
      <Icon className="mt-0.5 size-4 shrink-0 text-brand" />
      <span className="leading-relaxed">{children}</span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex gap-3 break-all transition-colors hover:text-white">{body}</a>
      ) : (
        <div className="flex gap-3">{body}</div>
      )}
    </li>
  );
}
