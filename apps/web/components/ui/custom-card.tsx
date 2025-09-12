import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-lg border border-border bg-[#0c0c0c0c] text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
})

CustomCard.displayName = "CustomCard"
