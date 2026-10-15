# Kiddy Bank

## Overview
Interactive banking game that teaches kids financial literacy and helps parents and kids talk about money. Kid view: balance, savings goals, loans with interest, prize shop. Parent view: per-child metrics, award or deduct bucks, approve loans, manage shop. Web app first; a mobile app will be a separate project later on the same Supabase backend. About 15 users, so everything must run on free tiers.

The full plan and milestones (0 to 12) are in `plan.md`. Build one milestone at a time and verify it before moving on. Do not start implementation until told Jira setup is done.

## Status
Planning only. The repo contains `plan.md` and no code yet. The commands below are planned and will exist after Milestone 1; confirm against `package.json` once it exists.

## Tech stack
- Vite, React, TypeScript, Tailwind CSS, Motion (animation)
- Supabase: Postgres, auth, row-level security, edge functions, scheduled jobs
- Hosting: Cloudflare Pages (frontend), Supabase free tier (backend)
- Tests: Vitest

## Commands (planned, from Milestone 1)
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

## Domain rules
- Kiddy bucks are purely virtual and stored as integers. Balance is derived from the ledger, never stored directly.
- Loan interest is simple weekly interest on the original principal, rate set by the parent.
- Kid login is avatar plus PIN on shared devices, or a one-time code to link a kid's own device. Parent view needs a parent PIN. A PIN is a lock, never a password.
- Row-level security enforces permissions: kids cannot write to the ledger or reach parent data. Test with a second family account.

## Design
Claymorphism: soft layered shadows, radii of 24px or more, pastel palette, pill buttons and tags, rounded font (Fredoka or Nunito). Colors, shadows, and radii live in one design-token file. Reuse the base components (ClayCard, ClayButton, ClayInput, ProgressBar, Tag, Modal, Avatar) instead of styling ad hoc.

## Coding guidelines
- Keep it simple. Do not overengineer or program defensively; use try/catch only where needed.
- Work in small incremental steps and validate each one before moving on.
- Short modules, short functions, clear names. Concise docstring comments; few comments elsewhere.
- Use the latest library APIs.
- No emojis in code, print statements, or logging.
- Keep README.md concise.
- When debugging, find and prove the root cause before fixing. Reproduce first, test one thing at a time, and do not apply workarounds.
