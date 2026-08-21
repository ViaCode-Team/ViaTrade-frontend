# Implementation Plan: Reminder delivery status and creation flow

Branch: main (planning only; no branch switch performed because the worktree contains user changes)
Created: 2026-08-15

## Original Request

Поменял апи, сделай чтобы всё работало как надо. В напоминаниях сделай badge что он уже напоминание уже дошло, тем которые уже дошли. Сделай также segment контрол в котором будет Все ну и там сам разберись как называть остальные лакончино сделай. И сделай по умолчанию выбранным те которые ещё не дошли. 

Также поправь баги или логические ошибки если они будут связаные с напоминаниями, также при создании напоминания сдвигай её по времени на 1 час вперёд и сразу дай возможность пользователю написать сообщение.

Сделай сначало план подробный и качесвенный

## Settings

- Testing: no automated tests (the repository has no configured test runner); use the focused acceptance cases in Task 6.
- Logging: standard. Do not add client-side logging of reminder text or other user data; retain existing local mutation and boundary error handling.
- Docs: no. The change does not alter a documented user-facing workflow outside the application UI.

## Scope and decisions

- Treat the current edits to `swagger.yaml` and generated reminder types as user-owned input; do not roll them back or hand-edit generated endpoint clients.
- The status control uses the API values and concise Russian labels: `Все`, `Не доставлены`, `Доставлены`. Its default is `undelivered`, so it is selected on every reminders list unless the user explicitly changes it.
- A delivered reminder is identified only by a non-empty `deliveredAt` returned by the API. Its card shows the `Доставлено` badge; the exact delivery timestamp is not invented when the backend did not return one.
- Creating a reminder becomes a form-based action on both entry points. The user enters non-empty text before creation; the scheduled time is calculated as the current instant plus one hour, with seconds and milliseconds cleared.
- Keep reminder-specific UI in the existing reminder feature/page boundaries. The creation dialog is used by both the reminders page and stock page, so it becomes a reusable `features/remind` interaction instead of creating a cross-page import.

## Tasks

### Phase 1: Reconcile the API contract and reminder view model

- [x] Task 1: Synchronize the OpenAPI-generated artifacts from the user-updated `swagger.yaml` during implementation, then verify that `ReminderDeliveryStatus`, `deliveryStatus` request parameters, and optional `ReminderResponse.deliveredAt` are generated consistently. Update `src/entities/reminder/model/remind.ts` so `RemindItem` preserves delivery state (preferably the optional timestamp) when mapping an API response. Update exports in `src/entities/reminder/index.ts` only if the new model field/helper is consumed outside the entity. Do not restore the removed `userId` field or modify generated files by hand.  
  Files: `swagger.yaml` (input only), `src/shared/api/types/gen/*` (generator output), `src/entities/reminder/model/remind.ts`, `src/entities/reminder/index.ts` if needed.  
  Logging: no new logs; never expose reminder text or delivery metadata through `console` output.  
  Dependency notes: establishes the typed contract for Tasks 2 and 3.

### Phase 2: Apply delivery filtering through the URL and API

- [x] Task 2: Extend the reminder URL-filter schema with a typed delivery-status field whose fallback is `undelivered`. Pass it together with paging and sorting from `useRemindList` to both `getReminders` and `getInstrumentReminders`; changing the status must reset `page` to `1`. Add a Mantine `SegmentedControl` to `RemindsControls` with `Все` (`all`), `Не доставлены` (`undelivered`), and `Доставлены` (`delivered`). Preserve search and sorting while a filtered query refetches, and make the control applicable to both the global reminders page and a stock's reminders block.  
  Files: `src/entities/reminder/model/filters.ts`, `src/features/remind/filter-reminds/ui/reminds-controls.tsx`, `src/features/remind/manage-reminds/lib/use-remind-list.ts`.  
  Logging: no new logs; network failures continue through the existing query boundary rather than being swallowed.  
  Dependency notes: depends on Task 1. The API filter, rather than only client-side filtering, must be used before pagination.

- [x] Task 3: Correct the empty-state semantics once delivery status is server-filtered: a blank result for a non-default status must be presented as a resettable “no results” state, not as proof that the user has no reminders at all. Expose the minimum filter-state flag from `useRemindList` and consume it in the global and stock list containers without changing dashboard behaviour. Retain the existing safe `404 -> empty instrument reminders` handling, since switching it to a plain generated hook would remove an established recovery path.  
  Files: `src/features/remind/manage-reminds/lib/use-remind-list.ts`, `src/pages/reminds/ui/reminds-overview/reminds-overview-list.tsx`, `src/pages/stock/ui/stock-reminds/stock-reminds-list.tsx`.  
  Logging: no new logs; unexpected request failures still reach `withQueryBoundary`.  
  Dependency notes: depends on Task 2.

