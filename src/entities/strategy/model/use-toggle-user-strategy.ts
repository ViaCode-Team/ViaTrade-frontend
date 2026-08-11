import { useUpdateStrategy } from '../api/gen';

type ToggleUserStrategyVariables = {
	strategyId: number;
	isActive: boolean;
};

export function useToggleUserStrategy() {
	const updateStrategyMutation = useUpdateStrategy();

	return {
		mutate: (variables: ToggleUserStrategyVariables, onSuccess?: () => void) => {
			updateStrategyMutation.mutate({
				strategyId: variables.strategyId,
				data: { isActive: variables.isActive },
			}, { onSuccess });
		},
		isPending: updateStrategyMutation.isPending,
		isError: updateStrategyMutation.isError,
		variables: updateStrategyMutation.variables
			? {
					strategyId: updateStrategyMutation.variables.strategyId,
					isActive: updateStrategyMutation.variables.data.isActive,
				}
			: undefined,
	};
}
