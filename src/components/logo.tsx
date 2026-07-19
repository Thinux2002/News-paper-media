import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-5",
    md: "h-8",
    lg: "h-14",
    xl: "h-20",
  };

  const currentHeight = sizeClasses[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src="/logo.png" 
        alt="NEWSPAPER" 
        className={`${currentHeight} w-auto object-contain block`} 
      />
    </div>
  );
}
