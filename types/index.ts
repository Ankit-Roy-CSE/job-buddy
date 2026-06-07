import { z } from "zod";

export const WorkExperienceSchema = z.object({
  id: z.string().optional(),
  company_name: z.string().min(1, "Company name is required"),
  job_title: z.string().min(1, "Job title is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  is_current: z.boolean().default(false),
  key_responsibilities: z.string().optional(),
});

export const EducationSchema = z.object({
  highest_degree: z.string().optional(),
  field_of_study: z.string().optional(),
  institution_name: z.string().optional(),
  graduation_year: z.coerce.number().optional(),
});

export const ProfileFormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email().optional(), // usually read-only
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  portfolio_url: z.string().url().optional().or(z.literal("")),
  work_authorization: z.string().optional(),

  current_title: z.string().min(1, "Current title is required"),
  experience_level: z.string().min(1, "Experience level is required"),
  years_experience: z.coerce.number().min(0).optional(),
  skills: z.array(z.string()).optional(),
  industries: z.array(z.string()).optional(),

  work_experience: z.array(WorkExperienceSchema).optional(),
  education: EducationSchema.optional(),

  job_titles_seeking: z.array(z.string()).optional(),
  remote_preference: z.string().optional(),
  preferred_locations: z.array(z.string()).optional(),
  salary_expectation: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
