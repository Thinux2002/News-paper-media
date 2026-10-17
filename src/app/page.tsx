"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Clock, Mail, Phone, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuoteDialog } from "@/components/quote-dialog";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { WorkCard } from "@/components/site/work-card";
import { ServicesSection } from "@/components/site/services-section";
import { ClientsSection } from "@/components/site/clients-section";
import { ContactSection } from "@/components/site/contact-section";
import {
  SERVICES,
  PROJECTS,
  WORK_FILTERS,
  PROCESS_STEPS,
  CONTACT,
  scrollToSection,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// WebGL scenes are client-only and split into their own bundles.
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

const HERO_LINES = [
  { text: "Creating", accent: false },
  { text: "stories that", accent: false },
  { text: "demand", accent: true },
  { text: "attention.", accent: false },
];

const STATS = [
  { value: 500, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "+", label: "Years in studio" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

const ABOUT_POINTS = [
  { title: "Full-scale production", text: "Storyboards, direction, multi-mic recording and cinema-grade finishing." },
  { title: "Brand strategy", text: "Identity systems that communicate value and support business goals." },
  { title: "Digital engineering", text: "Fast React and Next.js sites with considered user experience." },
  { title: "Performance growth", text: "Data-driven ad funnels and analytics that turn attention into customers." },
];

const FILTER_LABELS: Record<string, string> = {
  "Digital Marketing": "Marketing",
  "Website Development": "Web",
};

// Lay the "All" grid out as a zig-zag of wide and narrow cards on large screens.
const FEATURED_INDEXES = new Set([0, 3, 4]);

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isFirstFilterRun = useRef(true);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("Photography");
  const [activeFilter, setActiveFilter] = useState("All");

  const openQuote = (service = "Photography") => {
    setQuoteService(service);
    setIsQuoteOpen(true);
  };

  const filteredProjects = PROJECTS.filter((p) => activeFilter === "All" || p.category === activeFilter);

  // ─── Page-wide motion ────────────────────────────────────────────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".progress-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.2 },
        });

        // Hero entrance
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(".hero-badge", { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.2)
          .fromTo(
            ".hero-line",
            { yPercent: 110, rotateX: -80 },
            { yPercent: 0, rotateX: 0, duration: 1.3, stagger: 0.1 },
            0.3
          )
          .fromTo(".hero-fade", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.9)
          .fromTo(".hero-3d", { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0.4);

        gsap.to(".hero-3d", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
        });

        // Section titles flip up from their baseline.
        gsap.set(".section-title", { rotateX: -70, y: 30, opacity: 0 });
        ScrollTrigger.batch(".section-title", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { rotateX: 0, y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.1 }),
        });

        // Footer wordmark letters flip up one after another.
        gsap.fromTo(
          ".footer-letter",
          { yPercent: 60, rotateX: -90, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: { trigger: ".footer-wordmark", start: "top 95%", once: true },
          }
        );

        // Process timeline: the red line fills as you scroll through the steps.
        gsap.fromTo(
          ".process-progress",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".process-list", start: "top 60%", end: "bottom 60%", scrub: 0.4 } }
        );
        gsap.set(".process-step", { opacity: 0, x: 40 });
        ScrollTrigger.batch(".process-step", {
          start: "top 85%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }),
        });

        // Generic scroll reveal
        gsap.set(".reveal", { opacity: 0, y: 32 });
        ScrollTrigger.batch(".reveal", {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });

        gsap.set(".work-card", { opacity: 0, y: 40 });
        ScrollTrigger.batch(".work-card", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true }),
        });

        gsap.fromTo(
          ".about-image",
          { yPercent: 6 },
          { yPercent: -6, ease: "none", scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      // Light up each process step once the reader reaches it.
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top 60%", toggleClass: { targets: el, className: "is-active" } });
      });

      // Counters run regardless of motion preference (reduced motion just jumps to the final value).
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: stat.value,
          duration: reduce ? 0 : 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".stats-row", start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => {
        clearTimeout(refresh);
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  // Animate cards when the portfolio filter changes.
  useGSAP(
    () => {
      if (isFirstFilterRun.current) {
        isFirstFilterRun.current = false;
        return;
      }
      gsap.fromTo(
        ".work-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, overwrite: true }
      );
      ScrollTrigger.refresh();
    },
    { scope: rootRef, dependencies: [activeFilter] }
  );

  return (
    <div id="top" ref={rootRef} className="relative min-h-screen overflow-x-clip bg-background text-zinc-100 antialiased">
      <div className="progress-bar fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-brand" aria-hidden />

      <SiteHeader onQuote={openQuote} />

      <main>
        {/* ═══ HERO ═══════════════════════════════════════════════════ */}
        <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_72%_48%,rgba(229,9,20,0.10),transparent_70%)]" />
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_65%_at_55%_40%,black,transparent)]" />
            <div className="grain absolute inset-0 opacity-[0.05]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
          </div>

          <div className="container-site relative z-10 flex flex-1 flex-col pt-32 lg:static lg:flex-row lg:items-center lg:pt-28 lg:pb-12">
            <div className="relative z-10 lg:w-[54%]">
              <p className="hero-badge mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-zinc-200 backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                Media production &amp; creative agency · Sri Lanka
              </p>

              <h1 className="text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.92] text-white" style={{ perspective: "800px" }}>
                {HERO_LINES.map((line) => (
                  <span key={line.text} className="block overflow-hidden pb-[0.04em]">
                    <span className={cn("hero-line block origin-bottom", line.accent && "text-brand")}>{line.text}</span>
                  </span>
                ))}
              </h1>

              <p className="hero-fade mt-8 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg">
                A full-service studio combining cinema-grade production, brand identity and high-performance digital
                engineering for ambitious businesses.
              </p>

              <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => openQuote()}
                  className="group h-13 gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(229,9,20,0.7)] hover:bg-brand-hover cursor-pointer"
                >
                  Start your project
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("work")}
                  className="group h-13 gap-3 rounded-full border border-white/20 bg-white/5 pl-2 pr-6 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-white text-black">
                    <Play className="size-3.5 fill-current" />
                  </span>
                  View our work
                </Button>
              </div>
            </div>

            {/* 3D project ring — sits beside the copy on desktop, below it on mobile */}
            <div className="hero-3d relative -mx-5 mt-4 h-[380px] sm:h-[480px] lg:[mask-image:linear-gradient(to_right,transparent,black_18%)] lg:absolute lg:top-0 lg:bottom-[84px] lg:right-0 lg:mx-0 lg:mt-0 lg:h-auto lg:w-[58vw]">
              <HeroScene />
            </div>
          </div>

          {/* ═══ SERVICE TICKER ═════════════════════════════════════════ */}
          <div className="relative z-10 overflow-hidden border-y border-line bg-surface/90 py-5 backdrop-blur-md" aria-hidden>
            <div className="animate-marquee-fast">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center">
                  {SERVICES.map((s) => (
                    <span key={s.id} className="flex items-center font-heading text-3xl font-bold uppercase text-zinc-700 sm:text-4xl">
                      <span className="px-8">{s.title}</span>
                      <span className="size-2.5 rotate-45 bg-brand" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ══════════════════════════════════════════════════ */}
        <section id="about" className="section-y relative">
          <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Image composition */}
            <div className="reveal relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1100" alt="Team collaborating around laptops" className="about-image absolute left-0 -top-[6%] h-[112%] w-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden w-[46%] overflow-hidden rounded-2xl border-4 border-background shadow-2xl sm:block lg:-right-10">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=700&h=700&fit=crop" alt="Team meeting in the studio" className="aspect-square w-full object-cover" />
              </div>
              <div className="absolute -left-4 top-8 rounded-2xl bg-brand p-5 text-white shadow-2xl shadow-brand/30 lg:-left-8">
                <p className="font-heading text-5xl font-bold leading-none">10+</p>
                <p className="mt-1 text-xs font-medium text-white/80">Years of craft</p>
              </div>
            </div>

            {/* Copy */}
            <div className="space-y-10">
              <SectionHeading
                index="01"
                eyebrow="About us"
                title={<>We shape the look of <span className="text-brand">modern business.</span></>}
                description="Newspaper Media is a creative house bridging visual artistry — film, photography and sound — with digital solutions like websites, applications and performance marketing."
              />

              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {ABOUT_POINTS.map((point) => (
                  <div key={point.title} className="reveal flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Check className="size-3.5 stroke-[3]" />
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold normal-case text-white">{point.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="stats-row reveal grid grid-cols-3 divide-x divide-line border-y border-line py-6">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className={cn("px-2 sm:px-6", i === 0 && "pl-0 sm:pl-0")}>
                    <p className="font-heading text-4xl font-bold text-white sm:text-5xl">
                      <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
                      <span className="text-brand">{stat.suffix}</span>
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServicesSection onQuote={openQuote} />

        {/* ═══ PROCESS — scroll-driven timeline ═══════════════════════ */}
        <section id="process" className="section-y relative border-t border-line">
          <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  index="03"
                  eyebrow="How we work"
                  title={<>From first idea to <span className="text-brand">final delivery.</span></>}
                  description="Every engagement follows the same four stages, so you always know what happens next."
                />
                <div className="reveal mt-10">
                  <Button
                    onClick={() => openQuote()}
                    className="group h-12 gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-brand hover:text-white cursor-pointer"
                  >
                    Start your project
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </Button>
                </div>
              </div>
            </div>

            <ol className="process-list relative lg:col-span-7">
              {/* Track + red progress that fills as you scroll */}
              <span aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-line" />
              <span aria-hidden className="process-progress absolute bottom-8 left-[27px] top-8 w-px origin-top bg-brand" />

              {PROCESS_STEPS.map((step, i) => (
                <li key={step.title} className="process-step group relative flex gap-6 pb-14 last:pb-0 sm:gap-10">
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-background font-mono text-sm text-zinc-500 transition-all duration-500 group-[.is-active]:border-brand group-[.is-active]:bg-brand group-[.is-active]:text-white group-[.is-active]:shadow-[0_0_30px_rgba(229,9,20,0.45)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 group-[.is-active]:border-line-strong sm:p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-2xl text-zinc-500 transition-colors duration-500 group-[.is-active]:text-white sm:text-3xl">
                        {step.title}
                      </h3>
                      <span className="font-mono text-xs text-zinc-600">Step {i + 1} / {PROCESS_STEPS.length}</span>
                    </div>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">{step.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <li
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-zinc-400 transition-colors duration-500 group-[.is-active]:border-brand/30 group-[.is-active]:text-zinc-200"
                        >
                          <Check className="size-3 text-brand" />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ WORK ═══════════════════════════════════════════════════ */}
        <section id="work" className="section-y relative border-t border-line bg-[#0c0c0e]">
          <div className="container-site">
            <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading index="04" eyebrow="Portfolio" title="Featured work" />

              <div
                role="tablist"
                aria-label="Filter projects"
                className="reveal -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end"
              >
                {WORK_FILTERS.map((f) => (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={activeFilter === f}
                    onClick={() => setActiveFilter(f)}
                    className={cn(
                      "h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors cursor-pointer",
                      activeFilter === f
                        ? "border-white bg-white text-black"
                        : "border-line text-zinc-400 hover:border-line-strong hover:text-white"
                    )}
                  >
                    {FILTER_LABELS[f] ?? f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, i) => (
                <WorkCard
                  key={project.id}
                  project={project}
                  index={i}
                  featured={activeFilter === "All" && FEATURED_INDEXES.has(i)}
                />
              ))}
            </div>
          </div>
        </section>

        <ClientsSection onQuote={() => openQuote()} />

        {/* ═══ CTA BAND ═══════════════════════════════════════════════ */}
        <section className="container-site pb-20 lg:pb-28">
          <div className="reveal relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
            <div aria-hidden className="absolute -left-24 -top-32 size-[420px] rounded-full bg-brand/20 blur-[120px]" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,black,transparent)]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow mb-5">
                  <span className="h-px w-8 bg-brand/60" aria-hidden />
                  Start a project
                </p>
                <h2 className="text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                  Have a project <span className="text-brand">in mind?</span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
                  Tell us what you&apos;re planning. We&apos;ll come back with ideas, a timeline and a clear quote.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    onClick={() => openQuote()}
                    className="group h-13 gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(229,9,20,0.7)] hover:bg-brand-hover cursor-pointer"
                  >
                    Get a quote <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </Button>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex h-13 items-center gap-2 rounded-full border border-line-strong px-7 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                  >
                    <Phone className="size-4" /> {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <ul className="divide-y divide-line rounded-2xl border border-line bg-background/60 backdrop-blur-sm lg:col-span-5">
                {[
                  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  { icon: Phone, label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
                  { icon: Clock, label: "Response time", value: "Within one business day" },
                ].map(({ icon: Icon, label, value, href }) => {
                  const body = (
                    <>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <Icon className="size-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">{label}</span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-white">{value}</span>
                      </span>
                      {href && <ArrowUpRight className="size-4 shrink-0 text-zinc-600 transition-colors group-hover:text-brand" />}
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} className="group flex items-center gap-4 p-5 transition-colors hover:bg-white/[0.02]">{body}</a>
                      ) : (
                        <div className="flex items-center gap-4 p-5">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />

      <QuoteDialog key={quoteService} open={isQuoteOpen} onOpenChange={setIsQuoteOpen} defaultService={quoteService} />
    </div>
  );
}
