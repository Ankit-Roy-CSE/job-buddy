import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CloudUpload, FileText } from "lucide-react"

export function ResumeUpload() {
  return (
    <Card className="flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-text-primary">Resume</h2>
        <p className="text-sm text-text-secondary">
          Upload an existing resume to auto-fill the profile, or generate a new tailored one from your details below.
        </p>
      </div>

      <div className="border border-dashed border-border rounded-xl bg-surface-secondary p-8 flex flex-col items-center justify-center text-center gap-4">
        <div className="p-3 bg-surface border border-border rounded-lg shadow-sm">
          <CloudUpload className="w-5 h-5 text-text-secondary" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-text-muted">PDF formatting only. Maximum file size 5MB.</p>
        </div>
        <Button variant="secondary" className="mt-2">
          Select Resume
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
        <p className="text-sm text-text-secondary">
          Need a fresh document based on the fields below?
        </p>
        <Button variant="primary" className="shrink-0 w-full sm:w-auto gap-2">
          <FileText className="w-4 h-4" />
          Generate Resume from Profile
        </Button>
      </div>
    </Card>
  )
}
