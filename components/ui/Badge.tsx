import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "accent"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variant === "default" && "bg-surface-secondary text-text-secondary border border-border",
        variant === "success" && "bg-success-lightest text-success-foreground",
        variant === "warning" && "bg-warning/10 text-warning",
        variant === "error" && "bg-error/10 text-error",
        variant === "accent" && "bg-accent-muted text-accent",
        className
      )}
      {...props}
    />
  )
}
