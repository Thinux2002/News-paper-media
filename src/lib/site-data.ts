import type { LucideIcon } from "lucide-react";
import { Camera, Video, Palette, Megaphone, Globe, Mic } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  details: string[];
  imageUrl: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "photography",
    title: "Photography",
    icon: Camera,
    description: "High-end commercial, fashion, editorial and product photography.",
    details: [
      "Commercial & studio product shoots",
      "Fashion & portrait editorial",
      "Architectural & interior photography",
      "Corporate headshots & team portraits",
    ],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900",
  },
  {
    id: "videography",
    title: "Videography",
    icon: Video,
    description: "Cinematic commercials, corporate profiles, music videos and social films.",
    details: [
      "4K cinematic brand commercials",
      "Music videos",
      "Corporate documentaries & profiles",
      "Social reels & short-form content",
    ],
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900",
  },
  {
    id: "branding",
    title: "Branding",
    icon: Palette,
    description: "Corporate identity, visual guidelines, packaging and collateral design.",
    details: [
      "Logo & brand identity systems",
      "Typography & style guides",
      "Packaging & label design",
      "Marketing collateral",
    ],
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    description: "Social growth strategy, performance advertising and search campaigns.",
    details: [
      "Audience targeting & growth funnels",
      "Meta, Google & TikTok ads",
      "Search engine optimisation (SEO)",
      "Content strategy & copywriting",
    ],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900",
  },
  {
    id: "website-development",
    title: "Website Development",
    icon: Globe,
    description: "Fast, responsive websites, web platforms and digital products.",
    details: [
      "Custom Next.js & React applications",
      "Interactive portfolio sites",
      "E-commerce integrations",
      "Hosting & CMS setup",
    ],
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=900",
  },
  {
    id: "podcast",
    title: "Podcast",
    icon: Mic,
    description: "Professional recording, editing, storytelling and distribution.",
    details: [
      "Multi-mic studio recording",
      "Sound design & post-production",
      "Distribution & feed setup",
      "Multi-camera video podcasts",
    ],
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=900",
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  imageUrl: string;
}

export const PROJECTS: Project[] = [
  { id: "proj-1", title: "Red Horizon Commercial", category: "Videography", client: "Horizon Motors", imageUrl: "/work_videography.png" },
  { id: "proj-2", title: "Velvet Elegance Identity", category: "Branding", client: "Velvet Couture", imageUrl: "/work_branding.png" },
  { id: "proj-3", title: "Sonic Dialogues Podcast", category: "Podcast", client: "The Thinkers Club", imageUrl: "/work_podcast.png" },
  { id: "proj-4", title: "Vanguard Urban Architecture", category: "Photography", client: "Apex Realty", imageUrl: "/work_photography.png" },
  { id: "proj-5", title: "Hyperion Logistics Platform", category: "Website Development", client: "Hyperion Inc.", imageUrl: "/work_webdev.png" },
  { id: "proj-6", title: "Omni-Channel Growth Strategy", category: "Digital Marketing", client: "Apex Health", imageUrl: "/work_marketing.png" },
];

export const WORK_FILTERS = ["All", ...SERVICES.map((s) => s.title)];

// Logo 7 is intentionally excluded. Logos 2 and 5 use white artwork, so they sit on dark tiles.
const DARK_TILE_LOGOS = new Set(["2", "5"]);
export const CLIENT_LOGOS = ["1", "2", "3", "4", "5", "6", "8", "9"].map((id) => ({
  id,
  src: `/clients/${id}.png`,
  tone: DARK_TILE_LOGOS.has(id) ? ("dark" as const) : ("light" as const),
}));

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "clients", label: "Clients" },
  { id: "contact", label: "Contact" },
];

export const PROCESS_STEPS = [
  {
    title: "Discover",
    text: "We learn your business, audience and goals, then define what success looks like.",
    tags: ["Kick-off call", "Goals & audience", "Brief"],
  },
  {
    title: "Strategy",
    text: "A clear creative direction, production plan, timeline and budget, agreed up front.",
    tags: ["Creative direction", "Timeline", "Quote"],
  },
  {
    title: "Production",
    text: "Our crew shoots, designs and builds, with regular check-ins and review rounds.",
    tags: ["Shoot & design", "Build", "Review rounds"],
  },
  {
    title: "Launch",
    text: "Final delivery, rollout across your channels, and measurement after go-live.",
    tags: ["Delivery", "Rollout", "Reporting"],
  },
];

export const CONTACT = {
  addressLine1: "122B, Lake Road,",
  addressLine2: "Boralesgamuwa, Sri Lanka",
  email: "office@wowmedia.lk",
  phoneDisplay: "0112 517 690",
  phoneHref: "tel:+94112517690",
};

export function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}
