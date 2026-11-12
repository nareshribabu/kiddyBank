# Kiddy Bank

## Overview
Interactive banking game that teaches kids financial literacy and helps parents and kids talk about money. Kid view: balance, savings goals, loans with interest, prize shop. Parent view: per-child metrics, award or deduct bucks, approve loans, manage shop. Web app first; a mobile app will be a separate project later on the same Supabase backend. About 15 users, so everything must run on free tiers.

The full plan and milestones (0 to 12) are in `plan.md`. Build one milestone at a time and verify it before moving on. Jira setup is done; the board is "Kiddy Bank Product" (project key KBP, epics KBP-6 to KBP-18 are M0 to M12; M0 stories are KBP-19 build wireframe, KBP-20 sign-off). Jira is the source of truth for stories; use the Atlassian MCP (reconnect with `/mcp` on a new machine).

## Status
Milestone 0 (KBP-6), wireframe, is complete and merged to `main`. Milestone 1 (KBP-7), scaffold and design system, is in progress on branch `m1-scaffold`: KBP-21 (tooling, tokens) and KBP-22 (base components, showcase) are done; KBP-23 (Cloudflare Pages deploy) is in progress.

App layout (M1):
- `src/styles/tokens.css`: the single design-token file (Tailwind `@theme`): colors, shadows, radii, font.
- `src/components/`: ClayCard, ClayButton (primary, coral, light), ClayInput, ProgressBar, Tag, Avatar, Modal (native dialog), with tests in `components.test.tsx`.
- `src/lib/`: small pure helpers (`cx`, `progressPercent`).
- `src/assets/avatars/`: 10 kid avatars (boy and girl, 5 skin tones) from Fluent Emoji (MIT license file included); `src/assets/mascot/`: piggy poses as WebP.
- `src/Showcase.tsx`: every component in its variants; it is the whole page until real screens are built.
- jsdom has no `showModal`, so `src/test/setup.ts` stubs it; check Modal focus and Escape in a real browser.
- Windows PowerShell may block `npm`; fix with `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` or use `npm.cmd`.

Wireframe is `wireframe/index.html`: one static file, no framework, hash router (`#home`, `#shop`, `#loans`, `#profiles`, `#pin`, `#parent`; unknown `#parent-*` links fall back to the dashboard), design tokens in the `:root` block. Open it in a browser to review.
- Kid home: approved and committed.
- Kid shop: approved and committed.
- Kid loans: approved and committed.
- Parent dashboard: approved and committed.
- Child detail (`#parent-theo`, Theo only; reached from his kid card arrow): approved and committed. Back link, "Award bucks" and "Deduct bucks", stat cards, Goal, Loan rules (10% a week, limit 100 bucks, limit is sample data), Loans (pending request with Approve and Deny, 3 active, 1 paid off), Recent activity. Nia's card still links to the dashboard.
- Savings tab has no screen yet (not in the M0 list).
- All five screens approved. Home hero button stays "Browse the shop".

