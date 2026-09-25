# Operating controls

These controls prevent overlapping runs, uncontrolled backlog, and LinkedIn account risk.

## Run ownership

- A run owns the workflow only when its exact run ID is present in `Control` and `Estado del flujo = EN_CURSO|ESPERANDO_CONFIRMACION`.
- A scheduled trigger that finds another active run exits without research, Sheet mutation, or LinkedIn activity.
- A lock older than 36 hours becomes a manual-review blocker; do not auto-release it.
- Waiting for confirmation keeps the lock. The next scheduled trigger does not create a parallel batch.
- The coordinator owns `Control`. Read-only specialists never write it. The outreach/CRM specialist writes only `Leads`, `Eventos`, and `Lotes`.
- Record the current stage, last accepted producer, and handoff time in `Control`. A stage cannot advance without a valid `charlando-agent-handoff/v1` envelope for the same run ID.

## Capacity defaults

- 15 invitations per calendar day.
- 60 invitation events in the rolling previous seven days.
- 5 InMails per calendar day, subject to available credits and a confirmed batch.
- 40 contacts maximum in `Listo para invitación` backlog.
- New proactive outreach Monday through Friday only. Daily weekend runs reconcile and report inbound or blocked items.

Count only exact successful events. If event history is estimated, reconcile the UI before calculating capacity.

## Research capacity

- The business target is up to 20 companies per research day and two eligible people per company.
- Do not add 40 contacts mechanically when the ready backlog is full or a previous run is waiting for confirmation.
- Research only enough verified contacts to restore available capacity. Explain when the result is below the target.

## Batch confirmation

Prepare separate batches for invitations, InMails, post-acceptance messages/follow-ups, and replies. Each batch displays recipients and final text. InMail batches also display subject and credits.

After confirmation, re-check the lock, current state, exact event history, final character count, and platform warnings immediately before sending.

Persist every proposed action in `Lotes` before requesting confirmation. A chat summary is not an executable batch. The coordinator presents the durable batch and passes the user's explicit confirmed/rejected batch IDs plus timestamp to the outreach/CRM specialist. As sole `Lotes` writer, that specialist records `APROBADO` or `RECHAZADO`, re-reads the rows, and executes only rows whose run ID, batch ID, approval state, execution state, lead state, and idempotency key all revalidate.

## Stop conditions

Set `BLOQUEADO`, record the reason, and stop on account warnings, CAPTCHA, inconsistent identity, uncertain prior success, missing exact timing for a time-gated action, or mismatched CRM state.
