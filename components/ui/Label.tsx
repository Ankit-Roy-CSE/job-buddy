import * as React from "react"
import { cn } from "@/lib/utils"

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-xs font-medium uppercase text-text-secondary mb-1 block tracking-wide", className)}
      {...props}
    />
  )
}
