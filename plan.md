# Kiddy Bank - Plan

## Context
Kiddy Bank is an interactive banking game that teaches kids financial literacy and gives parents a structure for money conversations. Web app first. A phone app will be a separate project later and can reuse the same Supabase backend. Expected scale is about 15 users, so everything must run on free tiers.

Status: plan approved, Jira set up (project KBP). Milestone 0 wireframe in progress; current progress and decisions are in CLAUDE.md.

## Decisions
- Stack: Vite, React, TypeScript, Tailwind CSS, Motion (animation), Supabase (Postgres, auth, row-level security, edge functions, scheduled jobs).
- Hosting: Cloudflare Pages (frontend), Supabase free tier (backend). Cost: 0.
- Currency: purely virtual "kiddy bucks", stored as integers in a ledger. Balance is derived from transactions.
- Loan interest: simple weekly interest on the remaining principal (as real loans do), rate set by the parent. Charged at the end of each week on the principal still owed, rounded to whole bucks with normal rounding (half rounds up, so 1.5 becomes 2). Payments cover interest owed first, then reduce principal. Interest stops when principal reaches 0.
- Login:
  - Parent signs up with email and password.
  - Shared device: kid taps avatar and enters PIN; parent view also needs a parent PIN.
  - Switching on a shared device: the avatar chip (avatar, name, down arrow) opens a profile menu listing the current kid (checked), the other kids, and "Parent view" with a lock, like Netflix and Disney+. Choosing a person opens the PIN pad for them. The full-page profile picker is only the sign-in screen on a shared device. Forgot parent PIN: re-enter the account password.
  - Parent view auto-locks back to the profile picker after about 5 minutes idle. After 5 wrong PIN tries the pad pauses for 1 minute (no scary messages).
  - Kid's own device: parent generates a one-time code (about 10 min, single use) or QR; the kid device stays signed in as that kid in kid view only, with no profile picker or Parent tile. Parent can revoke linked devices.
  - PIN is a lock, never a password. Kid sessions are issued by an edge function and limited by row-level security to that kid's data.
- Supabase free projects pause after about a week idle: add a daily GitHub Actions ping. Add a simple data export script before real families use it.

## Design (claymorphism, from the two reference images)
- Soft inflated shapes: layered shadows (light inner highlight, soft inner shade, diffuse outer drop shadow). Very soft, low-contrast.
- Radii of 24px or more on cards, fully pill-shaped buttons and chips.
- Near-white page background with a faint cool tint; cards slightly raised from it.
- Pastel palette with one saturated accent per context: lavender/purple (primary, kid app), mint, peach, coral (primary action), sky blue (sidebar/parent nav), soft yellow. Colored column backgrounds with tinted cards (as in the board reference).
- Colored pill tags for categories and statuses, small circular avatars, progress bars with a mint fill.
- Kid view: large tap targets, 3D mascot and prize illustrations, coin balance chip top-right, bottom tab bar (Home, Savings, Loans, Shop), bold rounded headings, little text.
- Parent view: same clay language but denser; same top bar and profile menu as the kid view (a sky-blue sidebar was tried and rejected), one card per child on the dashboard, a "To do" board with colored columns, status pills, coral for parent actions.
- Rounded font: Fredoka or Nunito (Google Fonts). Design tokens (colors, shadows, radii) live in one file so the look changes in one place.
- Assets: need a mascot and prize icons (free 3D/clay icon packs, generated, or commissioned). Decide at Milestone 1.

## MVP features
Kid: balance and history, savings goals with progress bars, loan request and active loans with interest and owed amount, repayment, shop with categories, buy or save toward a prize.
Parent: dashboard with one card per kid and drill-down detail, award or deduct bucks with a required reason, approve or deny loans, manage the shop (add, edit, remove prizes), fulfil purchases, set rules (loan rate, loan limit).
Extras in MVP: conversation prompt cards for parents ("Maya borrowed 20 bucks, ask why"), short mini-lessons on first borrow or first save.

## Milestones (build and verify one at a time)
0. Wireframe approval gate (before any app code): one static HTML file with clay styling showing key screens (kid home, kid shop, kid loans, parent dashboard, child detail). No framework, no backend. User approves or requests changes before Milestone 1.
1. Scaffold and design system: Vite, React, TS, Tailwind, tokens, base components (ClayCard, ClayButton, ClayInput, ProgressBar, Tag, Modal, Avatar), showcase page. Verify: showcase renders on desktop and narrow widths; deploy to Cloudflare Pages.
2. Supabase and parent auth: project, schema for families and kid profiles, parent signup and login, parent PIN. Verify: sign up, log in, row-level security blocks other families' data.
3. Kid profiles and login: create profile (name, avatar, PIN), profile picker, PIN entry on shared device. Verify: kid sees only kid view and cannot reach parent view.
4. Device linking: parent generates one-time code or QR, kid device exchanges it via edge function, linked device list with revoke. Verify: code works once, expires, revoked device loses access.
5. Ledger: parent awards or deducts with reason; kid sees balance and history. Verify: unit tests on balance math, balances match ledger sum, kid cannot write to the ledger.
6. Shop: parent prize CRUD; kid browses by category. Verify: parent changes appear for kid.
7. Purchases: kid buys, balance drops, parent fulfils. Verify: cannot overspend; purchase appears in history.
8. Savings goals: pick a prize, move bucks into a jar, progress bar, goal reached. Verify: jar math and unlock behavior.
9. Loans: request, parent approve or deny, weekly simple interest via scheduled job, repayment. Verify: unit tests on interest, scheduled accrual works, repayment clears loan.
10. Parent dashboard: per-child metric cards and detail view. Verify: multi-kid data correct.
11. Conversation prompts and mini-lessons, plus polish and animations. Verify: prompts fire on the right events.
12. Hardening: keep-alive ping, export script, accessibility pass, final deploy.

## Future iterations
Weekly loan due day: kids must make a loan payment by a set day each week; loan history table for each active loan (week by week: interest charged, payments, principal left) so kids see how a loan works; recurring allowance and chore tracker; goal completion bonuses; streaks, badges, levels; needs vs wants quizzes and small games; spend/save/give split with a charity jar; kid credit score tied to repayments; compound interest visualizer; multiple guardians and relative gifts; notifications; optional real-dollar equivalent; passkeys or kid email; family code login; the separate mobile app (Expo or similar) on the same Supabase backend.

## Testing
Vitest for ledger and interest logic. Manual walkthrough of each milestone's verify step. Test row-level security explicitly with a second family account.
