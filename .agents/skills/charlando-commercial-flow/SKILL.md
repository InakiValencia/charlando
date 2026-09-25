---
name: charlando-commercial-flow
description: Run or audit Charlando's unified daily commercial workflow across prospect research, LinkedIn outreach, follow-ups, replies, and Google Sheets CRM updates. Use for the scheduled Charlando pipeline or a continuation of an existing Charlando run.
---

# Charlando Commercial Flow

Operate one coordinated pipeline with a global run lock and one source of truth. The scheduled coordinator must delegate reconciliation, prospecting, and outreach/CRM to focused subagents inside the same run. They are not independent workflows or scheduled tasks.

## Required references

- Read [references/agent-protocol.md](references/agent-protocol.md) before delegating or resuming any run.
- Read [references/operating-controls.md](references/operating-controls.md) for every run.
- Read [references/sheet-schema.md](references/sheet-schema.md) before reading or changing the CRM.
- Read [references/messages.md](references/messages.md) before preparing any outreach.

## Source of truth

- Spreadsheet: `https://docs.google.com/spreadsheets/d/12hP3UUycKXr-0aMXUonbxEW-YqVpwIRgIGT6Yp5Y0TY/edit`
- Spreadsheet ID: `12hP3UUycKXr-0aMXUonbxEW-YqVpwIRgIGT6Yp5Y0TY`
- Current state: `Leads` / native table `ProspectosCharlando`
- Append-only event ledger: `Eventos` / native table `EventosCharlando`
- Durable approval and execution queue: `Lotes` / native table `LotesCharlando`
- Global lock and limits: `Control` / native table `ControlCharlando`
- Stable contact key: `ID`

The spreadsheet holds operational state. `memory.md` keeps only concise run summaries and durable decisions; it must not duplicate lead lists, templates, or the state machine.

## Start and locking

1. Read `Control` before doing research or opening LinkedIn.
2. If `Estado del flujo` is `ESPERANDO_CONFIRMACION`, `EN_CURSO`, or `BLOQUEADO`, do not create a new run. Report the existing run ID and pending action, then stop.
3. Never clear another run's lock automatically. If a lock is older than 36 hours, set or preserve `BLOQUEADO` and request review.
4. To start, write a unique `ID de corrida`, exact `Inicio de corrida`, and `Estado del flujo = EN_CURSO` in one bounded update, then re-read the row.
5. Before asking for confirmation, set `Estado del flujo = ESPERANDO_CONFIRMACION` and record the batch type and counts. Resume only the same run ID.
6. On verified completion, set `Estado del flujo = LISTO`, clear the active run and pending batch fields, and record exact completion time. On an unrecoverable problem, set `BLOQUEADO` with a concise reason.

## Delegation architecture

The coordinator is the only scheduled agent. It must create focused, ephemeral subagents inside the active run and wait for each required handoff before advancing.

1. Delegate reconciliation to an agent instructed to use `$charlando-reconciliation`. Supply the exact run ID, source-of-truth spreadsheet, current Control snapshot, and a requirement to return `charlando-agent-handoff/v1`.
2. Validate the handoff against `agent-protocol.md`. If blocked, stop. If malformed, request one correction from the same agent; a second failure blocks the run.
3. Compute capacity only from the accepted reconciliation handoff plus exact CRM events.
4. When capacity is positive, delegate research to a new agent instructed to use `$charlando-prospecting`. Supply the run ID, exact remaining company/contact capacity, existing stable IDs and URLs needed for deduplication, and the accepted reconciliation counts. Wait for and validate its handoff.
5. Delegate preparation to one agent instructed to use `$charlando-outreach-crm` in `outreach_prepare` mode. Supply both accepted handoffs, exact capacity, canonical message reference, and the run ID. This agent is the sole writer to `Leads`, `Eventos`, and `Lotes`.
6. Re-read every prepared `Lotes` row. Write pending batch IDs and stage to `Control`, then request action-time confirmation in the coordinator thread.
7. After confirmation, re-read `Control` and `Lotes`. Delegate `outreach_execute` to a single `$charlando-outreach-crm` agent using only confirmed durable batch IDs. A fresh operator agent is allowed because `Lotes` is the source of truth; never rely on the previous agent's memory.
8. Wait for the execution handoff, verify all affected tables, and close the run. Interrupt or discard idle specialist threads after their accepted handoff; never leave a specialist doing background work after stage completion.

