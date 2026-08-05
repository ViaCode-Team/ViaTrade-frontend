import { Flex, Stack } from '@mantine/core';

import { mapStrategyResponseToStrategy, useGetStrategyByIdSuspense } from '@/entities/strategy';
import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { useCurrentStrategy } from './model/use-current-strategy';
import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHero } from './ui/strategy-hero';
import { StrategyHeroSkeleton } from './ui/strategy-hero.skeleton';
import { StrategyInfoSection } from './ui/strategy-info-section';
import { StrategyNotFound } from './ui/strategy-not-found';
import { StrategyNoteSection } from './ui/strategy-note-section';

const StrategyPageContentBoundary = withQueryBoundary(StrategyPageContent, {
	suspenseProps: { fallback: <StrategyHeroSkeleton /> },
});

export function StrategyPage() {
	return (
		<Stack>
			<Flex justify='space-between' align='center'>
				<BackToStrategiesLink />
				<DataFreshness />
			</Flex>

			<StrategyPageBase />
		</Stack>
	);
}

function StrategyPageBase() {
	const currentStrategy = useCurrentStrategy();

	if (!currentStrategy.hasStrategyId) {
		return <StrategyNotFound />;
	}

	return <StrategyPageContentBoundary strategyId={currentStrategy.strategyId} />;
}

function StrategyPageContent({ strategyId }: { strategyId: number }) {
	const strategyQuery = useGetStrategyByIdSuspense(strategyId);
	const strategySummary = mapStrategyResponseToStrategy(strategyQuery.data.data);

	return (
		<>
			<Section>
				<StrategyHero strategy={strategySummary} />
			</Section>

			<StrategyInfoSection strategy={strategySummary} />

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
