"use client";

import React, { useCallback, useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation in degrees around the Y axis; X uses 75% of it. */
  max?: number;
  /** Class for the rotating inner element. */
  innerClassName?: string;
  innerProps?: React.HTMLAttributes<HTMLElement> & { id?: string };
  as?: "div" | "article";
}

/**
 * 3D hover tilt: the inner element rotates toward the cursor with a moving light glint.
 * Children can use `[transform:translateZ(..)]` to float above the surface.
 */
export function Tilt({ max = 8, className, innerClassName, innerProps, as = "div", children, ...rest }: TiltProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const tilt = useRef<{
    rotX: gsap.QuickToFunc;
    rotY: gsap.QuickToFunc;
    gx: gsap.QuickToFunc;
    gy: gsap.QuickToFunc;
  } | null>(null);

  const handleEnter = useCallback(() => {
    const ok = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok || !innerRef.current || !glintRef.current) return;
    const cfg = { duration: 0.6, ease: "power3.out" };
    tilt.current ??= {
      rotX: gsap.quickTo(innerRef.current, "rotationX", cfg),
      rotY: gsap.quickTo(innerRef.current, "rotationY", cfg),
      gx: gsap.quickTo(glintRef.current, "xPercent", cfg),
      gy: gsap.quickTo(glintRef.current, "yPercent", cfg),
    };
    gsap.to(glintRef.current, { opacity: 1, duration: 0.3 });
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt.current || !outerRef.current) return;
      const r = outerRef.current.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      tilt.current.rotY(dx * max * 2);
      tilt.current.rotX(-dy * max * 1.5);
      tilt.current.gx(dx * 100);
      tilt.current.gy(dy * 100);
    },
    [max]
  );

  const handleLeave = useCallback(() => {
    if (!tilt.current) return;
    tilt.current.rotX(0);
    tilt.current.rotY(0);
    if (glintRef.current) gsap.to(glintRef.current, { opacity: 0, duration: 0.4 });
  }, []);

  const Inner = as;

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ perspective: "1100px" }}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      <Inner
        ref={innerRef as React.Ref<HTMLDivElement>}
        className={cn("relative h-full", innerClassName)}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        {...innerProps}
      >
        {children}
        <div
          ref={glintRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 mix-blend-overlay"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), transparent 55%)" }}
        />
      </Inner>
    </div>
  );
}
