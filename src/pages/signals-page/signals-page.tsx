import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import {
	mapStrategyResultResponseToSignals,
	useGetResult,
} from '@/entities/signal';
import {
	SignalsControls,
	useSignalsControls,
} from '@/features/signal/filter-signals';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { HistoryTableBoundary } from '@/widgets/signal-history-table';
import { SignalsListBoundary } from '@/widgets/signals-list';

import { SignalsStatusBarBoundary } from './ui/signals-status-bar';
import { SignalsSummaryBoundary } from './ui/signals-summary';

export function SignalsPage() {
	const { filters } = useSignalsControls();

	const { data: signalsData, isLoading } = useGetResult(undefined, {
		query: {
			staleTime: Infinity,
		},
	});
	const hasSignals = signalsData?.data ? mapStrategyResultResponseToSignals(signalsData.data).length > 0 : false;
	const disabled = isLoading || !hasSignals;

	function openSignalHistoryModal(signal: Signal) {
		modals.open({
			title: `История сигнала: ${signal.asset}`,
			size: 'md',
			children: (
				<HistoryTableBoundary
					tradeCode={signal.tradeCode}
					strategyName={signal.strategy}
				/>
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

			<Stack>
				<Stack gap='xs'>
					<SignalsControls
						disabled={disabled}
						isLoading={isLoading}
					/>

					<SignalsStatusBarBoundary filters={filters} />
				</Stack>

				<SignalsListBoundary
					filters={filters}
					onSignalSelect={openSignalHistoryModal}
				/>
			</Stack>
		</>
	);
}
