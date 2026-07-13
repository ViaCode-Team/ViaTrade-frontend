import { mapTradeStrategyToStrategy, StrategyInfoList, StrategyInfoListSkeleton, useGetByIdSuspense } from '@/entities/strategy';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

const INACTIVE_STRATEGY_IDS = new Set<number>();

function StrategyInfoSection({ strategyId }: { strategyId: number }) {
	const strategyQuery = useGetByIdSuspense(strategyId);
	const strategy = mapTradeStrategyToStrategy(strategyQuery.data.data, INACTIVE_STRATEGY_IDS);

	const hasData = !!strategy.limitDescription || !!strategy.logicDescription || !!strategy.useDescription;

	return (
		<DataState hasData={hasData} noDataFallback={null}>
			<Section>
				<StrategyInfoList strategy={strategy} />
			</Section>
		</DataState>
	);
}

export const StrategyInfoSectionBoundary = withQueryBoundary(StrategyInfoSection, {
	suspenseProps: { fallback: <StrategyInfoListSkeleton /> },
});