### Phase 3: Mark delivered reminders in the list UI

- [x] Task 4: Render a compact, accessible `Доставлено` badge in `RemindCard` only when its mapped reminder has `deliveredAt`. Keep the source-instrument badge and existing edit/delete affordances intact, and avoid displaying a delivery time when the API response has none or an invalid value. Adjust the card CSS only if the two badges need spacing or wrapping support.  
  Files: `src/entities/reminder/ui/remind-card/remind-card.tsx`, `src/entities/reminder/ui/remind-card/remind-card.module.css` if required, `src/entities/reminder/model/remind.ts`.  
  Logging: no new logs; the UI renders the API state as received.  
  Dependency notes: depends on Task 1.

### Phase 4: Replace placeholder creation with an immediate-message form

- [x] Task 5: Extract the shared create-reminder interaction from `pages/reminds/ui/add-remind/` into a public `features/remind/create-remind/` slice, because both the global reminders page and stock page use it. The dialog/form must: select an instrument when opened from the global page; accept a preselected instrument when opened from a stock; autofocus a required message field; enforce the existing 1000-character limit; show mutation progress on only the submit action; and close only after a successful creation. Replace the stock-page instant creation button with the same dialog, so it no longer creates a remote placeholder before the user can type.  
  Files: create `src/features/remind/create-remind/ui/*`, `src/features/remind/create-remind/lib/*`, `src/features/remind/create-remind/index.ts`; update `src/pages/reminds/ui/reminds-overview/reminds-overview.tsx`, `src/pages/stock/ui/stock-reminds/stock-reminds.tsx`; remove or migrate `src/pages/reminds/ui/add-remind/*`; update `src/features/remind/manage-reminds/lib/use-create-remind.ts` and `src/features/remind/manage-reminds/lib/remind-date-time.ts`.  
  Logging: no new logs; do not log typed messages, selected instruments, or scheduled timestamps. Expected validation remains in the form and mutation errors remain local.  
  Dependency notes: independent of Tasks 2–4, but must consume the API model validated in Task 1.

- [x] Task 6: Make the creation and cache flow status-aware and deterministic. Change the create hook to receive the user-entered text, calculate `remindAt` exactly one hour ahead, and use generated mutation invalidation to refresh every active global/instrument list and summary. Remove the current manual cache insertion, which incorrectly inserts a newly undelivered reminder into cached `Доставлены` pages and can corrupt their totals. Verify that polling moves a delivered reminder out of the default `Не доставлены` view and that the API-filtered `Доставлены` view obtains it after refetch.  
  Files: `src/features/remind/manage-reminds/lib/use-create-remind.ts`, `src/features/remind/manage-reminds/lib/remind-date-time.ts`, new creation-feature files from Task 5, and `orval.invalidation.ts` only if generated invalidation needs a narrowly scoped correction.  
  Logging: no new logs; rely on generated mutation/query invalidation and existing error UI.  
  Dependency notes: depends on Tasks 1, 2, and 5.

### Phase 5: Generated-client and regression verification

- [ ] Task 7: Regenerate API clients from `swagger.yaml` and inspect the resulting diff to ensure no user API changes were lost. Run the mandatory repository check with `cmd.exe /c "npm run check:fix"`. Then perform the following focused acceptance checks against a running backend: default global and stock lists request/display only `undelivered`; each segment sends the matching `deliveryStatus` and resets pagination; delivered API records show `Доставлено`; an empty delivered filter can reset to the default; both add entry points autofocus the message field and create a reminder one hour ahead; and creation never appears in a delivered cached list. Report any backend behaviour that contradicts the supplied OpenAPI contract instead of masking it in the client.  
  Files: generated API artifacts as produced by Orval; no production-code changes expected solely from this task.  
  Logging: capture only command output and non-sensitive API contract mismatches; do not include reminder text in diagnostics.  
  Dependency notes: depends on Tasks 1–6.

## Commit Plan

- **Commit 1** (after Tasks 1–4): `feat(reminders): add delivery status filtering and badge`
- **Commit 2** (after Tasks 5–7): `feat(reminders): improve reminder creation flow`

## Acceptance criteria

- The default selected segment is `Не доставлены`, and the corresponding query includes `deliveryStatus=undelivered`.
- `Все` and `Доставлены` are concise alternatives, URL-backed, reset pagination, and work on both global and instrument-specific lists.
- Only reminder records with `deliveredAt` receive the `Доставлено` badge.
- A new reminder cannot be submitted without a message; the message field receives focus when the creation dialog opens.
- A newly created reminder is scheduled one hour ahead and updates active lists without contaminating delivered-result cache entries.
- Existing user edits to the OpenAPI contract remain intact, and `cmd.exe /c "npm run check:fix"` completes successfully after implementation.
