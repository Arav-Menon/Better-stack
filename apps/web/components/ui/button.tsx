"use client";

import type React from "react";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md",
      ghost: "hover:bg-muted hover:text-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "CustomButton";
