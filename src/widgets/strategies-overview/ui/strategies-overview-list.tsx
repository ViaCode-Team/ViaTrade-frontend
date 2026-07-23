import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Strategy } from '@/entities/strategy';

import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { strategyFiltersSchema } from '../lib/filters';
import { useFilteredStrategies } from '../lib/use-filtered-strategies';
import { getStrategiesRequestParams, useStrategiesData } from '../lib/use-strategies-data';
import { StrategyStockBindingModalBoundary } from './strategy-stock-binding-modal';

function openModal(strategy: Strategy) {
	modals.open({
		title: `Привязать акции к ${strategy.name}`,
		size: 'xl',
		children: <StrategyStockBindingModalBoundary strategyId={strategy.id} />,
	});
}

function StrategiesOverviewList() {
	const { filters, setFilter } = useUrlFilters(strategyFiltersSchema);
	const { strategies, totalPages, totalCount } = useStrategiesData(getStrategiesRequestParams({
		page: Math.max(Number(filters.page) || 1, 1),
		sortOption: filters.listSort,
		statusFilter: filters.statusFilter,
	}));
	const filteredStrategies = useFilteredStrategies(strategies);

	return (
		<DataState
			hasData={!!totalCount}
			hasResults={!!filteredStrategies.length}
		>
			<StrategiesList
				strategies={filteredStrategies}
				actionSlot={(strategy) => (
					<StrategyToggleCheckbox
						strategyId={strategy.id}
						isActive={strategy.isActive}
					/>
				)}
				bottomActionSlot={(strategy) => (
					<Button
						mt='auto'
						variant='default'
						style={{ position: 'relative', zIndex: 2 }}
						onClick={() => openModal(strategy)}
					>
						Связать с акцией
					</Button>
				)}
				pagination={{
					page: Number(filters.page) || 1,
					totalPages,
					onPageChange: (page) => setFilter('page', String(page)),
				}}
			/>
		</DataState>
	);
}

export const StrategiesOverviewListBoundary = withQueryBoundary(StrategiesOverviewList, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
