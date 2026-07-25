import { useParams } from 'react-router';

import { useGetStrategiesSuspense } from '@/entities/strategy';

export function useCurrentStrategy() {
	const { strategyName } = useParams();
	const strategiesQuery = useGetStrategiesSuspense({ page: 1, pageSize: 100 });

	const decodedName = decodeURIComponent(strategyName || '').toLowerCase();
	const strategySummary = strategiesQuery.data.data.items.find(
		(s) => s.name.toLowerCase() === decodedName,
	);

	const strategyId = strategySummary ? strategySummary.id : null;
	const hasStrategyId = strategyId !== null;

	return {
		strategyId,
		hasStrategyId,
		strategySummary,
	};
}
