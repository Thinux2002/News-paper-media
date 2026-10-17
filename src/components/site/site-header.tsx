"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { NAV_LINKS, SERVICES, CONTACT, scrollToSection } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  onQuote: (service?: string) => void;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const SECTION_IDS = ["hero", ...NAV_LINKS.map((l) => l.id), "process"];

export function SiteHeader({ onQuote }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const goToMobile = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    // Let the drawer close before scrolling so the page isn't scroll-locked.
    setTimeout(() => scrollToSection(id), 250);
  };

  // Services scroll horizontally inside a pinned section, so jump to the section itself.
  const highlightService = () => scrollToSection("services");

  const navLinkClass = (id: string) =>
    cn(
      "relative rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-200",
      active === id ? "bg-white/[0.09] text-white" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-6 border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "mt-3 h-[70px] max-w-[76rem] rounded-2xl border-line bg-background/75 pl-5 pr-2.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl"
            : "mt-0 h-[88px] max-w-[80rem] rounded-none border-transparent bg-transparent px-2 sm:px-4"
        )}
      >
        <a href="#top" onClick={goTo("top")} aria-label="Newspaper Media — back to top" className="shrink-0">
          <Logo size="md" className="[&_img]:h-10" />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 rounded-full border border-line bg-white/[0.03] p-1 backdrop-blur-md lg:flex">
          <a href="#about" onClick={goTo("about")} className={navLinkClass("about")}>
            About
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className={cn(navLinkClass("services"), "flex items-center gap-1 cursor-pointer outline-none data-[popup-open]:text-white")}>
                  Services
                  <ChevronDown className="size-3.5 transition-transform duration-200 [[data-popup-open]_&]:rotate-180" />
                </button>
              }
            />
            <DropdownMenuContent
              align="center"
              sideOffset={14}
              className="w-[560px] rounded-2xl border border-line bg-surface/95 p-2 shadow-2xl shadow-black/60 ring-0 backdrop-blur-xl"
            >
              <div className="grid grid-cols-2 gap-1">
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  return (
                    <DropdownMenuItem
                      key={service.id}
                      onClick={highlightService}
                      className="group/item flex items-start gap-3 rounded-xl p-3 cursor-pointer focus:bg-white/[0.04]"
                    >
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-brand transition-colors group-focus/item:border-brand/40 group-focus/item:bg-brand group-focus/item:text-white">
                        <Icon className="size-4" />
                      </span>
                      <span className="space-y-0.5">
                        <span className="block text-[15px] font-semibold text-white">{service.title}</span>
                        <span className="block text-[13px] leading-snug text-zinc-500">{service.description}</span>
                      </span>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {NAV_LINKS.filter((l) => l.id !== "about" && l.id !== "services").map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={goTo(link.id)} className={navLinkClass(link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={CONTACT.phoneHref} className="group hidden items-center gap-3 pr-2 xl:inline-flex" aria-label={"Call us on " + CONTACT.phoneDisplay}>
            <span className="flex size-10 items-center justify-center rounded-full border border-line-strong text-zinc-300 transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
              <Phone className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-zinc-500">Call us</span>
              <span className="block text-[15px] font-semibold text-white">{CONTACT.phoneDisplay}</span>
            </span>
          </a>
          <Button
            onClick={() => onQuote()}
            className="group hidden h-12 gap-2 rounded-full bg-brand px-6 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(229,9,20,0.7)] hover:bg-brand-hover sm:inline-flex cursor-pointer"
          >
            Get a quote <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </Button>

          {/* Mobile navigation */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open menu"
                  className="size-11 rounded-full border border-line-strong text-zinc-200 hover:bg-white/5 hover:text-white lg:hidden"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent
              side="right"
              className="w-full max-w-sm border-l border-line bg-background p-0 text-zinc-100"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-[72px] items-center border-b border-line px-6">
                <Logo size="sm" />
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={goToMobile(link.id)}
                        className="flex items-baseline gap-4 py-3 font-heading text-3xl font-bold uppercase text-white transition-colors hover:text-brand"
                      >
                        <span className="font-sans text-xs font-medium text-zinc-600">0{i + 1}</span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Services</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {SERVICES.map((service) => (
                      <a
                        key={service.id}
                        href="#services"
                        onClick={goToMobile("services")}
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="space-y-3 border-t border-line p-6">
                <Button
                  className="h-12 w-full rounded-full bg-brand text-sm font-semibold text-white hover:bg-brand-hover"
                  onClick={() => {
                    setMobileOpen(false);
                    onQuote();
                  }}
                >
                  Get a quote <ArrowUpRight className="size-4" />
                </Button>
                <a href={`mailto:${CONTACT.email}`} className="block text-center text-sm text-zinc-500 hover:text-white">
                  {CONTACT.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
