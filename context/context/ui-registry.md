# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### UI Primitives

#### Card
- **File Path**: [Card.tsx](file:///home/leo/code/projects/job-buddy/components/ui/Card.tsx)
- **Primary Classes**:
  - Background: `bg-surface`
  - Border: `border border-border`
  - Border radius: `rounded-2xl`
  - Spacing: `p-6`
  - Shadow: `shadow-sm`

#### Button
- **File Path**: [Button.tsx](file:///home/leo/code/projects/job-buddy/components/ui/Button.tsx)
- **Primary Classes**:
  - Base: `rounded-md px-4 py-2 text-sm font-medium focus-visible:ring-1 focus-visible:ring-accent`
  - Primary Variant: `bg-accent text-accent-foreground hover:bg-accent/90`
  - Secondary Variant: `bg-surface border border-border text-text-primary hover:bg-surface-secondary`
  - Ghost Variant: `bg-transparent text-text-secondary hover:bg-surface-secondary`

#### Input / Textarea / Select
- **File Path**: [Input.tsx](file:///home/leo/code/projects/job-buddy/components/ui/Input.tsx)
- **Primary Classes**:
  - Base: `bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary`
  - Placeholder: `placeholder:text-text-muted`
  - Focus state: `focus:ring-1 focus:ring-accent focus:border-accent`

#### Label
- **File Path**: [Label.tsx](file:///home/leo/code/projects/job-buddy/components/ui/Label.tsx)
- **Primary Classes**:
  - Base: `text-xs font-medium uppercase text-text-secondary tracking-wide mb-1 block`

#### Badge
- **File Path**: [Badge.tsx](file:///home/leo/code/projects/job-buddy/components/ui/Badge.tsx)
- **Primary Classes**:
  - Base: `rounded-full px-2 py-0.5 text-xs font-medium`
  - Default Variant: `bg-surface-secondary text-text-secondary border border-border`
  - Success Variant: `bg-success-lightest text-success-foreground`
  - Warning Variant: `bg-warning/10 text-warning`
  - Error Variant: `bg-error/10 text-error`
  - Accent Variant: `bg-accent-muted text-accent`

### Layout Components

#### Navbar
- **File Path**: [Navbar.tsx](file:///home/leo/code/projects/job-buddy/components/layout/Navbar.tsx)
- **Primary Classes**: 
  - Header: `w-full bg-surface border-b border-border`
  - Container: `mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6`
  - Links: `text-sm font-medium leading-5 text-text-dark transition-colors hover:text-accent`
  - Primary CTA: `rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90`

#### Footer
- **File Path**: [Footer.tsx](file:///home/leo/code/projects/job-buddy/components/layout/Footer.tsx)
- **Primary Classes**:
  - Container: `w-full border-t border-border bg-surface`
  - Inner: `mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6`
  - Links: `text-sm text-text-secondary transition-colors hover:text-text-primary`

### Homepage Components

#### Hero
- **File Path**: [Hero.tsx](file:///home/leo/code/projects/job-buddy/components/homepage/Hero.tsx)
- **Primary Classes**:
  - Wrapper: `w-full bg-surface-secondary`
  - Header: `text-[44px] font-bold leading-[1.15] tracking-tight text-text-darkest sm:text-[52px]`
  - Primary Button: `bg-accent text-accent-foreground hover:opacity-90`
  - Secondary Button: `border border-border bg-surface text-text-primary hover:bg-surface-secondary`

#### Features
- **File Path**: [Features.tsx](file:///home/leo/code/projects/job-buddy/components/homepage/Features.tsx)
- **Primary Classes**:
  - Section: `w-full bg-surface py-20 border-t border-border`
  - Title: `text-3xl font-bold tracking-tight text-text-darkest sm:text-4xl`
  - Number Badge: `flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent font-semibold text-lg`
  - Image Wrapper: `overflow-hidden rounded-2xl border border-border bg-surface-secondary p-2 shadow-lg`

#### Confidence
- **File Path**: [Confidence.tsx](file:///home/leo/code/projects/job-buddy/components/homepage/Confidence.tsx)
- **Primary Classes**:
  - Section: `w-full bg-surface-secondary py-20 border-t border-border`
  - Heading: `text-3xl font-bold tracking-tight text-text-darkest sm:text-4xl`
  - Left Border Accent: `border-l-2 border-accent pl-4`

#### Testimonial
- **File Path**: [Testimonial.tsx](file:///home/leo/code/projects/job-buddy/components/homepage/Testimonial.tsx)
- **Primary Classes**:
  - Section: `w-full bg-surface py-20 border-t border-border`
  - Card: `overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm md:p-10`
  - Text: `text-lg font-medium leading-8 text-text-primary md:text-xl md:leading-9`
  - Avatar: `rounded-full border border-border bg-surface-secondary object-cover`

#### BottomCTA
- **File Path**: [BottomCTA.tsx](file:///home/leo/code/projects/job-buddy/components/homepage/BottomCTA.tsx)
- **Primary Classes**:
  - Section: `w-full bg-overlay py-20 border-t border-border`
  - Heading: `text-3xl font-bold tracking-tight text-white sm:text-4xl`
  - Subtext: `text-accent-light opacity-90`
  - Secondary Button: `border border-border-muted bg-transparent text-white hover:bg-white/10`

### Auth Components

#### LoginCard
- **File Path**: [LoginCard.tsx](file:///home/leo/code/projects/job-buddy/components/auth/LoginCard.tsx)
- **Last updated**: 2026-06-06
- **Primary Classes**:
  - Card: `rounded-2xl border border-border bg-surface p-8 shadow-sm`
  - Heading: `text-3xl font-bold tracking-tight text-text-darkest`
  - Supporting text: `text-sm leading-6 text-text-secondary`
  - OAuth button: `rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text-primary`
  - OAuth hover/focus: `hover:bg-surface-secondary focus:border-accent focus:ring-1 focus:ring-accent`
  - Error state: `rounded-lg border border-error/20 bg-error/5 px-4 py-3 text-sm text-error`

**Pattern notes:** Auth surfaces use a centered white card on `bg-background`.
Provider buttons remain neutral and reserve brand color for their icons. Primary
purple is used for navigation and recovery actions, not the OAuth button surface.

#### OAuthCallback
- **File Path**: [OAuthCallback.tsx](file:///home/leo/code/projects/job-buddy/components/auth/OAuthCallback.tsx)
- **Last updated**: 2026-06-06
- **Primary Classes**:
  - Card: `rounded-2xl border border-border bg-surface p-8 text-center shadow-sm`
  - Heading: `text-2xl font-bold text-text-darkest`
  - Supporting text: `text-sm text-text-secondary`
  - Loading indicator: `animate-spin rounded-full border-2 border-border border-t-accent`
  - Recovery button: `rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground`

**Pattern notes:** Transitional auth states reuse the login card surface and
keep status messaging centered, with one clear recovery action on failure.
