# CRM schema and canonical state machine

Read this reference before using the Charlando spreadsheet.

## `Leads`

Maintain these columns in order:

| Column | Field |
|---|---|
| A | País |
| B | Marca |
| C | Nombre |
| D | Cargo actual |
| E | Área |
| F | Segmento |
| G | LinkedIn |
| H | Prioridad |
| I | Verificación |
| J | Estado |
| K | Última acción |
| L | Fecha última acción |
| M | Elegible |
| N | Fecha agregado |
| O | Sitio empresa |
| P | Notas |
| Q | ID |
| R | Conversación / último mensaje |
| S | Próxima acción |
| T | Fecha próxima acción |
| U | Fecha/hora última acción |
| V | Fecha/hora próxima acción |
| W | Disposición |
| X | Estado de datos |

`ProspectosCharlando` must cover exactly the used rows and A:X.

### Canonical states

Use only:

1. `Pendiente de revisión`
2. `Listo para invitación`
3. `Invitación enviada`
4. `Aceptó invitación`
5. `Mensaje enviado`
6. `Follow-up enviado`
7. `Respondió`
8. `En conversación`
9. `Reunión agendada`
10. `Cerrado`
11. `Bloqueado`
12. `Descartado`

Channel and template belong in `Última acción` and `Eventos`, not in `Estado`. Therefore InMail and long-message states map to `Mensaje enviado`; a pending invitation remains `Invitación enviada`.

### Data quality

Allowed `Estado de datos` values:

- `Completo`
- `Requiere perfil`
- `Requiere timestamp`
- `Requiere perfil y timestamp`
- `No aplica`

Outbound actions require `Completo`. A current employer, eligible role, direct LinkedIn URL, `Verificación = Alta|Media`, and an exact timing source are mandatory. Historical date-only records are not exact timestamps.

### Conversation disposition

Allowed `Disposición` values:

- `Sin respuesta`
- `Pidió información`
- `Interesado`
- `Derivó contacto`
- `Reunión propuesta`
- `Reunión agendada`
- `No interesado`
- `No ahora`
- `Fuera de oficina`
- `Revisar conversación`
- `No aplica`

Do not treat every reply as the same outcome. `Disposición` determines the next action and whether the contact should be closed, continued, or moved to a meeting.

### New records

- Estado: `Listo para invitación`
- Elegible: `Sí`
- Verificación: `Alta` or `Media`
- Estado de datos: `Completo`
- Disposición: `Sin respuesta`
- Fecha agregado: current date
- Conversación: `Sin conversación iniciada.`
- Próxima acción: `Enviar invitación con nota`
- Fecha/hora próxima acción: exact current timestamp
- Fecha próxima acción: date derived from that timestamp
- Last-action fields: blank

### Transitions and timing

- Invitation sent: `Estado = Invitación enviada`; next action `Revisar aceptación o preparar InMail`; exact due timestamp = send timestamp + 72 hours.
- Acceptance observed: record an exact acceptance-observed timestamp. `Estado = Aceptó invitación`; next action `Enviar mensaje`; due after 48 hours for Alta or 72 hours for Media.
- Long message or InMail sent: `Estado = Mensaje enviado`; next action `Revisar respuesta / follow-up`; due after 72 hours.
- Short bump sent: `Estado = Follow-up enviado`; next action `Esperar respuesta`; no next timestamp.
- Reply observed: `Estado = Respondió`; classify `Disposición` and set a specific next action. Do not default meeting, rejection, and information requests to the same action.
- Meeting scheduled: `Estado = Reunión agendada`; store meeting context in conversation and clear generic follow-up dates.
- Closed, discarded, or blocked: clear next timestamps unless a specific manual review is required.

Maintain both human-readable date columns L/T and exact timestamp columns U/V. Exact timing decisions use U/V and exact `Eventos` only.

## `Eventos`

Use an append-only ledger:

| Column | Field |
|---|---|
| A | Fecha y hora |
| B | ID |
| C | País |
| D | Marca |
| E | Nombre |
| F | Acción |
| G | Canal |
| H | Plantilla |
| I | Resultado |
| J | Detalle |
| K | Evidencia / URL |
| L | Precisión temporal |
| M | ID de corrida |

