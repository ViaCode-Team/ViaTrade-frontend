import { useQueryClient } from '@tanstack/react-query';

import {
	getGetStrategiesQueryKey,
	useCreateUserStrategy,
	useDeleteUserStrategy,
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
	const createStrategyMutation = useCreateUserStrategy({
		mutation: {
			...mutationOptions,
		},
	});
	const deleteStrategyMutation = useDeleteUserStrategy({
		mutation: {
			...mutationOptions,
		},
	});

	return {
		mutate: (variables: ToggleUserStrategyVariables) => {
			if (variables.isActive) {
				createStrategyMutation.mutate({
					data: { strategyId: variables.strategyId },
				});

				return;
			}

			deleteStrategyMutation.mutate({
				params: { strategyId: variables.strategyId },
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
	variables: { data: { strategyId: number } } | undefined,
) {
	return variables
		? { strategyId: variables.data.strategyId, isActive: true }
		: undefined;
}

function deleteStrategyVariablesToToggleVariables(
	variables: { params: { strategyId: number } } | undefined,
) {
	return variables
		? { strategyId: variables.params.strategyId, isActive: false }
		: undefined;
}
