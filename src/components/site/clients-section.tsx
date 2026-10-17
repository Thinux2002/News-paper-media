"use client";

import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { CLIENT_LOGOS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface ClientsSectionProps {
  onQuote: () => void;
}

// Logos drawn in white for dark backgrounds: recolour so they read on the white cards.
const LOGO_FILTERS: Record<string, string> = {
  "2": "invert hue-rotate-180", // white lettering → dark, blue/red kept
  "5": "brightness-0", // all-white emblem → black
};

export function ClientsSection({ onQuote }: ClientsSectionProps) {
  return (
    <section id="clients" className="section-y relative border-t border-line">
      <div className="container-site">
        <div className="mb-14 grid items-end gap-10 lg:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              index="05"
              eyebrow="Clients"
              title={<>Trusted by brands <span className="text-brand">we&apos;re proud of.</span></>}
            />
          </div>
          <div className="reveal space-y-6 lg:col-span-5 lg:pb-2">
            <p className="leading-relaxed text-zinc-400">
              Organisations that trust us with their stories, their brands and their digital presence.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-white">
                  {CLIENT_LOGOS.length}
                  <span className="text-brand">+</span>
                </span>
                <span className="text-sm text-zinc-500">featured partners</span>
              </div>
              <button
                onClick={onQuote}
                className="group inline-flex h-11 items-center gap-3 rounded-full border border-line-strong pl-5 pr-1.5 text-sm font-semibold text-white transition-colors hover:border-brand hover:bg-brand cursor-pointer"
              >
                Become our next client
                <span className="flex size-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4" aria-label="Client logos">
          {CLIENT_LOGOS.map((client) => (
            <li
              key={client.id}
              className="reveal group relative aspect-[3/2] overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(229,9,20,0.55)]"
            >
              {/* Source logos are square with generous padding; cover-crop trims the empty top and bottom. */}
              <img
                src={client.src}
                alt={`Client ${client.id} logo`}
                loading="lazy"
                className={cn(
                  "h-full w-full scale-[0.86] object-cover transition-transform duration-500 group-hover:scale-[0.92]",
                  LOGO_FILTERS[client.id]
                )}
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
