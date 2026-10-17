import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ index, eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("reveal space-y-5", align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <p className={cn("eyebrow", align === "center" && "justify-center")}>
        <span className="font-mono text-zinc-500 tracking-normal">{index}</span>
        <span className="h-px w-8 bg-brand/60" aria-hidden />
        {eyebrow}
      </p>
      <div style={{ perspective: "900px" }}>
        <h2 className="section-title origin-bottom text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {description && (
        <p className={cn("text-base leading-relaxed text-zinc-400 sm:text-lg", align === "center" ? "mx-auto max-w-xl" : "max-w-xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
