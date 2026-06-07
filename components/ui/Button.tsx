import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-accent text-accent-foreground hover:bg-accent/90",
        variant === "secondary" && "bg-surface border border-border text-text-primary hover:bg-surface-secondary",
        variant === "ghost" && "bg-transparent text-text-secondary hover:bg-surface-secondary",
        className
      )}
      {...props}
    />
  )
}
