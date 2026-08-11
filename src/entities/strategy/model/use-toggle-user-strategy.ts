import { useUpdateStrategy } from '../api/gen';

type ToggleUserStrategyVariables = {
	strategyId: number;
	isSubscribed: boolean;
};

export function useToggleUserStrategy() {
	const updateStrategyMutation = useUpdateStrategy();

	return {
		mutate: (variables: ToggleUserStrategyVariables, onSuccess?: () => void) => {
			updateStrategyMutation.mutate({
				strategyId: variables.strategyId,
				data: { isSubscribed: variables.isSubscribed },
			}, { onSuccess });
		},
		isPending: updateStrategyMutation.isPending,
		isError: updateStrategyMutation.isError,
		variables: updateStrategyMutation.variables
			? {
					strategyId: updateStrategyMutation.variables.strategyId,
					isSubscribed: updateStrategyMutation.variables.data.isSubscribed,
				}
			: undefined,
	};
}
