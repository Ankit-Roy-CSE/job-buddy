# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 06 Profile Save Logic
**Next:** 07 AI Profile Extraction from Resume

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [x] 05 Profile Page — Full UI
- [x] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Interview Preparation

- [ ] 14 Interview Prep Page — Full UI
- [ ] 15 Interview Session Generation
- [ ] 16 Dynamic AI Explanations
- [ ] 17 Session Persistence & Notes

### Phase 6 — Dashboard

- [ ] 18 Dashboard Page — Full UI
- [ ] 19 Stats Bar — Real Data
- [ ] 20 Recent Activity — Real Data
- [ ] 21 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- Auth uses the InsForge SSR helpers so access and refresh tokens are stored in
  app-owned cookies and are available to Server Components and `proxy.ts`.
- OAuth returns to `/callback`, then exchanges the authorization code through
  `/api/auth/oauth` so the refresh token remains server-owned.
- Next.js 16 route protection uses `proxy.ts`, covering `/dashboard`, `/profile`,
  `/find-jobs`, and `/interview-prep` including nested routes.
- Database schema created via InsForge MCP `run-raw-sql` tool. All 6 tables match
  architecture.md exactly. RLS enabled on every table with user_id = auth.uid() policies.
- interview_questions RLS uses a subquery join to interview_sessions.user_id since
  interview_questions has no direct user_id column.
- profiles.updated_at auto-updates via a BEFORE UPDATE trigger.
- resumes storage bucket created as private (not public).

---

## Notes

- Google and GitHub are enabled in InsForge, but `allowedRedirectUrls` is empty.
  Add the local and production `/callback` URLs before live OAuth can succeed.
- Auth code passes ESLint, TypeScript, production build, and local route smoke
  tests. Unauthenticated `/dashboard` requests redirect to `/login`.
- Feature 03 (PostHog) is ready to implement once PostHog credentials are provided.
  Can proceed to Phase 2 (Profile Page UI) in parallel.

