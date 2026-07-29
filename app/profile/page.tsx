import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { CompletionIndicator } from "@/components/profile/CompletionIndicator";
import { ResumeUpload } from "@/components/profile/ResumeUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { createInsforgeServer } from "@/lib/insforge-server";

export default async function ProfilePage() {
  const insforge = await createInsforgeServer();
  
  let authData = null;
  let profileData = null;

  try {
    const { data } = await insforge.auth.getCurrentUser();
    authData = data;
    
    if (authData?.user) {
      const { data: pData } = await insforge.database
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();
      profileData = pData;
    }
  } catch (error) {
    console.error("[ProfilePage] Error fetching user/profile:", error);
  }

  if (!authData?.user) {
    redirect("/login?error=auth_required");
  }

  // Initialize with empty defaults if no profile exists
  const profile = profileData || {
    id: authData.user.id,
    email: authData.user.email,
    skills: [],
    industries: [],
    work_experience: [],
    job_titles_seeking: [],
    preferred_locations: [],
  };

  // Calculate missing fields dynamically
  const missingFields: string[] = [];
  if (!profile.full_name) missingFields.push("NAME");
  if (!profile.phone) missingFields.push("PHONE");
  if (!profile.location) missingFields.push("LOCATION");
  if (!profile.current_title) missingFields.push("CURRENT TITLE");
  if (!profile.experience_level) missingFields.push("EXPERIENCE LEVEL");
  if (!profile.skills || profile.skills.length === 0) missingFields.push("SKILLS");
  if (!profile.work_experience || profile.work_experience.length === 0) missingFields.push("WORK EXPERIENCE");

  // Approximate completion percentage based on core fields
  const totalCoreFields = 7;
  const completedFields = totalCoreFields - missingFields.length;
  const completionPercentage = Math.round((completedFields / totalCoreFields) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-[1440px] p-8">
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {missingFields.length > 0 && (
            <CompletionIndicator 
              percentage={completionPercentage} 
              missingFields={missingFields} 
            />
          )}
          <ResumeUpload 
            userId={authData.user.id} 
            currentResumeUrl={profile.resume_pdf_url} 
          />
          <ProfileForm initialData={profile} />
        </div>
      </main>
    </div>
  );
}
