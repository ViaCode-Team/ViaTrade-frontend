import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Strategy } from '@/entities/strategy';

import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useFilteredStrategies } from '../lib/use-filtered-strategies';
import { useStrategiesData } from '../lib/use-strategies-data';
import { StrategyStockBindingModalBoundary } from './strategy-stock-binding-modal';

function openModal(strategy: Strategy) {
	modals.open({
		title: `Привязать акции к ${strategy.name}`,
		size: 'xl',
		children: <StrategyStockBindingModalBoundary strategyId={strategy.id} />,
	});
}

function StrategiesOverviewList() {
	const { strategies } = useStrategiesData();
	const filteredStrategies = useFilteredStrategies(strategies);

	return (
		<StrategiesList
			strategies={filteredStrategies}
			hasAnyStrategies={strategies.length > 0}
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
		/>
	);
}

export const StrategiesOverviewListBoundary = withQueryBoundary(StrategiesOverviewList, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
