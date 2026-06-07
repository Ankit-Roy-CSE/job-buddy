"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CloudUpload, FileText, CheckCircle2, Loader2, File } from "lucide-react"
import { getInsforgeClient } from "@/lib/insforge-client"

interface ResumeUploadProps {
  userId: string;
  currentResumeUrl: string | null | undefined;
}

export function ResumeUpload({ userId, currentResumeUrl }: ResumeUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const router = useRouter()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.")
      return
    }

    setIsUploading(true)
    setUploadSuccess(false)

    try {
      const insforge = getInsforgeClient();
      const filePath = `${userId}/resume.pdf`
      
      const { data: uploadData, error: uploadError } = await insforge.storage
        .from("resumes")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const publicUrl = insforge.storage
        .from("resumes")
        .getPublicUrl(filePath)

      const { error: dbError } = await insforge.database
        .from("profiles")
        .update({ resume_pdf_url: publicUrl })
        .eq("id", userId)

      if (dbError) throw dbError

      setUploadSuccess(true)
      router.refresh()
    } catch (err: any) {
      console.error("Upload failed", err)
      alert("Upload failed: " + (err.message || "Unknown error"))
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-text-primary">Resume</h2>
        <p className="text-sm text-text-secondary">
          Upload an existing resume to auto-fill the profile, or generate a new tailored one from your details below.
        </p>
      </div>

      <div className="relative border border-dashed border-border rounded-xl bg-surface-secondary p-8 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:bg-surface-secondary/80">
        <input 
          type="file" 
          accept="application/pdf"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          onChange={handleUpload}
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="p-3 bg-surface border border-border rounded-lg shadow-sm">
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
          </div>
        ) : uploadSuccess ? (
          <div className="p-3 bg-success-lightest border border-success/20 rounded-lg shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
        ) : (
          <div className="p-3 bg-surface border border-border rounded-lg shadow-sm">
            <CloudUpload className="w-5 h-5 text-text-secondary" />
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-text-primary mb-1">
            {isUploading ? "Uploading..." : uploadSuccess ? "Upload complete" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-text-muted">PDF formatting only. Maximum file size 5MB.</p>
        </div>
        
        {!isUploading && !uploadSuccess && (
          <Button variant="secondary" className="mt-2 pointer-events-none">
            Select Resume
          </Button>
        )}
      </div>

      {currentResumeUrl && (
        <div className="flex items-center gap-2 p-3 bg-surface border border-border rounded-lg">
          <File className="w-4 h-4 text-text-muted" />
          <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
            Current Resume (PDF)
          </a>
        </div>
      )}

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
