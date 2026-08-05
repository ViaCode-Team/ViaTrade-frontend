import { useQueryClient } from '@tanstack/react-query';

import {
	getGetStrategyByIdQueryKey,
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
		onSuccess: (_data: unknown, variables: { strategyId: number }) => {
			void queryClient.invalidateQueries({
				queryKey: getGetStrategyByIdQueryKey(variables.strategyId),
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
