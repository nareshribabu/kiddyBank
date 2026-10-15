---
name: rls-check
description: Prove Kiddy Bank's row-level security works with a two-family test. Use whenever a table, policy, view, or database function is added or changed, and before finishing any milestone that touches the database.
---

# RLS Check

Row-level security is what keeps one family's data from another, and keeps kids out of parent data. Never assume a policy works; prove it with a test. Also load supabase-postgres-best-practices when writing the policies.

## Test setup
Use the local Supabase stack (`npx supabase start`, and `npx supabase db reset` to start from a clean database). Tests run in Vitest against it and use real sessions, not the service key:
- **Family A:** parent A and kid A1, with data in every table.
- **Family B:** parent B and kid B1, with data in every table.
- **Anonymous:** no session.

Confirm the exact local commands against the repo once M2 sets them up.

## What to prove, for every table
1. **Row-level security is enabled.** Query the catalog and fail if any table in the public schema has it off.
2. **Parent A cannot read, insert, update, or delete family B's rows.** Reads return zero rows, and writes fail or affect zero rows.
3. **Kid A1 cannot see another kid's data**, including their sibling's, unless a feature explicitly allows it.
4. **Kid A1 cannot reach parent-only data or actions**: rules, approvals, other kids' ledgers, other kids' profiles, the PINs or link codes of anyone.
5. **Kid A1 cannot write the ledger directly.** Only the controlled functions work, and each must reject another kid's id.
6. **Anonymous gets nothing** from any table.
7. **Database functions and views** (including security-definer ones) are called as each user type and checked the same way. A view or function that bypasses RLS is a bug.
8. **A revoked linked device loses access** (once device linking exists).

## When writing policies
- Enable RLS in the same migration that creates the table.
- Default deny: no policy means no access.
- Check family membership through the signed-in user, never a value the client sends.
- Never put PINs, link codes, or secrets in a table a kid session can read.

## Finish
Run the whole two-family suite, not just the new tests, and report the results with output. Say plainly if anything failed or was skipped. A new table is not done until it has tests for items 2 to 6 above.

## Do not
- Test with the service role key and call it proof.
- Weaken a policy or a test to make it pass.
- Skip the suite because the change looks small.
