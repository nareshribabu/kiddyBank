---
name: new-milestone
description: Work on a Kiddy Bank milestone (M0 to M12) from plan.md, one story at a time with verification. Use when the user says to start, continue, or finish a milestone or Jira story.
---

# New Milestone

Build one milestone at a time. Small steps, validate each one, and stop at the verify step for the owner's approval.

## Start
1. Read `plan.md` and find the milestone. Read the milestone's epic and stories, with acceptance criteria, from the Jira board using the Jira MCP. Jira is the source of truth for stories.
2. Confirm the previous milestone was approved. If not, stop and ask.
3. Restate in a few lines: the milestone goal, its stories in order, and the verify step. Wait for a go-ahead.
4. Name the other project skills that apply: clay-component for UI, apple-design for motion, supabase-postgres-best-practices for any database work.

## Build one story at a time
1. Take the next story. Break it into small steps.
2. After each step, run the checks and fix before moving on:
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run test`
   The CLAUDE.md commands are authoritative; use the real ones once they exist.
3. Money or interest logic gets unit tests in the same step.
4. When the story's acceptance criteria are met, show the evidence (test output, a screenshot, or what you checked) and pause for the owner.

## Debugging
Reproduce the problem and prove the root cause with evidence before changing code. Test one thing at a time. No workarounds.

## Finish
1. Walk through the milestone's verify step from plan.md and report each check as passed or failed, with output. Say plainly if anything failed or was skipped.
2. Ask the owner to approve. Do not start the next milestone until they do.
3. After the owner approves, move the finished stories and epic to Done on the Jira board via the Jira MCP. Update CLAUDE.md or plan.md if the commands, structure, or decisions changed.

## Do not
- Work ahead on a later milestone.
- Add features or abstractions that the stories do not call for.
- Skip a failing check or loosen a test to make it pass.
- Commit or deploy unless asked.
