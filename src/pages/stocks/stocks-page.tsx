import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Stock } from '@/entities/stock';

import { StocksControls } from '@/pages/stocks/ui/filter-stocks';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { StocksMarketSummary } from './ui/stocks-market-summary';
import { StocksOverviewListBoundary } from './ui/stocks-overview-list';
import { UserStockLinkedStrategiesModal } from './ui/user-stock-linked-strategies-modal';

export function StocksPage() {
	function handleLinkedStrategyNavigate(modalId: string) {
		modals.close(modalId);
	}

	function openLinkedStrategiesModal(stock: Stock) {
		const modalId = `stock-linked-strategies-${stock.id}`;

		modals.open({
			modalId,
			title: `Привязанные стратегии ${stock.ticker}`,
			size: 'xl',
			centered: true,
			children: (
				<UserStockLinkedStrategiesModal
					stock={stock}
					modalId={modalId}
					onNavigate={handleLinkedStrategyNavigate}
				/>
			),
		});
	}

	return (
		<>
			<PageHeader
				title='Акции'
				description='Динамика инструментов и связанные стратегии'
				rightSection={<DataFreshness />}
			/>

			<Section>
				<StocksMarketSummary />
			</Section>

			<Section header={{ title: 'Список акций' }}>
				<Stack>
					<StocksControls />

					<StocksOverviewListBoundary
						onLinkedStrategiesClick={openLinkedStrategiesModal}
					/>
				</Stack>
			</Section>
		</>
	);
}