Decisions made in M0:
- Layout is fluid and full width (content capped at 1440px, confirmed). Logo left, centered pill nav on desktop, bottom tab bar on phones, bucks chip and profile on the right.
- Kid screens favor spending and prizes over saving. Home headline is "Welcome back, Theo!" (button text to be revisited). Planned dynamic headline states: can afford the goal, zero balance, general.
- Savings goals sit apart from the balance: the Toy Rocket (200 bucks) shows a progress bar with 45 saved; unaffordable non-goal items show only "N more to go". No countdowns or urgency language.
- Loans screen: total owed card beside a "How loans work" guide (bar chart); active loans sorted by most left to pay, two shown plus "See more"; each card shows rate and this week's interest, Borrowed / Interest / Total, and a paid-back progress bar; separate Loan requests and Paid off cards. Use the word "interest", never "extra". Kids borrow only the bucks they are missing.
- Prize button has three states: "Save up" (not a goal yet, cannot afford), "Add bucks" (active goal, partly saved), "Get it" (affordable or goal fully saved). All buttons are solid lavender on every screen; no ghost buttons (they read as disabled).
- "Get it" has no confirm popup in the wireframe; the flow is decided at M7.
- Switching profiles: the avatar chip with a down arrow opens a profile menu (Theo checked, Nia, divider, "Parent view" with a lock), then a PIN pad. The full-page profile picker (`#profiles`) is only the shared-device sign-in screen. Any 4 digits unlock in the wireframe. Parent view auto-locks after about 5 minutes idle; 5 wrong tries pause the pad for 1 minute. Linked kid devices never show the picker.
- Parent dashboard: same top bar as the kid view (no sidebar; owner rejected it). Pill nav Dashboard, Loans (count badge), Shop, Settings (Kids tab cut: kid cards already lead to child detail); bottom tab bar on phones. Avatar menu: Sam (checked), Theo, Nia (each asks for that kid's PIN), "Lock and exit" (goes to the profile picker). Content: "Hi, Sam" with coral "Award bucks"; one card per kid (Balance, Saved, Owed, goal progress, arrow to child detail); "To do" board with Loan requests (Approve / Deny), Prizes to hand over (Mark as given), Talk about it (conversation prompts). Coral is the parent action color; secondary buttons are solid white raised (not ghost).
- Sample data must stay consistent across screens. Theo: balance 120, saved 45 toward Toy Rocket (200), owes 44 on 3 loans at 10% a week (Soccer Ball 20 left, Teddy Bear 13, Mystery Gift 11), pending request Game Controller 30, Story Books loan paid off (20 borrowed, 22 paid in 1 week). Nia: balance 75, saved 30 toward Soccer Ball (80), no loans, Story Books and Mystery Gift bought and awaiting hand-over.
- Mascot is a clay piggy bank (AI generated by the owner, PNGs in `wireframe/assets/`, poses: happy_coins, happy, sad, sleeping, head, logo). Unused so far: sad, sleeping. Prize and coin art is Microsoft Fluent Emoji 3D (MIT). Sample family: kids Theo (boy avatar) and Nia (girl avatar), parent Sam (initial "S" avatar).
- Done in M1: mascot PNGs exported as WebP (about 35KB each, in `src/assets/mascot/`; the wireframe keeps its PNGs). Button contrast fixed with `lavender-strong` (#6d5ee0) and `coral-strong` (#d03f34) tokens, both above 4.5:1 with white text.

To resume: read `plan.md` and the M1 stories in Jira (epic KBP-7), finish KBP-23, then walk the M1 verify step and ask the owner to approve before starting M2.

## Tech stack
- Vite, React, TypeScript, Tailwind CSS, Motion (animation)
- Supabase: Postgres, auth, row-level security, edge functions, scheduled jobs
- Hosting: Cloudflare Pages (frontend), Supabase free tier (backend)
- Tests: Vitest

## Commands
- Install: `npm install`
- Dev server: `npm run dev` (http://localhost:5173)
- Build: `npm run build`
- Test: `npm run test` (Vitest, runs once)
- Lint: `npm run lint` (oxlint)
- Typecheck: `npm run typecheck` (`tsc -b`; plain `tsc --noEmit` checks nothing because the root tsconfig only holds references)

## Domain rules
- Kiddy bucks are purely virtual and stored as integers. Balance is derived from the ledger, never stored directly.
- Loan interest is simple weekly interest on the remaining principal, rate set by the parent. At the end of each week, charge rate times principal still owed, rounded to whole bucks with normal rounding (half rounds up, so 1.5 becomes 2). A payment covers interest owed first, then reduces principal. Interest stops when principal reaches 0.
- Kid login is avatar plus PIN on shared devices, or a one-time code to link a kid's own device. Parent view needs a parent PIN. A PIN is a lock, never a password.
- Row-level security enforces permissions: kids cannot write to the ledger or reach parent data. Test with a second family account.

## Design
Claymorphism: soft layered shadows, radii of 24px or more, pastel palette, pill buttons and tags, rounded font (Fredoka or Nunito). Colors, shadows, and radii live in one design-token file. Reuse the base components (ClayCard, ClayButton, ClayInput, ProgressBar, Tag, Modal, Avatar) instead of styling ad hoc.

## Coding guidelines
Write simple, boring, predictable code, as a pragmatic senior engineer would. Readable and maintainable beats clever.

Structure:
- Single responsibility: each function and module does one thing. Aim for functions under about 25 lines; extract cohesive helpers when longer.
- Keep flow linear. Use guard clauses and early returns instead of deep nesting.
- Name things for what they mean (`weeklyInterest`, not `calc`). No cryptic abbreviations.
- No duplicated logic: extract shared behavior into small pure functions. Do not add an abstraction until it is used twice.
- Prefer pure functions and immutable data. Keep side effects (database, network, time) at the edges so the logic is easy to test.
- Strict TypeScript. No `any` or unchecked casts; model money and ids with clear types.

Errors:
- Validate at system boundaries (user input, Supabase responses, edge function requests), then trust the types inside. Do not add defensive checks for cases that cannot happen.
- Never swallow errors. No empty catch blocks; handle the error or let it propagate.

Comments:
- Docstrings say what a function is for. Other comments explain why (a business rule or constraint), never what the code does.

Testing (scale effort to risk):
- Heavy: money, ledger, balance, interest, purchases, and anything permission-related. Unit test edge cases, rounding, and failure paths; test row-level security with two families.
- Moderate: hooks and components with real logic or state (forms, PIN pad, goal progress). Test behavior, not implementation.
- Light: simple presentational components. A showcase entry or a smoke test is enough.
- A bug fix gets a test that failed before the fix.

Process:
- Keep it simple. Do not overengineer; use try/catch only where needed.
- Work in small incremental steps and validate each one before moving on.
- Use the latest library APIs.
- No emojis in code, print statements, or logging.
- Keep README.md concise.
- When debugging, find and prove the root cause before fixing. Reproduce first, test one thing at a time, and do not apply workarounds.
