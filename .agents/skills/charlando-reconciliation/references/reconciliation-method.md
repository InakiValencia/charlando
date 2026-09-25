# Reconciliation method

Use this checklist to produce a current, evidence-backed state without modifying external systems.

## Build the inspection set

Include leads whose state or data can affect today's workflow:

- `Invitación enviada`
- `Aceptó invitación`
- `Mensaje enviado`
- `Follow-up enviado`
- `Respondió`
- `En conversación`
- `Reunión agendada`
- `Bloqueado` when the blocker may have changed
- any active row whose `Estado de datos` is not `Completo`
- any lead referenced by a pending `Lotes` row

Closed or discarded rows need inspection only when a current LinkedIn observation contradicts the CRM or the coordinator explicitly includes them.

## Compare four evidence layers

For each lead, compare:

1. current `Leads` state and exact timestamp fields;
2. append-only exact and estimated `Eventos` history;
3. pending or terminal `Lotes` rows;
4. current LinkedIn profile, connection, and conversation state.

Use this precedence:

- an observed current platform state establishes current truth;
- an exact successful event establishes a historical action and its time;
- a durable terminal batch row supports but does not replace the exact event;
- estimated migration history provides context only;
- a free-text note never overrides contradictory structured evidence.

## Discrepancy matrix

| CRM | LinkedIn | Proposal |
|---|---|---|
| Invitation pending | Accepted | Propose acceptance-observed event and `Aceptó invitación` |
| Invitation sent | No invitation evidence | Block contact; prior success is uncertain |
| Responded | No visible reply | Block contact; preserve CRM until manual review |
| Message sent | Message visible | Preserve state; use exact event timing only |
| Message sent | Message not visible | Block contact unless another authoritative view proves success |
| Follow-up sent | Reply visible | Propose response event and disposition |
| Meeting scheduled | Thread confirms meeting | Preserve meeting; clear generic follow-up |
| Closed or discarded | New inbound reply | Propose `Respondió` and classify, without reopening automatically |

Never downgrade a manual state merely because the current UI hides older content. Mark the discrepancy and request review.

## Historical data recovery

For rows marked `Requiere perfil`, verify the direct profile URL, current employer, current role, country, and identity match. For rows marked `Requiere timestamp`, locate exact platform evidence only when available. If exact timing cannot be recovered, leave the row quarantined.

Possible proposed data states:

- `Completo`: identity, profile, role, employer, country, and timing source verified.
- `Requiere perfil`: timing is adequate but identity/profile fields are incomplete.
- `Requiere timestamp`: profile is verified but a time-gated action lacks exact timing.
- `Requiere perfil y timestamp`: both classes remain incomplete.
- `No aplica`: closed, discarded, or blocked record with no active action.

## Capacity calculations

- `exact_invitations_today`: successful exact invitation events from local midnight through `source_as_of`.
- `exact_invitations_rolling_7d`: successful exact invitation events in the preceding rolling 168 hours.
- `exact_inmails_today`: successful exact InMail events from local midnight.
- `ready_backlog`: unique active leads in `Listo para invitación` with `Estado de datos = Completo`.
- Never subtract prepared or pending rows twice. A successful exact event consumes capacity; a merely prepared batch does not.

## Blocking thresholds

Block the contact for ambiguous identity, missing exact timing, uncertain previous send, contradictory current state, or inaccessible required thread. Block the whole run for run ownership mismatch, account warning, CAPTCHA, restriction, widespread CRM divergence, or inability to read the source of truth.
