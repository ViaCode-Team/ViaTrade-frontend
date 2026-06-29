import { modals } from '@mantine/modals';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';

import type { Signal } from '@/entities/signal';

import { SignalsOverview } from '@/pages/signals/ui/signals-overview';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { SignalsSummaryBoundary } from './ui/signals-summary';

const { HistoryTableBoundary } = lazily(() => import('@/widgets/signal-history-table'));

export function SignalsPage() {
	function openSignalHistoryModal(signal: Signal) {
		modals.open({
			title: `История сигнала: ${signal.asset}`,
			size: 'md',
			children: (
				<Suspense fallback={null}>
					<HistoryTableBoundary
						tradeCode={signal.tradeCode}
						strategyName={signal.strategy}
					/>
				</Suspense>
			),
		});
	}

	return (
		<>
			<PageHeader
				title='Сигналы'
				description='Актуальные торговые сигналы по вашим стратегиям'
			/>

			<Section>
				<SignalsSummaryBoundary />
			</Section>

			<SignalsOverview onSignalSelect={openSignalHistoryModal} />
		</>
	);
}
