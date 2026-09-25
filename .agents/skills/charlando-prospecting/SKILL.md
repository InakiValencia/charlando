---
name: charlando-prospecting
description: "Find and verify Argentina and Spain B2C company/contact candidates for Charlando inside a coordinator-owned commercial run. Use only after reconciliation has established exact remaining capacity. This is a read-only specialist: it returns a structured handoff and never edits LinkedIn, Google Sheets, Control, Eventos, Leads, or Lotes."
---

# Charlando Prospecting

Produce a compact, verified list of companies and people that exactly fits the capacity remaining in the current Charlando run. Work as a specialist inside the run owned by `$charlando-commercial-flow`.

## Non-negotiable boundaries

- Remain read-only everywhere. Do not send invitations, messages, InMails, emails, connection requests, reactions, or comments.
- Do not edit Google Sheets, LinkedIn, files, automations, or the coordinator's `Control` row.
- Do not acquire or release the run lock.
- Do not create or delegate another task or agent.
- Do not continue if the `run_id` is missing, differs from `Control!B2`, or the accepted reconciliation handoff is missing.
- Do not invent a person, title, company, country, URL, campaign, ad, or fit signal.
- Return fewer candidates when verification is insufficient. A shortage is safer than an unverified lead.

## Required inputs

The coordinator must supply all of the following:

1. `run_id`.
2. Current `Control!A2:P2` snapshot or an equivalent digest.
3. Accepted `reconciliation` handoff for the same `run_id`.
4. Exact remaining capacity: new companies, new contacts, country mix, and maximum invitations.
5. Existing deduplication set with lead IDs, direct LinkedIn URLs, normalized company/person pairs, and companies already counted today.

If any item is absent or inconsistent, return a blocked handoff without prospecting.

## Required references

Read these before starting:

- `../charlando-commercial-flow/references/agent-protocol.md`
- `../charlando-commercial-flow/references/operating-controls.md`
- `../charlando-commercial-flow/references/sheet-schema.md`
- `references/targeting-and-verification.md`

## Procedure

### 1. Validate the assignment

- Confirm `Control!A2` represents an active run, not `LISTO` or `BLOQUEADO`.
- Confirm `Control!B2` equals the supplied `run_id`.
- Confirm the reconciliation handoff has `schema_version: charlando-agent-handoff/v1`, `producer: reconciliation`, `stage: reconciliation`, a status of `ok`, `partial`, or `no_work`, no blockers, and the same `run_id`.
- Copy the exact capacity figures. Never recalculate or expand them silently.
- If contact capacity is zero, return `status: no_work` with an empty `candidates` list and explain that no prospecting was required.

### 2. Build the company pool

- Search only companies operating in Argentina or Spain.
- Prefer an approximately even country mix across the daily total. Follow any explicit missing-country count exactly.
- Require a B2C or strongly consumer-facing offer.
- Prefer brands with observable current social content, paid media, ecommerce, launches, retail presence, or recurring creative demand.
- Exclude agencies, direct Charlando competitors, pure B2B vendors without a consumer audience, dormant brands, and companies already present in the deduplication set.
- Do not count a company until at least one suitable person is verified.

### 3. Find up to two suitable people per company

Use the role ladder and exclusions in `references/targeting-and-verification.md`.

- Prefer two different relevant functions or seniority levels when possible.
- Verify that every person currently works at the company.
- Capture the direct LinkedIn profile URL, not a search-results URL.
- Capture a direct source for the company or fit signal.
- Do not infer employment from an old snippet when the current profile contradicts it.

### 4. Deduplicate before returning

Check every candidate against all supplied sets and against candidates found in this run: exact LinkedIn URL, normalized person/company pair, existing lead ID, spelling variants, and per-company capacity.

If a duplicate is found, discard it and record the reason. Do not substitute an unverified person merely to fill capacity.

### 5. Verify evidence and assign quality

- `verification: high`: current employer/title and direct LinkedIn URL confirmed from the profile or equivalent first-party evidence.
- `verification: medium`: two consistent sources support the current role but one key detail is not visible directly.
- Never return `verification: low`.
- Use `priority: high` only when company fit and role fit are both strong; otherwise use `medium`.

### 6. Stop at the exact capacity

- Maximum 20 newly counted companies in a full daily run.
- Maximum two people per company.
- Maximum 40 new people in a full daily run.
- The coordinator's remaining capacity is always the tighter limit.
- Return the strongest candidates first. Do not create a hidden reserve list unless explicitly requested.

## Handoff contract

Return one fenced YAML document and nothing executable. Use this exact envelope:

```yaml
schema_version: charlando-agent-handoff/v1
run_id: run-YYYYMMDD-HHMMSS-random
stage: prospecting
producer: prospecting
status: ok # ok | partial | blocked | no_work
generated_at: 2026-09-19T10:00:00-03:00
source_as_of: 2026-09-19T09:59:30-03:00
input_digest: sha256-or-stable-summary
counts:
  requested_companies: 0
  requested_contacts: 0
  returned_companies: 0
  returned_contacts: 0
  argentina_contacts: 0
  spain_contacts: 0
payload:
  idempotency_scope: prospecting:<run_id>
  candidates:
    - candidate_id: candidate-normalized-company-normalized-person
      country: Argentina # Argentina | España
      company: Example
      company_url: https://example.com
      company_linkedin_url: https://www.linkedin.com/company/example/
      company_fit_signal: Current factual reason the brand fits Charlando
      person_name: Nombre Apellido
      current_title: Brand Manager
      linkedin_url: https://www.linkedin.com/in/example/
      role_fit: Why this current role can own or influence the decision
      verification: high # high | medium
      priority: high # high | medium
      sources:
        - https://www.linkedin.com/in/example/
      duplicate_checks:
        linkedin_url: clear
        person_company: clear
        within_run: clear
  discarded:
    - candidate: Company or person
      reason: Exact exclusion or verification failure
  shortages:
    - dimension: spain_contacts
      missing: 0
      reason: No verified replacement found
  preconditions:
    - Coordinator revalidates run_id before accepting this handoff.
    - Outreach agent rechecks deduplication immediately before writing.
blockers: []
warnings: []
next_action: Coordinator validates this envelope and advances or blocks the run.
```

## Completion rule

The assignment is complete only when the handoff is internally consistent, candidates do not exceed capacity, every returned person has a direct LinkedIn URL and evidence, and any shortage or uncertainty is explicit.
