import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { GetUsersStrategyQueryResult } from '../api/gen';

import {
	createUsersStrategy,
	deleteUsersStrategy,
	getGetUsersStrategyQueryKey,
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

	return useMutation<
		unknown,
		Error,
		ToggleUserStrategyVariables,
		ToggleUserStrategyContext
	>({
		mutationFn: ({ strategyId, isActive }) => {
			if (isActive) {
				return createUsersStrategy({ strategyId });
			}

			return deleteUsersStrategy({ strategyId });
		},
		onMutate: async (variables) => {
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
		onError: (_error, _variables, context) => {
			if (context?.previousUserStrategies) {
				queryClient.setQueryData(queryKey, context.previousUserStrategies);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});
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

	return {
		...currentUserStrategies,
		data: variables.isActive
			? [
					...userStrategiesWithoutCurrent,
					{ tradeStrategyId: variables.strategyId },
				]
			: userStrategiesWithoutCurrent,
	};
}
