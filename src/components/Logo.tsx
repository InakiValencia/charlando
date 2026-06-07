interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "default" | "light";
}

const sizes = {
  sm: { glyph: 28, text: "text-lg" },
  md: { glyph: 34, text: "text-[22px]" },
  lg: { glyph: 44, text: "text-[28px]" },
};

export function Logo({ size = "md", className = "", variant = "default" }: LogoProps) {
  const s = sizes[size];
  const textColor = variant === "light" ? "text-background" : "text-foreground";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={s.glyph}
        height={s.glyph}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="20" fill="hsl(var(--primary))" />
        {/* Mic capsule */}
        <rect x="16" y="9" width="8" height="14" rx="4" fill="white" />
        {/* Mic stand arc */}
        <path
          d="M12 19a8 8 0 0 0 16 0"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="19" y="26" width="2" height="5" rx="1" fill="white" />
        <rect x="15" y="30" width="10" height="2" rx="1" fill="white" />
      </svg>
      <span className={`font-display font-bold tracking-tight ${textColor} ${s.text}`}>
        OpenMicMedia
      </span>
    </span>
  );
}
