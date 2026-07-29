import { useQueryClient } from '@tanstack/react-query';

import {
	getGetStrategiesQueryKey,
	useActivateStrategy,
	useDeactivateStrategy,
} from '../api/gen';

type ToggleUserStrategyVariables = {
	strategyId: number;
	isActive: boolean;
};

export function useToggleUserStrategy() {
	const queryClient = useQueryClient();
	const mutationOptions = {
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: getGetStrategiesQueryKey() });
			void queryClient.invalidateQueries({
				predicate: (query) => typeof query.queryKey[0] === 'string'
					&& query.queryKey[0].startsWith('/api/Strategies/'),
			});
		},
	};
	const createStrategyMutation = useActivateStrategy({
		mutation: {
			...mutationOptions,
		},
	});
	const deleteStrategyMutation = useDeactivateStrategy({
		mutation: {
			...mutationOptions,
		},
	});

	return {
		mutate: (variables: ToggleUserStrategyVariables) => {
			if (variables.isActive) {
				createStrategyMutation.mutate({
					strategyId: variables.strategyId,
				});

				return;
			}

			deleteStrategyMutation.mutate({
				strategyId: variables.strategyId,
			});
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
