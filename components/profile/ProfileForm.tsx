"use client";

import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { ProfileFormSchema, ProfileFormValues } from "@/types";
import { saveProfile } from "@/actions/profile";

interface ProfileFormProps {
  initialData: any;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema) as any,
    defaultValues: {
      full_name: initialData.full_name || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      location: initialData.location || "",
      linkedin_url: initialData.linkedin_url || "",
      portfolio_url: initialData.portfolio_url || "",
      work_authorization: initialData.work_authorization || "us_citizen",
      current_title: initialData.current_title || "",
      experience_level: initialData.experience_level || "senior",
      years_experience: initialData.years_experience || 0,
      skills: initialData.skills || [],
      industries: initialData.industries || [],
      work_experience: initialData.work_experience || [],
      education: initialData.education || { highest_degree: "bachelors" },
      job_titles_seeking: initialData.job_titles_seeking || [],
      remote_preference: initialData.remote_preference || "remote",
      preferred_locations: initialData.preferred_locations || [],
      salary_expectation: initialData.salary_expectation || "",
    },
  });

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = form;

  const { fields: workExperienceFields, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: "work_experience",
  });

  const skills = watch("skills") || [];
  const industries = watch("industries") || [];
  
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      if (val && !skills.includes(val)) {
        setValue("skills", [...skills, val]);
        e.currentTarget.value = "";
      }
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setValue("skills", skills.filter((s) => s !== skill));
  };

  const onSubmit = (data: ProfileFormValues) => {
    startTransition(async () => {
      const result = await saveProfile(data);
      if (!result.success) {
        alert(result.error || "Failed to save profile");
      }
    });
  };

  // Convert array to comma separated for job titles
  const jobTitlesSeekingStr = (watch("job_titles_seeking") || []).join(", ");

  return (
    <Card className="flex flex-col gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-text-primary">Profile Information</h2>
          <p className="text-sm text-text-secondary">
            This context is used to accurately represent you in agent interactions.
          </p>
        </div>

        <div className="border-t border-border pt-8 space-y-6">
          <h3 className="text-sm font-semibold text-text-primary">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input {...register("full_name")} />
              {errors.full_name && <p className="text-error text-xs mt-1">{errors.full_name.message}</p>}
            </div>
            <div>
              <Label>Email Address</Label>
              <Input type="email" {...register("email")} disabled className="opacity-50 cursor-not-allowed bg-surface-secondary" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
            </div>
            <div>
              <Label>Location</Label>
              <Input placeholder="City, State, Country" {...register("location")} />
            </div>
            <div>
              <Label>LinkedIn URL</Label>
              <Input {...register("linkedin_url")} />
            </div>
            <div>
              <Label>Portfolio / GitHub URL</Label>
              <Input {...register("portfolio_url")} />
            </div>
            <div>
              <Label>Work Authorization</Label>
              <Select {...register("work_authorization")}>
                <option value="us_citizen">US Citizen / Green Card</option>
                <option value="h1b">H-1B Visa</option>
                <option value="opt">OPT / CPT</option>
                <option value="other">Other / Require Sponsorship</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 space-y-6">
          <h3 className="text-sm font-semibold text-text-primary">Professional Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Current/Recent Job Title</Label>
              <Input {...register("current_title")} />
              {errors.current_title && <p className="text-error text-xs mt-1">{errors.current_title.message}</p>}
            </div>
            <div>
              <Label>Experience Level</Label>
              <Select {...register("experience_level")}>
                <option value="entry">Entry-Level</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead / Principal</option>
                <option value="exec">Executive</option>
              </Select>
            </div>
            <div>
              <Label>Years of Experience</Label>
              <Input type="number" {...register("years_experience")} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map(skill => (
                  <Badge key={skill} variant="default" className="gap-1 px-3 py-1 bg-surface border-border">
                    {skill} <X className="w-3 h-3 text-text-muted cursor-pointer hover:text-text-primary" onClick={() => handleRemoveSkill(skill)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Type a skill and press Enter" className="max-w-md" onKeyDown={handleAddSkill} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Work Experience</h3>
            <Button type="button" variant="ghost" className="h-8 px-2 gap-1 text-accent hover:text-accent-dark hover:bg-transparent" onClick={() => appendWork({ company_name: "", job_title: "", start_date: "", is_current: false })}>
              <Plus className="w-4 h-4" /> Add role
            </Button>
          </div>
          
          {workExperienceFields.map((field, index) => (
            <div key={field.id} className="p-5 border border-border rounded-xl space-y-4 bg-surface-secondary/30 relative">
              <button type="button" className="absolute top-4 right-4 text-text-muted hover:text-error" onClick={() => removeWork(index)}>
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input {...register(`work_experience.${index}.company_name`)} />
                </div>
                <div>
                  <Label>Job Title</Label>
                  <Input {...register(`work_experience.${index}.job_title`)} />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input type="month" {...register(`work_experience.${index}.start_date`)} />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input type="month" {...register(`work_experience.${index}.end_date`)} disabled={watch(`work_experience.${index}.is_current`)} />
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id={`current-job-${index}`} className="rounded border-border text-accent focus:ring-accent" {...register(`work_experience.${index}.is_current`)} />
                    <label htmlFor={`current-job-${index}`} className="text-sm text-text-secondary">Currently working here</label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>Key Responsibilities & Achievements</Label>
                  <Textarea 
                    {...register(`work_experience.${index}.key_responsibilities`)}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 space-y-6">
          <h3 className="text-sm font-semibold text-text-primary">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Highest Degree</Label>
              <Select {...register("education.highest_degree")}>
                <option value="highschool">High School</option>
                <option value="associates">Associate's Degree</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D.</option>
              </Select>
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input {...register("education.field_of_study")} />
            </div>
            <div>
              <Label>Institution Name</Label>
              <Input {...register("education.institution_name")} />
            </div>
            <div>
              <Label>Graduation Year</Label>
              <Input type="number" {...register("education.graduation_year")} />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 space-y-6">
          <h3 className="text-sm font-semibold text-text-primary">Job Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Job Titles Seeking (Comma separated)</Label>
              <Input 
                value={jobTitlesSeekingStr} 
                onChange={(e) => {
                  const arr = e.target.value.split(",").map(v => v.trim()).filter(Boolean);
                  setValue("job_titles_seeking", arr);
                }} 
              />
            </div>
            <div>
              <Label>Remote Preference</Label>
              <Select {...register("remote_preference")}>
                <option value="remote">Fully Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
                <option value="any">Any</option>
              </Select>
            </div>
            <div>
              <Label>Salary Expectation (Optional)</Label>
              <Input placeholder="$120k - $150k" {...register("salary_expectation")} />
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <Button type="submit" variant="primary" className="w-full py-3 text-base flex justify-center items-center gap-2" disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
