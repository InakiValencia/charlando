interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "default" | "light";
}

const sizes = {
  sm: { glyph: 30, text: "text-lg" },
  md: { glyph: 36, text: "text-[22px]" },
  lg: { glyph: 46, text: "text-[28px]" },
};

export function Logo({ size = "md", className = "", variant = "default" }: LogoProps) {
  const s = sizes[size];
  const textColor = variant === "light" ? "text-background" : "text-foreground";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/openmic-logo.png"
        alt=""
        aria-hidden="true"
        width={s.glyph}
        height={s.glyph}
        className="no-image-outline rounded-full object-contain p-[1px]"
        style={{ width: s.glyph, height: s.glyph }}
        draggable={false}
      />
      <span className={`font-geist font-bold tracking-tight ${textColor} ${s.text}`}>
        Charlando
      </span>
    </span>
  );
}
