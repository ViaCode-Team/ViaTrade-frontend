import {
	useActivateStrategy,
	useDeactivateStrategy,
} from '../api/gen';

type ToggleUserStrategyVariables = {
	strategyId: number;
	isActive: boolean;
};

export function useToggleUserStrategy() {
	const createStrategyMutation = useActivateStrategy();
	const deleteStrategyMutation = useDeactivateStrategy();

	return {
		mutate: (variables: ToggleUserStrategyVariables, onSuccess?: () => void) => {
			if (variables.isActive) {
				createStrategyMutation.mutate({
					strategyId: variables.strategyId,
				}, { onSuccess });

				return;
			}

			deleteStrategyMutation.mutate({
				strategyId: variables.strategyId,
			}, { onSuccess });
		},
		isPending: createStrategyMutation.isPending || deleteStrategyMutation.isPending,
		isError: createStrategyMutation.isError || deleteStrategyMutation.isError,
		variables: createStrategyMutation.isPending
			? createStrategyVariablesToToggleVariables(createStrategyMutation.variables)
			: deleteStrategyVariablesToToggleVariables(deleteStrategyMutation.variables),
	};
}

function createStrategyVariablesToToggleVariables(
	variables: { strategyId: number } | undefined,
) {
	return variables
		? { strategyId: variables.strategyId, isActive: true }
		: undefined;
}

function deleteStrategyVariablesToToggleVariables(
	variables: { strategyId: number } | undefined,
) {
	return variables
		? { strategyId: variables.strategyId, isActive: false }
		: undefined;
}
