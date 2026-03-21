import Image from "next/image";

export function IjgLogo({ className = "", size = "default" }: { className?: string; size?: "default" | "small" }) {
  const h = size === "small" ? 24 : 32;
  const w = Math.round(h * (430 / 200)); // maintain aspect ratio

  return (
    <Image
      src="/ijg-logo.png"
      alt="IJG Securities"
      width={w}
      height={h}
      className={`object-contain ${className}`}
      priority
    />
  );
}
