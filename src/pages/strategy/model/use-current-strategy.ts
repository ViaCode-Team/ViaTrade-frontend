import { useParams } from 'react-router';

export function useCurrentStrategy() {
	const { strategyName } = useParams();

	if (!strategyName?.trim()) {
		return {
			hasStrategyName: false as const,
		};
	}

	return {
		strategyName,
		hasStrategyName: true as const,
	};
}
