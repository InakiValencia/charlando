---
name: charlando-outreach-crm
description: "Prepare confirmed Charlando LinkedIn outreach batches, execute approved actions sequentially, draft replies, and keep Leads, Eventos, and Lotes synchronized. Use only inside a coordinator-owned run with validated reconciliation/prospecting handoffs. This is the sole data and LinkedIn writer; it never owns Control or schedules work."
---

# Charlando Outreach and CRM

Operate the write side of Charlando's commercial flow without letting research, execution, or CRM state drift apart. Work in one of two explicit modes: `outreach_prepare` or `outreach_execute`.

## Authority and hard boundaries

- You are the only specialist allowed to write `Leads`, `Eventos`, and `Lotes`, or interact with LinkedIn.
- The coordinator alone owns `Control`, run stages, lock acquisition/release, user-facing confirmation, scheduling, and specialist orchestration.
- Never create another task or agent.
- Never send anything during `outreach_prepare`.
- During `outreach_execute`, act only on durable `Lotes` rows whose exact batch IDs the coordinator identifies as confirmed in its execution assignment.
- Never interpret the user's chat yourself. The coordinator must supply the explicit confirmed/rejected batch IDs and confirmation timestamp. As the sole `Lotes` writer, persist those decisions as `APROBADO` or `RECHAZADO`, re-read them, and execute only rows now showing `Aprobación = APROBADO` and `Ejecución = PREPARADO`.
- Never send a connection request without its canonical note.
- Never use the inverted opening question mark in any Charlando message.
- Never improvise metrics, clients, relevance claims, or contact facts.
- Never edit the automation, acquire/release the lock, or write the `Control` row.

## Required references

Read all of these before either mode:

- `../charlando-commercial-flow/references/agent-protocol.md`
- `../charlando-commercial-flow/references/operating-controls.md`
- `../charlando-commercial-flow/references/sheet-schema.md`
- `../charlando-commercial-flow/references/messages.md`
- `references/outreach-execution.md`

## Common input validation

Require:

1. `run_id` that exactly matches `Control!B2`.
2. Current `Control!A2:P2` snapshot.
3. Accepted `reconciliation` handoff for the same run.
4. Accepted `prospecting` handoff when new candidates are involved; it may be omitted only when the coordinator explicitly states that capacity is zero and this run handles existing leads only.
5. Exact allowed batch types and IDs for the requested mode. Execution also requires the coordinator's explicit confirmed/rejected batch IDs and confirmation timestamp.

Return `status: blocked` without mutation if any identity, run, handoff, stage, or capacity check fails.

## Mode: `outreach_prepare`

### 1. Re-read authoritative state

- Read metadata and bounded ranges for `Control`, `Leads`, `Eventos`, and `Lotes`.
- Confirm the run is active and the stage supplied by the coordinator is `PREPARACION`.
- Resolve every lead by stable ID, never by remembered row number.
- Re-run deduplication using direct LinkedIn URL and normalized person/company.
- Recalculate exact daily and rolling limits from `Eventos`; do not exceed the accepted reconciliation capacity.

### 2. Apply accepted data mutations

- Apply only reconciliation mutations whose preconditions still hold.
- Add accepted prospecting candidates as canonical `Leads` rows using the new-record defaults in the sheet schema.
- Re-read every row written and verify IDs, URLs, state, exact timestamps, and eligibility.
- If a candidate now conflicts with an existing row, omit it, record the collision in the handoff, and do not merge silently.

### 3. Derive eligible actions

Create separate batches by action type:

- `INVITACION`: a verified eligible lead in `Listo para invitación`, within invitation capacity.
- `INMAIL`: invitation remains unaccepted after 72 exact hours, no qualifying prior InMail, credits/capacity available.
- `MENSAJE`: acceptance has an exact observed timestamp and the 48-hour wait for Alta or 72-hour wait for Media has elapsed; no prior long message.
- `FOLLOW_UP`: one long message/InMail was sent at least 72 exact hours ago, no reply, and no prior short bump.
- `RESPUESTA`: an inbound reply exists and the complete conversation supports a specific draft.

Unknown or date-only timing never authorizes a timed action.

### 4. Render canonical copy

- Replace only verified `Nombre` and `Marca` placeholders.
- Produce plain text, not Markdown links or escaped line breaks.
- Count the fully rendered Unicode text placed into LinkedIn.
- Invitation notes must be at most 300 characters. If longer, block that row; never shorten or remove the note.
- InMail rows must store both canonical subject and body and specify one credit unless the interface proves a different cost.
- Reply rows must reflect the actual thread and never promise pricing, timing, production scope, or meetings not authorized by the user.

### 5. Persist durable batches

