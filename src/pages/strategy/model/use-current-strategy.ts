import { useParams } from 'react-router';

import { useGetStrategyByNameSuspense } from '@/entities/strategy';

export function useCurrentStrategy() {
	const { strategyName } = useParams();
	const decodedName = decodeURIComponent(strategyName || '');
	const strategyQuery = useGetStrategyByNameSuspense(decodedName);
	const strategySummary = strategyQuery.data.data;

	return {
		strategyId: strategySummary.id,
		hasStrategyId: true,
		strategySummary,
	};
}
