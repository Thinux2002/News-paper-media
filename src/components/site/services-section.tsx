"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight, Check, MoveRight } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { SERVICES } from "@/lib/site-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesSectionProps {
  onQuote: (service?: string) => void;
}

/**
 * Desktop: the section pins and the cards travel horizontally as you scroll,
 * each one swinging from an angle to flat as it reaches the centre.
 * Mobile / reduced motion: a native swipe carousel with snap points.
 */
export function ServicesSection({ onQuote }: ServicesSectionProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = pinRef.current;
        const track = trackRef.current;
        if (!pin || !track) return;

        const distance = () => track.scrollWidth - pin.clientWidth;

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Each card swings in from the right, sits flat at the centre, then tilts away to the left.
        gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: card, containerAnimation: travel, start: "left right", end: "right left", scrub: true },
            })
            .fromTo(card, { rotateY: -32, z: -180, opacity: 0.35 }, { rotateY: 0, z: 0, opacity: 1, ease: "power1.out" })
            .to(card, { rotateY: 22, z: -120, opacity: 0.45, ease: "power1.in" });

          const img = card.querySelector(".service-img");
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: -8 },
              { xPercent: 8, ease: "none", scrollTrigger: { trigger: card, containerAnimation: travel, start: "left right", end: "right left", scrub: true } }
            );
          }
        });
      });
      return () => mm.revert();
    },
    { scope: pinRef }
  );

  return (
    <section id="services" className="relative border-t border-line bg-[#0c0c0e] pt-20 lg:pt-28">
      <div className="container-site mb-12 flex flex-col justify-between gap-8 lg:mb-0 lg:flex-row lg:items-end">
        <SectionHeading index="02" eyebrow="Services" title={<>Our core<br className="hidden sm:block" /> capabilities</>} />
        <div className="reveal max-w-sm space-y-5 lg:pb-2">
          <p className="leading-relaxed text-zinc-400">
            Six disciplines under one roof, so your campaign, content and platform are built by a single team.
          </p>
          <p className="hidden items-center gap-2 text-sm text-zinc-500 lg:flex">
            <MoveRight className="size-4 text-brand" /> Keep scrolling to explore
          </p>
          <p className="flex items-center gap-2 text-sm text-zinc-500 lg:hidden">
            <MoveRight className="size-4 text-brand" /> Swipe to explore
          </p>
        </div>
      </div>

      <div ref={pinRef} className="relative overflow-hidden pb-16 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pb-0 lg:[perspective:1600px]">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] snap-x snap-mandatory scroll-px-5 sm:px-8 sm:scroll-px-8 lg:gap-8 lg:overflow-visible lg:pb-0 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[20vw] lg:[transform-style:preserve-3d] lg:snap-none motion-reduce:lg:overflow-x-auto"
        >
          {/* Intro card */}
          <div className="service-card flex w-[82vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-line bg-gradient-to-br from-brand to-[#8a050b] p-8 text-white sm:w-[420px] lg:h-[68vh] lg:max-h-[620px] lg:w-[380px] lg:p-10">
            <span className="font-mono text-sm text-white/70">00 / {String(SERVICES.length).padStart(2, "0")}</span>
            <div>
              <h3 className="text-5xl leading-[0.95] lg:text-6xl">
                Six disciplines.
                <br />
                One team.
              </h3>
              <p className="mt-5 max-w-xs text-white/80">
                From the first shoot to the finished website — planned, produced and delivered in-house.
              </p>
            </div>
            <button
              onClick={() => onQuote()}
              className="group inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black cursor-pointer"
            >
              Discuss your project <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                id={`service-${service.id}`}
                className="service-card group flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-surface sm:w-[440px] lg:h-[68vh] lg:max-h-[620px] lg:w-[520px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative h-56 shrink-0 overflow-hidden sm:h-64 lg:h-[48%]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    loading="lazy"
                    className="service-img absolute inset-0 h-full w-[116%] max-w-none -translate-x-[7%] object-cover transition-[filter] duration-700 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  <span className="absolute left-6 top-6 flex size-12 items-center justify-center rounded-2xl bg-black/50 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="absolute right-6 top-6 font-heading text-6xl font-bold leading-none text-white/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-1 lg:p-8 lg:pt-2">
                  <h3 className="text-3xl text-white lg:text-4xl">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.description}</p>

                  <ul className="mt-5 grid flex-1 content-start gap-x-5 gap-y-2.5 border-t border-line pt-5 sm:grid-cols-2">
                    {service.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-zinc-300">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onQuote(service.title)}
                    className="mt-6 inline-flex h-12 items-center justify-between rounded-full border border-line pl-5 pr-1.5 text-sm font-semibold text-white transition-colors hover:border-brand hover:bg-brand cursor-pointer"
                  >
                    Request a quote
                    <span className="flex size-9 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </button>
                </div>
              </article>
            );
          })}

          {/* Closing card */}
          <div className="service-card flex w-[82vw] shrink-0 snap-start flex-col items-start justify-center gap-6 rounded-3xl border border-dashed border-line-strong p-8 sm:w-[420px] lg:h-[68vh] lg:max-h-[620px] lg:w-[380px] lg:p-10">
            <h3 className="text-4xl leading-tight text-white">
              Not sure where
              <br />
              to start?
            </h3>
            <p className="text-zinc-400">Tell us your goal and we&apos;ll recommend the right mix of services.</p>
            <button
              onClick={() => onQuote()}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-hover cursor-pointer"
            >
              Get a recommendation <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
