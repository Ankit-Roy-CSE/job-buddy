import { Navbar } from "@/components/layout/Navbar";
import { CompletionIndicator } from "@/components/profile/CompletionIndicator";
import { ResumeUpload } from "@/components/profile/ResumeUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-[1440px] p-8">
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          <CompletionIndicator />
          <ResumeUpload />
          <ProfileForm />
        </div>
      </main>
    </div>
  );
}
