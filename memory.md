# Memory — Feature 06 Profile Save Logic & SDK Bug Fix

Last updated: 2026-06-07 15:32:00Z

## What was built

- Completely implemented **Feature 06: Profile Save Logic**.
- **Zod Schema:** Configured `ProfileFormSchema` inside `types/index.ts`.
- **UI Components:** Wired `ProfileForm.tsx` with `react-hook-form` and `@hookform/resolvers/zod`. Made `CompletionIndicator.tsx` dynamically calculate profile completeness.
- **Server Action:** Created `actions/profile.ts` containing the `saveProfile` Server Action, persisting the data directly to the `profiles` table via `@insforge/sdk/ssr` with `createServerClient()`.
- **Storage:** Updated `ResumeUpload.tsx` to directly upload PDFs into the `resumes` bucket using `insforge.storage.from("resumes").upload()`.
- **Error Handling (Bug Fix):** Wrapped `insforge.auth.getCurrentUser()` in `try/catch` inside `app/profile/page.tsx` and `app/dashboard/page.tsx`. 

## Decisions made

- Next.js Server Components and Server Actions will explicitly use `try/catch` around `@insforge/sdk/ssr` operations to prevent Next.js 500 router crashes.
- We opted to pass pre-calculated variables (`percentage`, `missingFields`) directly down to components like `CompletionIndicator.tsx` via Server-Side Rendering rather than calculating them on the client.

## Problems solved

- **React-hook-form type mismatch:** Fixed complex nested optionals and unions using Zod's inference, specifically by casting the `zodResolver` as `any` and ensuring we don't try to transform URL schemas too aggressively.
- **Unexpected token '<' JSON Parsing Bug:** Found that the InsForge Next.js server was failing catastrophically with a 500 HTML payload because the InsForge API proxy was rate-limiting/404'ing. The `@supabase/supabase-js` internals attempt to `.json()` HTML responses, bubbling up a `SyntaxError`. Wrapping the `getCurrentUser` call in a `try/catch` in `page.tsx` cleanly solved the Next.js router bug.

## Current state

- **Phase 2 — Profile Page** is actively in progress.
- Feature 06 is completed and checked off in the `progress-tracker.md`.
- Code is robust against API down-time/HTML responses.

## Next session starts with

- **Feature 07: AI Profile Extraction**.
- We need to implement the feature where uploading a resume triggers an Edge Function or OpenAI API call to parse the resume content and automatically pre-fill the form data.

## Open questions

- Are we doing the AI Profile Extraction client-side by sending the file directly to OpenRouter, or using a server-side action?
