# Implementation Plan: Create a Trade from a Signal in One Click

Branch: `feature/create-trade-from-signal`
Created: 2026-08-10

## Original Request

**Создание сделки из сигнала в один клик**
В карточке/истории сигнала кнопка «Создать сделку»: предзаполнять инструмент, направление, цену и время сигнала. Пользователь вводит только объём и подтверждает.
Бэкенд не нужен: контракт сигнала и создание сделки уже существуют.

## Settings

- Testing: yes — type/static checks plus manual acceptance of the authenticated UI flow; do not introduce a new test framework because the repository has none.
- Logging: minimal — do not add broad console logging; keep expected mutation errors in the dialog as actionable UI feedback and reserve `console.error` for the existing allowed failure category only.
- Docs: no — the public API, project rules, and user-facing documentation do not change; implementation must emit `WARN [docs]` rather than create a documentation checkpoint.

## Roadmap Linkage

Milestone: "none"
Rationale: No `.ai-factory/ROADMAP.md` is present in the repository.

## Scope and Decisions

- Reuse the generated `useCreateTrade` mutation and the existing `CreateTradeRequest`; do not edit `swagger.yaml`, generated Orval files, or backend code.
- Make the action a `features/trade/create-trade-from-signal` slice because it is used from both live signal cards and the signal-history widget. Consumers import it only through its public `index.ts`.
- Keep `SignalCard` and `SignalsList` query-free presentation components: they receive an optional action-render slot from upper layers and never import the feature directly.
- Support only `buy` and `sell` signals. Hide the action for `hold`, since the current trade UI exposes only Long/Short and a neutral signal must not silently become a trade.
- Build the request from the original signal data: `instrumentId`, `openedAt = occurredAt`, `openPrice = close`, `signal = 1/-1`, entered integer `quantity`, and the current product default `tradeTypeId = 1`. The signal contract has no trade type; this preserves the same stock default as the existing manual-create form while keeping the requested one-field interaction.
- Do not convert the signal timestamp through the browser before submitting: pass its original ISO value so the recorded trade retains the actual signal time.
- On success, rely on the generated mutation's existing invalidation of trades and trade statistics, close the modal, and do not add duplicate cache logic. On failure, keep the modal open and show a concise local error; do not discard the entered quantity.

## Commit Plan

- **Commit 1** (after tasks 1-3): `feat: add create-trade-from-signal flow`
- **Commit 2** (after tasks 4-5): `feat: expose signal trade actions`

## Tasks

### Phase 1: Build the reusable trade-from-signal flow

- [x] Task 1: Add a focused feature model that accepts the trade-relevant subset of a signal and produces a valid `CreateTradeRequest` only for buy/sell directions.
  - Files: create `src/features/trade/create-trade-from-signal/model/trade-from-signal.ts`; create `src/features/trade/create-trade-from-signal/index.ts`.
  - Deliverable: export an explicit signal-draft type and helpers that map buy to `TradeSignal.NUMBER_1`, sell to `TradeSignal.NUMBER_MINUS_1`, preserve `occurredAt` and `close`, enforce an integer quantity of at least 1, set the established stock `tradeTypeId` default, and return no request for `hold` or invalid source data.
  - Logging: no new console logs. Invalid local data is handled by the helper result and the UI state; mutation/API errors remain user-visible at the call site.
  - Dependencies: none.

- [x] Task 2: Implement the modal form and entry action in the feature slice using `@mantine/modals` and the generated `useCreateTrade` hook.
  - Files: create `src/features/trade/create-trade-from-signal/ui/create-trade-from-signal-form.tsx`; create `src/features/trade/create-trade-from-signal/ui/create-trade-from-signal-button.tsx`; create `src/features/trade/create-trade-from-signal/ui/open-create-trade-from-signal-modal.tsx`; update `src/features/trade/create-trade-from-signal/index.ts`.
  - Deliverable: the modal clearly shows read-only instrument/ticker, Long or Short direction, signal close price, and original signal date/time; its only editable control is a required whole-number quantity field. The submit button says "Создать сделку", displays its own pending state, prevents repeat submission, closes only after success, and renders a local accessible error message after a failed mutation. The trigger exposes a compact and an inline/card-appropriate presentation without duplicating mutation code.
  - Logging: no broad logging or client-data logging. Surface expected invalid values and request failures in the form; do not add notification noise for the normal success path.
  - Dependencies: Task 1.

- [x] Task 3: Extend signal presentation contracts so higher layers can place feature actions without breaking FSD import direction or the existing history-opening interaction.
  - Files: update `src/entities/signal/ui/signal-card/signal-card.tsx`; update `src/entities/signal/ui/signals-list/signals-list.tsx`; update `src/entities/signal/ui/signal-card/signal-card.module.css` only if required for the action's stacking/focus layout.
  - Deliverable: add optional render/action props from `SignalsList` to `SignalCard`; render supplied action controls above the card's full-card history click target, preserve the strategy link and keyboard-accessible history behavior, and leave dashboard/landing callers unchanged when no action is supplied. Do not nest interactive elements or let the card overlay intercept the create button.
  - Logging: none; this is presentation-only code.
  - Dependencies: Task 2 defines the public feature button API.

### Phase 2: Connect current signals and historical rows

- [x] Task 4: Expose the action from live signal cards on authenticated screens and from each eligible signal-history row.
  - Files: update `src/pages/signals/ui/signals-overview/signals-overview-list.tsx`; update `src/pages/dashboard/ui/dashboard-signals/dashboard-signals.tsx`; update `src/entities/signal/model/signal.ts`; update `src/widgets/signal-history-table/lib/use-history-table.ts` if type propagation requires it; update `src/widgets/signal-history-table/ui/history-table-view.tsx`; update `src/widgets/signal-history-table/ui/history-table.module.css` only for the added action column.
  - Deliverable: pass the feature action through the optional list slot on the Signals page and authenticated dashboard, but not the public landing-page examples. Enrich `TradeHistory` with the original instrument/ticker and a consistent `direction` field so each history row can open the same feature modal. Add a "Создать сделку" action column for buy/sell rows, update header/empty-state column counts, and omit the action for hold rows.
  - Logging: none. The feature owns mutation feedback; list and table controls remain usable during unrelated refetches.
  - Dependencies: Tasks 1-3.

### Phase 3: Verify behavior and regressions

- [ ] Task 5: Validate the one-click flow against the existing API contract and all affected interaction states.
  - Files: inspect the implementation files from Tasks 1-4; no production-file change is expected unless validation finds a defect.
  - Deliverable: manually verify, while authenticated, that card and history actions prefill the correct instrument, Long/Short direction, close price, and exact signal timestamp; only quantity can be edited; invalid/decimal/zero quantity is rejected; hold exposes no action; cancel changes nothing; success closes the modal and refreshes trades/statistics; a failed request preserves the form and shows local feedback. Confirm the landing examples retain login navigation and that card history/strategy links still work.
  - Logging: verify that no new broad `console` calls were introduced and that expected failures are visible in the dialog.
  - Dependencies: Task 4.

## Verification Command

After implementation changes, run the repository-mandated command from Windows:

```text
cmd.exe /c "npm run check:fix"
```

Resolve only issues caused by this feature; report unrelated pre-existing failures without modifying them.
