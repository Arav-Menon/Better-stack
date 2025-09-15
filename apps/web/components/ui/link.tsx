import Link from "next/link";
import { cn } from "@/lib/utils";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "secondary" | "ghost" | "destructive" | "primary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CustomLink({
  href,
  children,
  variant = "default",
  size = "md",
  className,
}: CustomLinkProps) {
  const variants = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md",
    ghost: "hover:bg-muted hover:text-foreground rounded-lg",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
    primary:
      "font-medium text-white/70 hover:text-[#fff] transition-colors underline  ",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <Link
      href={href}
      className={cn("font-medium", variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}
