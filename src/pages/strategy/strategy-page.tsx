import { Flex, Stack } from '@mantine/core';

import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { useCurrentStrategy } from './model/use-current-strategy';
import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHeroBoundary } from './ui/strategy-hero';
import { StrategyInfoSectionBoundary } from './ui/strategy-info-section';
import { StrategyNotFound } from './ui/strategy-not-found';
import { StrategyNoteSection } from './ui/strategy-note-section';

const StrategyPageBoundary = withQueryBoundary(StrategyPageBase);

export function StrategyPage() {
	return (
		<Stack>
			<Flex justify='space-between' align='center'>
				<BackToStrategiesLink />
				<DataFreshness />
			</Flex>

			<StrategyPageBoundary />
		</Stack>
	);
}

function StrategyPageBase() {
	const { strategyId, hasStrategyId, strategySummary } = useCurrentStrategy();

	if (!hasStrategyId || strategyId === null) {
		return <StrategyNotFound />;
	}

	return (
		<>
			<Section>
				<StrategyHeroBoundary strategyId={strategyId} />
			</Section>

			<StrategyInfoSectionBoundary strategyId={strategyId} />

			<Section header={{ title: 'Связанные акции' }}>
				<StrategyStockBinding
					strategyId={strategyId}
				/>
			</Section>

			<StrategyNoteSection
				strategyId={strategyId}
				strategySummary={strategySummary}
			/>
		</>
	);
}