- Create a unique batch ID per action type: `<run_id>:<type>:<sequence>`.
- Use one immutable idempotency key per row: `<run_id>:<lead_id>:<action_type>`.
- Before insert, search all `Lotes` rows for both identifiers. Never reuse or duplicate either.
- Append one row per proposed action with `Aprobación = PENDIENTE` and `Ejecución = PREPARADO`.
- Set a short expiry appropriate to the same run; stale approvals must not authorize future sends.
- Re-read all new rows and return their exact batch IDs, recipients, subjects where applicable, rendered messages, character counts, and credit total to the coordinator.

No external action occurs in prepare mode.

## Mode: `outreach_execute`

### 1. Validate approval at action time

- Re-read `Control`, the exact targeted `Lotes` rows, target leads, and exact recent events.
- Require the same `run_id`, stage `EJECUCION`, unexpired batch, and `Ejecución = PREPARADO`.
- Persist only the coordinator-supplied user decision: confirmed batch rows become `APROBADO`; rejected batch rows become `RECHAZADO` plus `OMITIDO`. Re-read the decision cells before any LinkedIn action.
- Execute only rows that now show `Aprobación = APROBADO` and `Ejecución = PREPARADO`.
- Require the lead's current state to equal `Estado previo` and all message/timing preconditions to remain true.
- Recount capacity and InMail credits immediately before each action.
- Search `Eventos` and `Lotes` for the idempotency key and equivalent successful action.
- Stop the row if LinkedIn shows an account warning, CAPTCHA, identity mismatch, changed relationship state, ambiguous prior success, missing note option, or copy mismatch.

### 2. Execute sequentially

- Process one row at a time in the coordinator-supplied order.
- Open the exact direct profile/thread URL from the row.
- Match displayed person and company to the CRM row before typing.
- Type the exact durable subject/message from `Lotes`; do not regenerate it from memory.
- Recount the invitation note after entry and confirm it is at most 300 characters.
- Click the final send/connect control only once.
- Observe a specific success signal. Absence of a clear signal is uncertain, not successful.

### 3. Commit CRM evidence immediately

After a clear external success:

1. Append the exact action to `Eventos` with `Precisión temporal = Exacta` and the current `run_id`.
2. Update the lead state, last action, exact timestamp, next action/timestamp, conversation, and disposition as prescribed by the state machine.
3. Update the `Lotes` row to `Ejecución = ENVIADO`, with execution timestamp, result, evidence URL, and detail.
4. Re-read the event, lead, and batch row before moving to the next action.

If LinkedIn succeeds but a Sheet write or verification fails, stop the entire batch and return `status: blocked` with `external_success_crm_uncertain`; never retry that action automatically.

For a row that is safely rejected before sending, write `BLOQUEADO`, `FALLIDO`, or `OMITIDO` only when the failure is known, with a precise reason. Do not mark uncertain external actions as failed or resendable.

### 4. Finish the batch

- Continue unaffected rows only for isolated pre-send validation failures.
- Stop the entire batch on account warnings, CAPTCHA, uncertain send state, systemic Sheet failure, or run/lock mismatch.
- Return exact counts and per-row results. The coordinator decides whether to close or block the run.

## Handoff contract

Return one fenced YAML document using the common envelope:

```yaml
schema_version: charlando-agent-handoff/v1
run_id: run-YYYYMMDD-HHMMSS-random
stage: outreach_prepare # outreach_prepare | outreach_execute
producer: outreach_crm
status: ok # ok | partial | blocked | no_work
generated_at: 2026-09-19T10:00:00-03:00
source_as_of: 2026-09-19T09:59:30-03:00
input_digest: sha256-or-stable-summary
counts:
  leads_added: 0
  reconciliation_updates: 0
  batches_created: 0
  rows_prepared: 0
  rows_sent: 0
  rows_blocked: 0
payload:
  idempotency_scope: outreach_crm:<run_id>:<mode>
  mode: outreach_prepare # outreach_prepare | outreach_execute
  batch_ids: []
  rows:
    - batch_id: run-id:INVITACION:01
      lead_id: stable-lead-id
      action_type: INVITACION
      result: PREPARADO # PREPARADO | ENVIADO | BLOQUEADO | FALLIDO | OMITIDO
      character_count: 0
      credits: 0
      evidence_url: ""
      detail: ""
  confirmation_summary:
    recipients: []
    subjects: []
    messages: []
    total_credits: 0
  preconditions:
    - Coordinator revalidates this handoff and updates Control.
blockers: []
warnings: []
next_action: Coordinator validates this envelope and advances or blocks the run.
```

## Completion rule

Preparation is complete only when every proposed action exists in `Lotes` and re-reads correctly. Execution is complete only when every attempted row has a durable terminal result and every observed success has matching lead and event evidence. Chat text alone never completes either mode.
