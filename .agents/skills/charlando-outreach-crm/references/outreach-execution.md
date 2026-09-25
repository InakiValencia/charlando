# Outreach execution checks

## Action matrix

| Type | Required current state | Required evidence | Canonical next state after success |
|---|---|---|---|
| INVITACION | Listo para invitación | Complete data, direct profile, invitation capacity | Invitación enviada |
| INMAIL | Invitación enviada | Exact invitation event + 72h, not accepted, credit/capacity | Mensaje enviado |
| MENSAJE | Aceptó invitación | Exact acceptance observation + 48h Alta or 72h Media | Mensaje enviado |
| FOLLOW_UP | Mensaje enviado | Exact long-message event + 72h, no reply, no previous bump | Follow-up enviado |
| RESPUESTA | Respondió or En conversación | Full current thread and classified disposition | Context-dependent |

When the platform state is newer than CRM, do not send first and reconcile later. Stop and return the observed mismatch so the coordinator can route it through reconciliation.

## Copy integrity

- Invitation note uses `invitacion_nota_v1` from the shared messages reference.
- InMail and first post-acceptance long message use `mensaje_largo_v1`; only InMail uses its subject.
- Short bump uses `follow_up_corto_v1` once.
- Store rendered plain text in `Lotes`; LinkedIn receives that exact text.
- The closing question mark is allowed; the inverted opening question mark is forbidden.
- Never convert the website into Markdown syntax inside LinkedIn.

## Character counting

Count the exact final string after placeholder replacement and before typing. Then compare the typed field with the durable string and platform counter. A note over 300 characters is blocked. Do not abbreviate the name, brand, or template to force it through.

## Exact timestamps

Use ISO 8601 with the observed local offset. A date-only value, relative label without an anchored observation, migrated estimate, or inferred acceptance time is not exact enough for a 48/72-hour gate.

## Idempotency

For each action, check:

1. `Lotes!X:X` for the exact key.
2. `Eventos` for the same lead/action/run and for an equivalent earlier success.
3. The LinkedIn thread or relationship state for visible evidence that the action already happened.

Any disagreement is a blocker. Never resolve uncertainty by sending again.

## Observable success

Accept only a specific platform change: connection request shows pending/sent, message appears in the correct thread with timestamp, or InMail appears in sent/thread history. A click, closed modal, spinner, or toast without persistent evidence is not enough by itself.

## Reply safety

Read the entire relevant thread and classify the disposition. Draft a concise answer to the actual question. Escalate pricing, discounts, legal terms, production commitments, sensitive complaints, opt-outs, and meeting times requiring calendar knowledge. Every reply remains a separate confirmed `RESPUESTA` batch.

## Failure taxonomy

- `precondition_changed`: lead/platform no longer matches the approved row.
- `duplicate_detected`: equivalent action already exists.
- `copy_mismatch`: durable and typed text differ.
- `note_unavailable`: connection flow does not offer a note.
- `character_limit`: rendered invitation exceeds 300.
- `account_warning` or `captcha`: stop the whole batch.
- `external_success_crm_uncertain`: visible send succeeded but durable CRM commit failed; stop the whole batch and require manual review.
- `platform_result_uncertain`: no persistent success evidence; stop and never retry automatically.

Include the exact failure code and human-readable detail in the batch row and handoff.