`Precisión temporal` is `Exacta` for observed real-time events and `Fecha estimada` for migrated history. Estimated events provide context but never authorize a 48/72-hour action.

Use specific actions such as `Invitación con nota enviada`, `Invitación aceptada`, `InMail enviado`, `Mensaje post-aceptación enviado`, `Follow-up enviado`, `Respuesta recibida`, `Bloqueo observado`, or `Contacto descartado`. Before sending, search exact events for the same ID and action.

## `Control`

`ControlCharlando` has one data row with:

| Column | Field |
|---|---|
| A | Estado del flujo |
| B | ID de corrida |
| C | Inicio de corrida |
| D | Esperando confirmación |
| E | Tipo de lote pendiente |
| F | Última corrida completada |
| G | Máx. invitaciones por día |
| H | Máx. invitaciones en 7 días |
| I | Máx. InMails por día |
| J | Máx. backlog listo |
| K | Versión |
| L | Notas / bloqueo |
| M | IDs de lote pendientes |
| N | Etapa activa |
| O | Último agente aceptado |
| P | Fecha/hora último handoff |

Allowed flow states: `LISTO`, `EN_CURSO`, `ESPERANDO_CONFIRMACION`, `BLOQUEADO`.

Default limits are 15 invitations per day, 60 exact invitation events in the previous seven days, 5 InMails per day, and 40 contacts ready for invitation. Treat these as hard caps unless the user explicitly changes them.

Allowed active stages are `INICIO`, `RECONCILIACION`, `PROSPECCION`, `PREPARACION`, `ESPERANDO_CONFIRMACION`, `EJECUCION`, `CIERRE`, or blank while `LISTO`. `Último agente aceptado` is one of `reconciliation`, `prospecting`, `outreach_crm`, or blank. Batch IDs are comma-separated only for display; execution resolves exact rows from `Lotes`.

## `Lotes`

Use a durable action queue with one row per proposed external action:

| Column | Field |
|---|---|
| A | Batch ID |
| B | ID de corrida |
| C | Fecha/hora creado |
| D | Tipo de lote |
| E | ID de lead |
| F | País |
| G | Marca |
| H | Nombre |
| I | LinkedIn |
| J | Estado previo |
| K | Acción propuesta |
| L | Plantilla |
| M | Asunto |
| N | Mensaje final |
| O | Caracteres |
| P | Créditos |
| Q | Fecha/hora vencimiento |
| R | Aprobación |
| S | Ejecución |
| T | Fecha/hora ejecutado |
| U | Resultado |
| V | Evidencia / URL |
| W | Detalle |
| X | Clave de idempotencia |

`LotesCharlando` covers exactly the used rows and A:X.

Allowed `Tipo de lote`: `INVITACION`, `INMAIL`, `MENSAJE`, `FOLLOW_UP`, `RESPUESTA`.

Allowed `Aprobación`: `PENDIENTE`, `APROBADO`, `RECHAZADO`, `EXPIRADO`.

Allowed `Ejecución`: `PREPARADO`, `ENVIADO`, `FALLIDO`, `BLOQUEADO`, `OMITIDO`.

Preparation writes `PENDIENTE` plus `PREPARADO`. After the coordinator receives the user's decision, the outreach/CRM specialist changes only the targeted batch IDs to `APROBADO`; rejection writes `RECHAZADO` and `OMITIDO`. Execution never reads recipient or copy from chat memory: it reads the durable row, revalidates it, and records the terminal execution state. Preserve rows permanently for audit; never reuse a batch ID or idempotency key.

## Safe write procedure

1. Read metadata, table bounds, `Control`, `Lotes`, and target rows.
2. Resolve leads by stable ID, never remembered row number.
3. Acquire and verify the global lock before mutation.
4. Use bounded `updateCells`; extend tables only when required.
5. Append a specific event before considering an external action complete.
6. Re-read every changed lead, event, and control cell.
