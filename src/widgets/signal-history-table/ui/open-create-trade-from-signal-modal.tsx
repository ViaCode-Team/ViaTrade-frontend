import { modals } from '@mantine/modals';

import type { TradeFromSignalDraft } from '../model/trade-from-signal';

import { CreateTradeFromSignalForm } from './create-trade-from-signal-form';

export function openCreateTradeFromSignalModal(draft: TradeFromSignalDraft) {
	const modalId = `create-trade-from-signal-${draft.instrumentId}-${draft.occurredAt}`;

	modals.open({
		modalId,
		title: 'Создать сделку из сигнала',
		children: (
			<CreateTradeFromSignalForm
				draft={draft}
				onClose={() => modals.close(modalId)}
			/>
		),
	});
}
