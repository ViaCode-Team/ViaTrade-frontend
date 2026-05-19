import { useQueryClient } from '@tanstack/react-query';

import type { UserTradeStrategyDto } from '@/shared/api';

import type { GetUsersStrategyQueryResult } from '../api/gen';

import {
	getGetUsersStrategyQueryKey,
	useCreateUsersStrategy,
	useDeleteUsersStrategy,
} from '../api/gen';

type ToggleUserStrategyVariables = {
	strategyId: number;
	isActive: boolean;
};

type ToggleUserStrategyContext = {
	previousUserStrategies?: GetUsersStrategyQueryResult;
};

export function useToggleUserStrategy() {
	const queryClient = useQueryClient();
	const queryKey = getGetUsersStrategyQueryKey();
	const mutationOptions = {
		onMutate: async (variables: ToggleUserStrategyVariables) => {
			await queryClient.cancelQueries({ queryKey });

			const previousUserStrategies
				= queryClient.getQueryData<GetUsersStrategyQueryResult>(queryKey);

			queryClient.setQueryData<GetUsersStrategyQueryResult>(
				queryKey,
				(currentUserStrategies) =>
					getOptimisticUserStrategies(currentUserStrategies, variables),
			);

			return { previousUserStrategies };
		},
		onError: (
			_error: Error,
			_variables: ToggleUserStrategyVariables,
			context: ToggleUserStrategyContext | undefined,
		) => {
			if (context?.previousUserStrategies) {
				queryClient.setQueryData(queryKey, context.previousUserStrategies);
			}
		},
	};
	const createStrategyMutation = useCreateUsersStrategy({
		mutation: {
			...mutationOptions,
			onMutate: (variables) =>
				mutationOptions.onMutate({
					strategyId: variables.data.strategyId,
					isActive: true,
				}),
			onError: (error, variables, context) => {
				mutationOptions.onError(error, {
					strategyId: variables.data.strategyId,
					isActive: true,
				}, context);
			},
		},
	});
	const deleteStrategyMutation = useDeleteUsersStrategy({
		mutation: {
			...mutationOptions,
			onMutate: (variables) =>
				mutationOptions.onMutate({
					strategyId: variables.params.strategyId,
					isActive: false,
				}),
			onError: (error, variables, context) => {
				mutationOptions.onError(error, {
					strategyId: variables.params.strategyId,
					isActive: false,
				}, context);
			},
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

function getOptimisticUserStrategies(
	currentUserStrategies: GetUsersStrategyQueryResult | undefined,
	variables: ToggleUserStrategyVariables,
) {
	if (!currentUserStrategies) {
		return currentUserStrategies;
	}

	const userStrategiesWithoutCurrent = currentUserStrategies.data.filter(
		(userStrategy) => userStrategy.tradeStrategyId !== variables.strategyId,
	);
	const optimisticUserStrategy: UserTradeStrategyDto = {
		id: -variables.strategyId,
		userId: currentUserStrategies.data[0]?.userId ?? 0,
		tradeStrategyId: variables.strategyId,
	};

	return {
		...currentUserStrategies,
		data: variables.isActive
			? [...userStrategiesWithoutCurrent, optimisticUserStrategy]
			: userStrategiesWithoutCurrent,
	};
}