Reconciliation and prospecting are read-only. Do not run them concurrently because prospecting capacity depends on reconciliation. Never create more than one outreach/CRM agent for a stage and never allow two agents to write the spreadsheet or operate LinkedIn at the same time.

## Daily run order

1. Have the reconciliation specialist inspect existing records before discovering new ones:
   - inspect replies, acceptances, pending invitations, messages, and due actions;
   - classify replies using `Disposición`;
   - preserve manual changes;
   - never repeat an action present in an exact `Eventos` record or the current state.
2. Apply the data-quality gate:
   - no new outbound action unless `Estado de datos = Completo`, `Verificación` is `Alta` or `Media`, and current role, employer, direct LinkedIn URL, and timing source are verified;
   - inherited records marked `Requiere perfil`, `Requiere timestamp`, or both must be reconciled before outreach;
   - inbound replies may be drafted, but the thread and identity must be verified before sending.
3. Check capacity from `Control` and recent exact events:
   - respect daily and rolling-seven-day invitation limits;
   - respect the daily InMail cap;
   - if the ready backlog is at or above its maximum, skip new research;
   - otherwise research only enough companies to refill available backlog capacity, up to 20 companies and two eligible people per company.
4. New research is limited to Argentina and Spain. Existing Australia records are legacy reconciliation only; do not add new Australian prospects or restart outbound campaigns without explicit user instruction.
5. Verify every new contact's current employer, role, country, direct LinkedIn URL, and brand fit. Exclude all C-level roles, founders, owners, general management, junior profiles, agencies, and external consultants without exception.
6. Pass verified unique contacts to the outreach/CRM specialist. Only that agent adds them to `Leads`, using the schema reference and deduplicating again immediately before writing.
7. Have the outreach/CRM specialist prepare invitation, InMail, post-acceptance, follow-up, and reply batches separately in `Lotes`. Present final text, recipients, counts, and credit use when relevant. Request one action-time confirmation per batch type.
8. After confirmation, re-read `Control`, the target lead rows, and recent exact events. Send only if the run ID still owns the lock and the action remains due.
9. Record every attempted or observed external event, including failures and blocks, with an exact timestamp and run ID. Update `Leads` immediately and re-read both records.
10. Finish with a reconciliation pass, release the lock, and report researched, prepared, sent, failed, blocked, replied, and deferred counts.

## Reliability and account protection

- Scheduled runs may execute every day, but new invitations and proactive follow-ups are prepared only Monday through Friday. Weekend runs reconcile inbound activity and outstanding state.
- The LinkedIn invitation-note limit for this workflow is 300 characters. The canonical invitation copy is fixed by the user: do not shorten, rewrite, replace, or omit it. Verify the rendered count before each send and block the action only if the final copy exceeds 300 characters or LinkedIn will not accept it.
- Stop immediately on an invitation limit, unusual volume warning, CAPTCHA, account restriction, or inconsistent UI state. Do not bypass it.
- Do not invent emails or search for personal data to bypass LinkedIn's email requirement. Mark the contact `Bloqueado` and replace it in future research.
- Retry a transient UI failure once only when success has not been observed. Never retry a verified success.
- Never withdraw invitations automatically.

## Completion criteria

A run is complete only when all required specialist handoffs were accepted, no specialist remains active, the lock is released, `Leads`, exact `Eventos`, and `Lotes` agree, all authorized actions were verified, unresolved data is quarantined, and the user receives a concise summary. A run waiting for confirmation is not complete and blocks the next scheduled run.
