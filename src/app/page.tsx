"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { QuoteDialog } from "@/components/quote-dialog";

import {
  Camera,
  Video,
  Palette,
  Megaphone,
  Globe,
  Mic,
  ArrowUpRight,
  Menu,
  Mail,
  ChevronRight,
  ChevronDown,
  Check,
  Send,
  Phone,
  MapPin,
  Sparkles,
  Zap
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string[];
  imageUrl: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "photography",
    title: "Photography",
    icon: Camera,
    description: "High-end commercial, fashion, editorial, and product capture.",
    details: [
      "Commercial & Studio Product Shoots",
      "High-Fashion & Portrait Editorial",
      "Architectural & Interior Photography",
      "Corporate Headshots & Team Captures"
    ],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800",
  },
  {
    id: "videography",
    title: "Videography",
    icon: Video,
    description: "Cinematic commercials, corporate profiles, music videos, and social films.",
    details: [
      "4K Cinematic Brand Commercials",
      "High-Fidelity Music Videos",
      "Corporate Documentary & Profiles",
      "Social Media Reels & Micro-Content"
    ],
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800",
  },
  {
    id: "branding",
    title: "Branding",
    icon: Palette,
    description: "Corporate identity, visual guidelines, packaging, and collateral design.",
    details: [
      "Logo & Brand Identity Frameworks",
      "Corporate Typography & Styling Kits",
      "Product Packaging & Label Designs",
      "Marketing Collateral & Guidelines"
    ],
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    description: "Social growth strategy, performance ad planning, and search engine campaigns.",
    details: [
      "Audience Targeting & Growth Funnels",
      "Meta, Google, & TikTok Performance Ads",
      "Search Engine Optimization (SEO)",
      "Content Matrix & Copywriting Strategies"
    ],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
  },
  {
    id: "website-development",
    title: "Website Development",
    icon: Globe,
    description: "Stunning responsive websites, enterprise platforms, and digital products.",
    details: [
      "Custom Next.js & React Applications",
      "Interactive Immersive Portfolios",
      "E-Commerce Engine Integrations",
      "Ultra-Fast Hosting & CMS Setup"
    ],
    imageUrl: "/website_dev.png",
  },
  {
    id: "podcast",
    title: "Podcast",
    icon: Mic,
    description: "Professional audio capturing, editing, brand storytelling, and streaming setup.",
    details: [
      "Cinematic Multi-Mic Recording Sessions",
      "Professional Sound Design & Post-Production",
      "Distribution & Feed Configuration",
      "Video-Podcast Multi-Cam Shoots"
    ],
    imageUrl: "/podcast_studio.png",
  },
];

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  imageUrl: string;
  link: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "Red Horizon Cinematic Commercial",
    category: "Videography",
    client: "Horizon Motors",
    imageUrl: "/work_videography.png",
    link: "#",
  },
  {
    id: "proj-2",
    title: "Velvet Elegance Visual Identity",
    category: "Branding",
    client: "Velvet Couture",
    imageUrl: "/work_branding.png",
    link: "#",
  },
  {
    id: "proj-3",
    title: "Sonic Dialogues Narrative Podcast",
    category: "Podcast",
    client: "The Thinkers Club",
    imageUrl: "/work_podcast.png",
    link: "#",
  },
  {
    id: "proj-4",
    title: "Vanguard Urban Architecture Capture",
    category: "Photography",
    client: "Apex Realty",
    imageUrl: "/work_photography.png",
    link: "#",
  },
  {
    id: "proj-5",
    title: "Hyperion Global Logistics Platform",
    category: "Website Development",
    client: "Hyperion Inc.",
    imageUrl: "/work_webdev.png",
    link: "#",
  },
  {
    id: "proj-6",
    title: "Omni-Channel Scale Strategy",
    category: "Digital Marketing",
    client: "Apex Health",
    imageUrl: "/work_marketing.png",
    link: "#",
  },
];

const CLIENTS_DATA = [
  { id: "1", logoText: "Logo 1", svg: <img src="/clients/1.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 1" /> },
  { id: "2", logoText: "Logo 2", svg: <img src="/clients/2.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 2" /> },
  { id: "3", logoText: "Logo 3", svg: <img src="/clients/3.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 3" /> },
  { id: "4", logoText: "Logo 4", svg: <img src="/clients/4.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 4" /> },
  { id: "5", logoText: "Logo 5", svg: <img src="/clients/5.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 5" /> },
  { id: "6", logoText: "Logo 6", svg: <img src="/clients/6.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 6" /> },
  // { id: "7", logoText: "Logo 7", svg: <img src="/clients/7.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 7" /> },
  { id: "8", logoText: "Logo 8", svg: <img src="/clients/8.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 8" /> },
  { id: "9", logoText: "Logo 9", svg: <img src="/clients/9.png" className="h-32 w-auto object-contain filter brightness-100 invert-0" alt="Logo 9" /> },
];

