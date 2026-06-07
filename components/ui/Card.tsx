import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("bg-surface border border-border rounded-2xl p-6 shadow-sm", className)} 
      {...props} 
    />
  )
}
