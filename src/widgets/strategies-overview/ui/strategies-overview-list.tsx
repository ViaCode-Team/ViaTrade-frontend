import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';

import type { Strategy } from '@/entities/strategy';

import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStrategiesOverview } from '../lib/use-strategies-overview';

const { StrategyStockBindingModalBoundary } = lazily(() => import('./strategy-stock-binding-modal'));

function StrategiesOverviewList() {
	const {
		strategies,
		filteredStrategies,
	} = useStrategiesOverview();

	function openStockBindingModal(strategy: Strategy) {
		modals.open({
			title: `Привязать акции к ${strategy.name}`,
			size: 'xl',
			centered: true,
			children: (
				<Suspense fallback={null}>
					<StrategyStockBindingModalBoundary strategyId={strategy.id} />
				</Suspense>
			),
		});
	}

	return (
		<StrategiesList
			strategies={filteredStrategies}
			hasAnyStrategies={strategies.length > 0}
			actionSlot={(strategy) => (
				<StrategyToggleCheckbox strategyId={strategy.id} isActive={strategy.isActive} />
			)}
			bottomActionSlot={(strategy) => (
				<Button
					mt='auto'
					type='button'
					variant='default'
					style={{ position: 'relative', zIndex: 2 }}
					onClick={() => openStockBindingModal(strategy)}
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