// ─── GSAP 3D Tilt Card ───────────────────────────────────────────────────────
function WorkCard3D({ project, onClick }: { project: Project; onClick?: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const animators = useRef<{
    rotX: ReturnType<typeof gsap.quickTo>;
    rotY: ReturnType<typeof gsap.quickTo>;
    glintX: ReturnType<typeof gsap.quickTo>;
    glintY: ReturnType<typeof gsap.quickTo>;
    glintO: ReturnType<typeof gsap.quickTo>;
  } | null>(null);

  const initAnimators = useCallback(() => {
    if (!innerRef.current || !glintRef.current) return;
    const cfg = { duration: 0.5, ease: "power2.out" };
    animators.current = {
      rotX: gsap.quickTo(innerRef.current, "rotationX", cfg),
      rotY: gsap.quickTo(innerRef.current, "rotationY", cfg),
      glintX: gsap.quickTo(glintRef.current, "x", { duration: 0.6, ease: "power2.out" }),
      glintY: gsap.quickTo(glintRef.current, "y", { duration: 0.6, ease: "power2.out" }),
      glintO: gsap.quickTo(glintRef.current, "opacity", { duration: 0.35 }),
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !animators.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 → 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 → 1

    animators.current.rotY(dx * 16);
    animators.current.rotX(-dy * 12);

    // glint follows cursor within the card
    animators.current.glintX((dx * rect.width) / 2);
    animators.current.glintY((dy * rect.height) / 2);
    animators.current.glintO(0.18);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, { scale: 1.04, duration: 0.4, ease: "power2.out" });
    animators.current?.glintO(0.12);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!innerRef.current || !animators.current) return;
    animators.current.rotX(0);
    animators.current.rotY(0);
    animators.current.glintO(0);
    gsap.to(innerRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  }, []);

  return (
    <div
      ref={cardRef}
      className="gsap-work-card group relative cursor-pointer select-none"
      style={{ perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => { initAnimators(); handleMouseEnter(); }}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* 3D rotating inner wrapper */}
      <div
        ref={innerRef}
        className="relative rounded-2xl overflow-hidden border border-zinc-900 bg-[#0d0d0f] aspect-[4/3] shadow-lg"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Glint / specular highlight */}
        <div
          ref={glintRef}
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl"
          style={{
            opacity: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 65%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Project image */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />



        {/* Dark overlay + metadata */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-95 transition-opacity duration-300 p-6 flex flex-col justify-end z-20">
          <div
            className="space-y-1.5 translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-300"
            style={{ transform: "translateZ(32px)" }}
          >
            <h4 className="text-lg font-extrabold text-white leading-snug">{project.title}</h4>
            <p className="text-zinc-400 text-xs font-medium">Client: {project.client}</p>
            <span className="inline-flex items-center gap-1 text-[#e50914] text-[10px] font-bold uppercase tracking-widest">
              View Project <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState("Photography");
  const [activeWorkTab, setActiveWorkTab] = useState("All");

  // GSAP Counter numbers state
  const [statProj, setStatProj] = useState(0);
  const [statYears, setStatYears] = useState(0);
  const [statSat, setStatSat] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Scroll handler for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Comprehensive Master-Class GSAP & ScrollTrigger Pipeline
  useGSAP(() => {
    // 0. Top Progress Bar Animation
    gsap.to(".gsap-progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      }
    });

    // Ambient Glows Parallax Motion
    gsap.to(".gsap-glow-1", {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });
    gsap.to(".gsap-glow-2", {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // 1. Hero — Immersive Entrance Sequence
    // Overlay fade-in
    gsap.fromTo(".gsap-hero-overlay",
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: "power2.inOut" }
    );

    // Stagger each word of the headline
    gsap.fromTo(".gsap-hero-word",
      { y: 110, opacity: 0, skewY: 6 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.0,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.3,
      }
    );

    gsap.fromTo(".gsap-hero-badge",
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(".gsap-hero-desc",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.9 }
    );
    gsap.fromTo(".gsap-hero-btns",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.05 }
    );
    gsap.fromTo(".gsap-hero-stats",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1.1 }
    );
    gsap.fromTo(".gsap-hero-reel",
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.6 }
    );
    gsap.fromTo(".gsap-hero-scroll-hint",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.6 }
    );

    // Subtle looping pulse on the scroll hint arrow
    gsap.to(".gsap-scroll-arrow", {
      y: 6,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2,
    });

    // Hero background slow parallax on scroll
    gsap.to(".gsap-hero-bg", {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // 2. About Section Animations
    gsap.fromTo(".gsap-about-header",
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".gsap-about-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        }
      }
    );

    // GSAP Counter Animation
    const counterObj = { proj: 0, years: 0, sat: 0 };
    gsap.to(counterObj, {
      proj: 500,
      years: 10,
      sat: 98,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".gsap-stats-banner",
        start: "top 85%",
      },
      onUpdate: () => {
        setStatProj(Math.floor(counterObj.proj));
        setStatYears(Math.floor(counterObj.years));
        setStatSat(Math.floor(counterObj.sat));
      }
    });

    // 3. Services Section Animations
    gsap.fromTo(".gsap-services-header",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#services",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".gsap-service-card",
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-services-grid",
          start: "top 80%",
        }
      }
    );

    // 4. Work Section Animations
    gsap.fromTo(".gsap-work-header",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#work",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".gsap-work-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-work-grid",
          start: "top 80%",
        }
      }
    );

    // 5. Clients Section Animations
    gsap.fromTo(".gsap-clients-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#clients",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".gsap-client-logo",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".gsap-clients-grid",
          start: "top 85%",
        }
      }
    );

    // 6. Contact Section Animations
    gsap.fromTo(".gsap-contact-info",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".gsap-contact-form",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        }
      }
    );

    // Guarantee ScrollTrigger refresh after setup
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

  }, []);

  const openQuoteModal = (serviceName: string) => {
    setSelectedQuoteService(serviceName);
    setIsQuoteOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    setTimeout(() => {
      setIsContactSubmitting(false);
      setContactSuccess(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setContactSuccess(false), 3000);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail("");
      }, 3000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeWorkTab === "All") return true;
    if (activeWorkTab === "Website Development") return project.category === "Website Development";
    return project.category.toLowerCase().includes(activeWorkTab.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#e50914] selection:text-white antialiased overflow-x-hidden relative">

      {/* GSAP Top Scroll Progress Bar */}
      <div className="gsap-progress-bar fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e50914] via-red-500 to-[#e50914] z-[100] origin-left scale-x-0 shadow-[0_0_12px_#e50914]" />

      {/* Immersive ambient glows with GSAP parallax */}
      <div className="gsap-glow-1 absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="gsap-glow-2 absolute top-[40%] right-[-10%] w-[45%] h-[45%] bg-[#e50914]/4 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[20%] w-[35%] h-[35%] bg-[#e50914]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Main sticky navigation header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
          ? "bg-black/85 backdrop-blur-md border-zinc-900 py-4 shadow-xl"
          : "bg-transparent border-transparent py-6"
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-zinc-400">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="relative py-1 hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-[#e50914] after:transition-transform after:duration-300 hover:after:scale-x-100">HOME</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="relative py-1 hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-[#e50914] after:transition-transform after:duration-300 hover:after:scale-x-100">ABOUT</a>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <button className="relative py-1 flex items-center gap-1 hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-[#e50914] after:transition-transform after:duration-300 hover:after:scale-x-100 cursor-pointer outline-none uppercase font-medium text-sm">
                  SERVICES <ChevronDown className="w-4 h-4" />
                </button>
              } />
              <DropdownMenuContent className="w-60 bg-[#0d0d10] border-[#222] text-zinc-200 rounded-xl p-2 shadow-2xl" align="start">
                <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider px-3 py-2">Our Capabilities</div>
                <DropdownMenuSeparator className="bg-zinc-800/60" />
                {SERVICES_DATA.map((service) => {
                  const IconComp = service.icon;
                  return (
                    <DropdownMenuItem
                      key={service.id}
                      onClick={() => {
                        scrollToSection("services");
                        setTimeout(() => {
                          const target = document.getElementById(`service-card-${service.id}`);
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth", block: "center" });
                            target.classList.add("ring-2", "ring-[#e50914]");
                            setTimeout(() => target.classList.remove("ring-2", "ring-[#e50914]"), 2000);
                          }
                        }, 500);
                      }}
                      className="focus:bg-[#e50914]/10 focus:text-white rounded-lg cursor-pointer px-3 py-2.5 flex items-center gap-3 transition-colors duration-250"
                    >
                      <IconComp className="w-4 h-4 text-[#e50914]" />
                      <span className="text-sm font-semibold">{service.title}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection("work"); }} className="relative py-1 hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-[#e50914] after:transition-transform after:duration-300 hover:after:scale-x-100">WORK</a>
            <a href="#clients" onClick={(e) => { e.preventDefault(); scrollToSection("clients"); }} className="relative py-1 hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-[#e50914] after:transition-transform after:duration-300 hover:after:scale-x-100">CLIENTS</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="relative py-1 hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-[#e50914] after:transition-transform after:duration-300 hover:after:scale-x-100">CONTACT</a>
          </nav>

          {/* Action Button & Responsive trigger */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => openQuoteModal("Photography")}
              className="hidden sm:flex bg-[#e50914] hover:bg-[#b8070f] hover:scale-105 active:scale-95 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-[#e50914]/10 transition-all duration-300 cursor-pointer uppercase text-xs tracking-wider"
            >
              GET A QUOTE
            </Button>

            {/* Mobile Sheet Navigation */}
            <Sheet>
              <SheetTrigger render={
                <Button variant="ghost" size="icon" className="lg:hidden text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg">
                  <Menu className="w-6 h-6" />
                </Button>
              } />
              <SheetContent side="right" className="bg-black border-l border-zinc-900 text-zinc-100 p-6 flex flex-col justify-between">
                <div>
                  <div className="border-b border-zinc-900 pb-6">
                    <Logo size="md" />
                  </div>
                  <nav className="flex flex-col gap-6 mt-10 text-lg font-bold">
                    <a href="#" className="hover:text-[#e50914] transition-colors uppercase tracking-wide">HOME</a>
                    <a href="#about" className="hover:text-[#e50914] transition-colors uppercase tracking-wide">ABOUT</a>
                    <div className="space-y-3">
                      <span className="text-xs text-zinc-600 font-bold uppercase tracking-widest block">SERVICES</span>
                      <div className="grid grid-cols-2 gap-3 pl-2">
                        {SERVICES_DATA.map((service) => (
                          <a
                            key={service.id}
                            href="#services"
                            className="text-sm font-semibold text-zinc-400 hover:text-[#e50914] transition-colors"
                          >
                            {service.title}
                          </a>
                        ))}
                      </div>
                    </div>
                    <a href="#work" className="hover:text-[#e50914] transition-colors uppercase tracking-wide">WORK</a>
                    <a href="#clients" className="hover:text-[#e50914] transition-colors uppercase tracking-wide">CLIENTS</a>
                    <a href="#contact" className="hover:text-[#e50914] transition-colors uppercase tracking-wide">CONTACT</a>
                  </nav>
                </div>

                <div className="border-t border-zinc-900 pt-6">
                  <Button
                    className="w-full bg-[#e50914] hover:bg-[#b8070f] text-white py-6 text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg"
                    onClick={() => openQuoteModal("Photography")}
                  >
                    GET A QUOTE
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10">


        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION — Full-screen Cinematic
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen w-full overflow-hidden flex flex-col"
        >
          {/* ── Background Image + Parallax ── */}
          <div className="gsap-hero-bg absolute inset-0 scale-110 origin-center">
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1800"
              alt=""
              className="w-full h-full object-cover object-center"
              aria-hidden="true"
            />
          </div>

          {/* ── Layered dark overlays ── */}
          <div className="gsap-hero-overlay absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black z-[1]" />
          {/* Horizontal vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40 z-[2] pointer-events-none" />
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 z-[3] opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px",
            }}
          />
          {/* Red accent glow — bottom left */}
          <div className="absolute bottom-0 left-0 w-[60%] h-[50%] bg-[#e50914]/8 rounded-full blur-[180px] z-[2] pointer-events-none" />
          {/* Subtle top-right glow */}
          <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[45%] bg-[#e50914]/5 rounded-full blur-[140px] z-[2] pointer-events-none" />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col flex-1">

            {/* Main hero copy — vertically centered */}
            <div className="flex-1 flex items-center">
              <div className="max-w-7xl w-full mx-auto px-6 pt-28 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

                {/* ── Left: Text block ── */}
                <div className="lg:col-span-7 xl:col-span-6 space-y-8">

                  {/* Badge */}
                  <div className="gsap-hero-badge inline-flex items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-zinc-300 text-[11px] font-semibold tracking-[0.15em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse" />
                    Premium Trans-Media Production Agency
                  </div>

                  {/* Headline — per-word reveal */}
                  <h1 className="overflow-hidden">
                    <div className="flex flex-wrap gap-x-5 gap-y-1 leading-[1.02]">
                      {["CREATING", "STORIES", "THAT", "DEMAND", "ATTENTION."].map((word, i) => (
                        <span
                          key={i}
                          className="gsap-hero-word inline-block font-black tracking-tight text-white"
                          style={{
                            fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                            color: word === "DEMAND" ? "#e50914" : undefined,
                            textShadow: word === "DEMAND" ? "0 0 80px rgba(229,9,20,0.35)" : undefined,
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </h1>

                  {/* Description */}
                  <p className="gsap-hero-desc text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                    A full-service creative agency merging cinema-grade production,
                    iconic brand identities &amp; high-performance digital engineering
                    — built to scale global platforms.
                  </p>

                  {/* CTA Buttons */}
                  <div className="gsap-hero-btns flex flex-wrap gap-4">
                    <button
                      onClick={() => openQuoteModal("Photography")}
                      className="group relative overflow-hidden bg-[#e50914] hover:bg-[#c4070f] text-white font-bold h-13 px-8 py-3.5 rounded-xl shadow-2xl shadow-[#e50914]/25 flex items-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 text-sm tracking-wide"
                    >
                      <span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </button>
                    <button
                      onClick={() => scrollToSection("work")}
                      className="group h-13 px-8 py-3.5 rounded-xl border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-zinc-300 hover:text-white font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95"
                    >
                      Explore Work <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>

                  {/* Floating stat chips
                  <div className="flex flex-wrap gap-3 pt-2">
                    {[
                      { value: "500+", label: "Projects" },
                      { value: "10+", label: "Years" },
                      { value: "98%", label: "Satisfaction" },
                      { value: "6", label: "Services" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="gsap-hero-stats flex items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/8 px-4 py-2.5 rounded-full"
                      >
                        <span className="text-white font-black text-sm">{stat.value}</span>
                        <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                      </div>
                    ))}
                  </div> */}

                </div>

                {/* ── Right: Film-strip reel of services ── */}
                

              </div>
            </div>

            {/* ── Bottom bar: scroll indicator + horizontal rule ── */}
            <div className="gsap-hero-scroll-hint relative z-10 border-t border-white/6 bg-black/20 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                {/* Scroll indicator */}
                <button
                  onClick={() => scrollToSection("about")}
                  className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300 group cursor-pointer"
                >
                  <div className="gsap-scroll-arrow w-8 h-8 rounded-full border border-zinc-700 group-hover:border-[#e50914] flex items-center justify-center transition-colors duration-300">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll to Discover</span>
                </button>

                {/* Service tags */}
                <div className="hidden sm:flex items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-widest font-semibold">
                  {["Photography", "Video", "Branding", "Web", "Marketing", "Podcast"].map((s) => (
                    <span key={s} className="hover:text-zinc-400 transition-colors cursor-default">{s}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT SECTION - GSAP Animated */}
        <section id="about" className="py-24 border-t border-zinc-950 bg-black/60 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Header Details */}
              <div className="gsap-about-header lg:col-span-5 space-y-6 lg:sticky lg:top-32">
                <span className="text-[#e50914] text-xs font-bold uppercase tracking-widest block">WHO WE ARE</span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  WE SHAPE THE AESTHETICS OF MODERN BUSINESS.
                </h2>
                <div className="w-16 h-1 bg-[#e50914]" />
                <p className="text-zinc-400 leading-relaxed font-light">
                  Newspaper Media is an agile creative house delivering high-end assets. We bridge the gap between creative visual artistry (cinematic video, photography, sound design) and advanced digital solutions (websites, applications, performance marketing).
                </p>
              </div>

              {/* Grid cards detailing features & stats */}
              <div className="lg:col-span-7 space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <Card className="gsap-about-card bg-[#0b0b0d] border-zinc-900 hover:border-zinc-800 p-6 rounded-2xl space-y-4 hover:-translate-y-1.5 transition-all duration-300 group">
                    <div className="bg-[#e50914]/10 border border-[#e50914]/20 p-3.5 rounded-xl w-fit text-[#e50914] group-hover:bg-[#e50914] group-hover:text-white transition-all duration-300">
                      <Video className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-white">Full-Scale Production</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      From concept storyboards, director scopes, multi-mic spatial recording to cinema grade finishing and rendering.
                    </p>
                  </Card>

                  <Card className="gsap-about-card bg-[#0b0b0d] border-zinc-900 hover:border-zinc-800 p-6 rounded-2xl space-y-4 hover:-translate-y-1.5 transition-all duration-300 group">
                    <div className="bg-[#e50914]/10 border border-[#e50914]/20 p-3.5 rounded-xl w-fit text-[#e50914] group-hover:bg-[#e50914] group-hover:text-white transition-all duration-300">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-white">Brand Intelligence</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      We craft bespoke corporate branding frameworks that instantly communicate value and align with business objectives.
                    </p>
                  </Card>

                  <Card className="gsap-about-card bg-[#0b0b0d] border-zinc-900 hover:border-zinc-800 p-6 rounded-2xl space-y-4 hover:-translate-y-1.5 transition-all duration-300 group">
                    <div className="bg-[#e50914]/10 border border-[#e50914]/20 p-3.5 rounded-xl w-fit text-[#e50914] group-hover:bg-[#e50914] group-hover:text-white transition-all duration-300">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-white">Digital Engineering</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Designing custom high-performance React and Next.js applications that load instantly and provide gorgeous UX.
                    </p>
                  </Card>

                  <Card className="gsap-about-card bg-[#0b0b0d] border-zinc-900 hover:border-zinc-800 p-6 rounded-2xl space-y-4 hover:-translate-y-1.5 transition-all duration-300 group">
                    <div className="bg-[#e50914]/10 border border-[#e50914]/20 p-3.5 rounded-xl w-fit text-[#e50914] group-hover:bg-[#e50914] group-hover:text-white transition-all duration-300">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-white">Performance Growth</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Deploying data-driven digital ad funnels and analytics to capture, optimize, and convert targeted customer attention.
                    </p>
                  </Card>

                </div>

                {/* Counter stats banner - GSAP Powered */}
                <div className="gsap-stats-banner bg-zinc-950 border border-zinc-900 rounded-3xl p-8 grid grid-cols-3 gap-6 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-4xl font-black text-white">{statProj}+</p>
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider">PROJECTS DELIVERED</p>
                  </div>
                  <div className="space-y-1 border-x border-zinc-900">
                    <p className="text-2xl sm:text-4xl font-black text-[#e50914]">{statYears}+</p>
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider">YEARS IN STUDIO</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-4xl font-black text-white">{statSat}%</p>
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider">CLIENT SATISFACTION</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SERVICES SECTION - GSAP Animated */}
        <section id="services" className="py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header description */}
            <div className="gsap-services-header text-center max-w-2xl mx-auto space-y-4 mb-20">
              <span className="text-[#e50914] text-xs font-bold uppercase tracking-widest block">SERVICES</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                OUR CORE CAPABILITIES
              </h2>
              <p className="text-zinc-500 text-sm font-light">
                Tailored creative execution designed to give your brand a striking unfair advantage.
              </p>
            </div>

            {/* Grid display of 6 services */}
            <div className="gsap-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_DATA.map((service) => {
                const IconComp = service.icon;
                return (
                  <Card
                    key={service.id}
                    id={`service-card-${service.id}`}
                    className="gsap-service-card bg-[#0c0c0e] border-zinc-900 hover:border-zinc-800 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#e50914]/5 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
                  >
                    {/* Tiny visual card header */}
                    <div className="h-44 w-full relative overflow-hidden select-none bg-zinc-950">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/30 to-transparent z-10" />
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm border border-zinc-900 p-2.5 rounded-xl text-[#e50914] z-20 group-hover:bg-[#e50914] group-hover:text-white transition-colors duration-300">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <CardHeader className="px-6 pt-5 pb-2">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-[#e50914] transition-colors duration-200">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-zinc-400 text-xs mt-1 font-light leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Specifications List */}
                    <CardContent className="px-6 py-4 flex-1">
                      <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    {/* Card CTA */}
                    <CardFooter className="px-6 py-4 border-t border-zinc-900 bg-black/30">
                      <Button
                        onClick={() => openQuoteModal(service.title)}
                        className="w-full bg-transparent border border-zinc-800 hover:border-[#e50914] hover:bg-[#e50914] hover:scale-[1.02] text-zinc-300 hover:text-white rounded-lg py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-350"
                      >
                        Book Service <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

          </div>
        </section>

        {/* WORK / PORTFOLIO SECTION - GSAP Animated */}
        <section id="work" className="py-24 border-t border-zinc-950 bg-black/60 relative">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header details */}
            <div className="gsap-work-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-zinc-900 mb-12">
              <div className="space-y-4">
                <span className="text-[#e50914] text-xs font-bold uppercase tracking-widest block">PORTFOLIO</span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  FEATURED WORK
                </h2>
              </div>

              {/* Filtering tabs */}
              <div className="flex flex-wrap gap-2">
                {["All", "Photography", "Videography", "Branding", "Website Development", "Podcast"].map((tab) => (
                  <Button
                    key={tab}
                    onClick={() => setActiveWorkTab(tab)}
                    className={`h-9 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-350 cursor-pointer ${activeWorkTab === tab
                        ? "bg-[#e50914] text-white shadow-lg shadow-[#e50914]/20 scale-105"
                        : "bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-650 hover:scale-105"
                      }`}
                  >
                    {tab === "Website Development" ? "Web Dev" : tab}
                  </Button>
                ))}
              </div>
            </div>

            {/* Grid listing — GSAP 3D Tilt Cards */}
            <div className="gsap-work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <WorkCard3D
                  key={project.id}
                  project={project}
                />
              ))}
            </div>

          </div>
        </section>

        {/* CLIENTS SECTION - GSAP Animated */}
        <section id="clients" className="py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-6">

            {/* Title */}
            <div className="gsap-clients-header text-center max-w-xl mx-auto space-y-3 mb-16">
              <span className="text-[#e50914] text-xs font-bold uppercase tracking-widest block">TRUSTED BY</span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                OUR ESTEEMED CLIENTS
              </h2>
            </div>

            {/* Railway Infinite Running Logo Marquee Track */}
            <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee flex items-center gap-6">
                {[...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA].map((client, index) => (
                  <div
                    key={index}
                    className="gsap-client-logo bg-[#0b0b0d] border border-zinc-900 hover:border-[#e50914]/40 rounded-2xl h-24 w-56 flex-shrink-0 flex items-center justify-center p-6 hover:scale-105 hover:bg-[#e50914]/10 hover:shadow-xl hover:shadow-[#e50914]/10 transition-all duration-300 cursor-pointer"
                  >
                    {client.svg}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT SECTION WITH FORM - GSAP Animated */}
        <section id="contact" className="py-24 border-t border-zinc-950 bg-black/60 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Information Area */}
              <div className="gsap-contact-info lg:col-span-5 space-y-10">
                <div className="space-y-4">
                  <span className="text-[#e50914] text-xs font-bold uppercase tracking-widest block">GET IN TOUCH</span>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                    {"LET'S CREATE SOMETHING UNFORGETTABLE."}
                  </h2>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    Have an upcoming shoot, visual overhaul, or digital development proposal? Write to us, visit our office, or request an instant quote today.
                  </p>
                </div>

                <div className="space-y-6 text-sm text-zinc-300">

                  <div className="flex gap-4 items-start">
                    <div className="bg-[#e50914]/15 border border-[#e50914]/25 p-3 rounded-xl text-[#e50914] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Our Location</p>
                      <p className="font-medium text-white">122B, Lake Road,</p>
                      <p className="font-light">Boralesgamuwa, Sri Lanka</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-[#e50914]/15 border border-[#e50914]/25 p-3 rounded-xl text-[#e50914] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Email Correspondence</p>
                      <a href="mailto:office@wowmedia.lk" className="font-medium text-white hover:text-[#e50914] transition-colors">
                        office@wowmedia.lk
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-[#e50914]/15 border border-[#e50914]/25 p-3 rounded-xl text-[#e50914] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Telephone Line</p>
                      <a href="tel:+94112517690" className="font-medium text-white hover:text-[#e50914] transition-colors">
                        0112 517 690
                      </a>
                    </div>
                  </div>

                </div>

                {/* Social media connections */}
                <div className="space-y-3">
                  <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">Connect with our socials</p>
                  <div className="flex gap-3">
                    <a href="#" className="bg-zinc-950 hover:bg-[#e50914] border border-zinc-900 p-2.5 rounded-lg text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-305" aria-label="Instagram">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-zinc-950 hover:bg-[#e50914] border border-zinc-900 p-2.5 rounded-lg text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-305" aria-label="Facebook">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.55-5 4.5V8z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-zinc-950 hover:bg-[#e50914] border border-zinc-900 p-2.5 rounded-lg text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-305" aria-label="Twitter">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-zinc-950 hover:bg-[#e50914] border border-zinc-900 p-2.5 rounded-lg text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-305" aria-label="Youtube">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.483 20.455 12 20.455 12 20.455s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>

              {/* Form Area */}
              <div className="gsap-contact-form lg:col-span-7">
                <Card className="bg-[#0b0b0d] border-zinc-900 p-8 rounded-3xl shadow-2xl relative">

                  <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#e50914]" /> Write a Message
                  </h3>

                  {contactSuccess ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 animate-in fade-in duration-300">
                      <div className="bg-[#e50914]/15 border border-[#e50914]/30 p-4 rounded-full text-[#e50914] animate-bounce">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg text-white">Message Sent Successfully!</h4>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                          Thank you for reaching out. A studio representative will reply to your email shortly.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="contact-name" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Your Name</Label>
                          <Input
                            id="contact-name"
                            type="text"
                            placeholder="John Doe"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className="bg-zinc-950 border-zinc-900 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-xl h-11 placeholder:text-zinc-700"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="contact-email" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="name@company.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="bg-zinc-950 border-zinc-900 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-xl h-11 placeholder:text-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-subject" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Subject</Label>
                        <Input
                          id="contact-subject"
                          type="text"
                          placeholder="e.g. Website development and shoot proposal"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                          required
                          className="bg-zinc-950 border-zinc-900 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-xl h-11 placeholder:text-zinc-700"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-message" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Message Description</Label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Tell us details about the timeline, media type, and deliverables..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          required
                          className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-xl p-4 text-sm outline-none resize-none placeholder:text-zinc-700"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isContactSubmitting}
                        className="w-full bg-[#e50914] hover:bg-[#b8070f] text-white font-bold h-11 rounded-xl shadow-lg shadow-[#e50914]/15 flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                      >
                        {isContactSubmitting ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Send Message
                          </>
                        )}
                      </Button>

                    </form>
                  )}

                </Card>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-zinc-900 bg-zinc-980 relative z-10 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

            {/* Column 1 - Brand & Identity */}
            <div className="md:col-span-5 space-y-6">
              <a href="#" className="flex" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <Logo size="md" />
              </a>
              <p className="text-zinc-550 leading-relaxed font-light text-[11px] max-w-sm">
                Newspaper Media is a comprehensive media production and custom design company crafting cinematic video campaigns, commercial photography, brand visual blueprints, and high-performance digital products.
              </p>
              <p className="text-[10px] text-zinc-600 font-bold">
                © {new Date().getFullYear()} Newspaper Media. All rights reserved.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Service Focus</h4>
              <ul className="space-y-2.5 text-[11.5px] font-light text-zinc-500">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="hover:text-[#e50914] transition-colors">Commercial Videography</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="hover:text-[#e50914] transition-colors">High-Fashion Photography</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="hover:text-[#e50914] transition-colors">Corporate Visual Branding</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="hover:text-[#e50914] transition-colors">Performance Marketing</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="hover:text-[#e50914] transition-colors">React & Next.js Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="hover:text-[#e50914] transition-colors">Creative Podcasting</a></li>
              </ul>
            </div>

            {/* Column 3 - Newsletter Broadcast */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Newsletter Broadcast</h4>
              <p className="text-zinc-500 font-light text-[11px] leading-relaxed">
                Stay updated with the latest in cinematic styles, software design milestones, and creative guides.
              </p>

              {newsletterSuccess ? (
                <div className="bg-[#e50914]/10 border border-[#e50914]/30 rounded-xl p-3 text-center text-[#e50914] font-semibold text-xs animate-pulse">
                  Subscribed to Broadcast list!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-[#0b0b0d] border-zinc-900 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 rounded-lg text-xs placeholder:text-zinc-700 flex-1"
                  />
                  <Button
                    type="submit"
                    className="bg-[#e50914] hover:bg-[#b8070f] text-white px-4 rounded-lg font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                  >
                    Join
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </footer>

      {/* Global Interactive Quote Dialog Modal */}
      <QuoteDialog
        key={selectedQuoteService}
        open={isQuoteOpen}
        onOpenChange={setIsQuoteOpen}
        defaultService={selectedQuoteService}
      />

    </div>
  );
}
