import { Stack } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import type { Strategy } from '@/entities/strategy';

import { mockStocks } from '@/entities/stock';
import { mockStrategies } from '@/entities/strategy';
import { StrategyStockBindingList } from '@/features/strategy-stock-binding';

import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHero } from './ui/strategy-hero';
import { StrategyInfoGrid } from './ui/strategy-info-grid';
import { StrategyNotFound } from './ui/strategy-not-found';

export function StrategyPage() {
	const { strategyName } = useParams();

	const strategyFromRoute = useMemo(
		() => mockStrategies.find((strategy) => strategy.id === strategyName),
		[strategyName],
	);

	const [activeOverrides, setActiveOverrides] = useState<Record<string, boolean>>({});
	const [selectedStockIds, setSelectedStockIds] = useState<string[]>([]);

	if (!strategyFromRoute) {
		return <StrategyNotFound />;
	}

	const strategy: Strategy = {
		...strategyFromRoute,
		isActive: activeOverrides[strategyFromRoute.id] ?? strategyFromRoute.isActive,
	};

	const handleActiveChange = (nextIsActive: boolean) => {
		setActiveOverrides((currentOverrides) => ({
			...currentOverrides,
			[strategy.id]: nextIsActive,
		}));
	};

	const handleLinkedStocksChange = (nextStockIds: string[]) => {
		setSelectedStockIds(nextStockIds);

		// TODO: replace with a real strategy-stock binding mutation.
		// eslint-disable-next-line no-console
		console.info('strategy-stock-binding:update', {
			strategyId: strategy.id,
			stockIds: nextStockIds,
		});
	};

	return (
		<>
			<Stack>
				<BackToStrategiesLink />

				<StrategyHero strategy={strategy} onActiveChange={handleActiveChange} />
			</Stack>

			<StrategyInfoGrid />

			<StrategyStockBindingList
				stocks={mockStocks}
				selectedStockIds={selectedStockIds}
				onSelectedStockIdsChange={handleLinkedStocksChange}
			/>
		</>
	);
}
