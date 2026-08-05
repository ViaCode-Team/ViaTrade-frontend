import { useParams } from 'react-router';

export function useCurrentStrategy() {
	const { strategyId: rawStrategyId } = useParams();
	const strategyId = Number(rawStrategyId);

	if (!Number.isInteger(strategyId) || strategyId <= 0) {
		return {
			hasStrategyId: false as const,
		};
	}

	return {
		strategyId,
		hasStrategyId: true as const,
	};
}
