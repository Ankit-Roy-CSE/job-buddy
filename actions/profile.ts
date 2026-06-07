"use server";

import { revalidatePath } from "next/cache";
import { createInsforgeServer } from "@/lib/insforge-server";
import { ProfileFormSchema, ProfileFormValues } from "@/types";

export async function saveProfile(data: ProfileFormValues) {
  try {
    const insforge = await createInsforgeServer();
    const {
      data: { user },
    } = await insforge.auth.getCurrentUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate the input data against the schema
    const parsedData = ProfileFormSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, error: "Invalid form data" };
    }

    const profileData = parsedData.data;

    // Check if required fields are filled for is_complete
    const isComplete =
      !!profileData.full_name &&
      !!profileData.current_title &&
      !!profileData.experience_level &&
      (profileData.skills || []).length > 0 &&
      (profileData.work_experience || []).length > 0;

    const updatePayload = {
      id: user.id,
      full_name: profileData.full_name,
      phone: profileData.phone,
      location: profileData.location,
      linkedin_url: profileData.linkedin_url,
      portfolio_url: profileData.portfolio_url,
      work_authorization: profileData.work_authorization,
      current_title: profileData.current_title,
      experience_level: profileData.experience_level,
      years_experience: profileData.years_experience,
      skills: profileData.skills,
      industries: profileData.industries,
      work_experience: profileData.work_experience,
      education: profileData.education,
      job_titles_seeking: profileData.job_titles_seeking,
      remote_preference: profileData.remote_preference,
      preferred_locations: profileData.preferred_locations,
      salary_expectation: profileData.salary_expectation,
      is_complete: isComplete,
      updated_at: new Date().toISOString(),
    };

    const { error } = await insforge.database
      .from("profiles")
      .upsert(updatePayload)
      .eq("id", user.id);

    if (error) {
      console.error("Error saving profile:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/profile");
    return { success: true };
  } catch (err: any) {
    console.error("Save profile exception:", err);
    return { success: false, error: err.message || "An unexpected error occurred" };
  }
}
