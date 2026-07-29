import { useParams } from 'react-router';

import { useGetStrategiesSuspense } from '@/entities/strategy';

export function useCurrentStrategy() {
	const { strategyName } = useParams();
	const decodedName = decodeURIComponent(strategyName || '');
	const strategyQuery = useGetStrategiesSuspense({
		name: decodedName || '__missing_strategy__',
		page: 1,
		pageSize: 100,
	});
	const strategySummary = strategyQuery.data.data.items.find((strategy) => strategy.name === decodedName);
	if (!strategySummary) {
		throw new Error('Стратегия не найдена');
	}

	return {
		strategyId: strategySummary.id,
		hasStrategyId: true,
		strategySummary,
	};
}
