import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { AlertCircle } from "lucide-react"

export function CompletionIndicator({ percentage = 0, missingFields = [] }: { percentage: number, missingFields: string[] }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-text-darkest">
          <AlertCircle className="w-5 h-5 text-error" />
          <h2 className="text-base font-semibold">Profile needs attention</h2>
        </div>
        <p className="text-sm text-text-secondary max-w-2xl">
          Complete the missing fields to improve your chance of getting tailored matches and generating quality resumes.
        </p>
        <div className="flex flex-wrap gap-2">
          {missingFields.map(field => (
            <Badge key={field} variant="error">{field}</Badge>
          ))}
        </div>
      </div>
      
      <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--color-border)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--color-error)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex items-center justify-center inset-0">
          <span className="text-xl font-bold text-text-darkest">{percentage}%</span>
        </div>
      </div>
    </Card>
  )
}
