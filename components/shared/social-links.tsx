import { Linkedin, Facebook, Twitter } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  Linkedin,
  Facebook,
  Twitter,
} as const;

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
}

export function SocialLinks({ className, iconSize = "size-4" }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow IJG on ${link.platform}`}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon className={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
