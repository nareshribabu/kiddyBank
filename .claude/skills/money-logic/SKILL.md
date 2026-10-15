---
name: money-logic
description: Rules for any code that touches kiddy bucks, balances, the ledger, purchases, savings jars, or loan interest. Use when writing or changing ledger, balance, purchase, goal, or loan logic, in the database or the app.
---

# Money Logic

Kiddy bucks are virtual, but kids and parents still need to trust the numbers. Follow these rules whenever money code is touched. Also load supabase-postgres-best-practices for any database work.

## Rules
1. **Integers only.** Amounts are whole kiddy bucks stored as integers. Never floats. Interest is rounded to a whole buck in one place, using one documented rule (round down), so every screen agrees.
2. **The ledger is the truth.** Every change to money is an append-only ledger row (amount, reason, who made it, time). Never edit or delete rows; correct mistakes with a reversing entry.
3. **Balance is derived.** Balance is the sum of ledger rows. Do not store a balance column that can drift. If a cached value is ever added, a test must prove it equals the sum.
4. **Spendable vs saved.** Jar (savings) money is kept separate from spendable balance, and both reconcile to the ledger.
5. **Atomic writes.** A purchase, loan payout, repayment, or jar move and its ledger entries happen in one database transaction. Overspend checks run inside it with a lock, so two concurrent buys cannot overdraw.
6. **Permissions in the database.** Row-level security decides who can write: only parents write award, deduct, and approval entries. Kids can read their own ledger and trigger only their own purchases, jar moves, and repayments, through controlled functions, never direct inserts.
7. **Loan interest.** Simple interest on the original principal, at the parent's weekly rate. Accrual runs in a scheduled job, once per week per loan, and is idempotent so a re-run cannot double-charge. Each accrual is a ledger-linked interest event.
8. **Negative balance.** The balance cannot go below zero from kid actions. Parent deductions that would do so are rejected with a clear message.

## Tests (required, same step as the code)
Write Vitest unit tests, or database tests where the logic lives in SQL, for:
- balance equals ledger sum, including after reversals
- rounding of interest, including very small principals
- overspend blocked, and concurrent buys cannot overdraw
- interest accrues once per week and a re-run adds nothing
- repayment reduces owed and closes the loan at zero
- a kid cannot insert into the ledger

## Do not
- Use floating point or JavaScript number math for money without integer rounding.
- Update or delete ledger rows.
- Compute money in the browser and trust it. The database enforces it.
- Add real-money features; bucks are purely virtual.
