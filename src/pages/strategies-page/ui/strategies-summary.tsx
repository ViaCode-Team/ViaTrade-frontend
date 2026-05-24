import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
	type GetAllSuspenseQueryError,
	type GetAllSuspenseQueryResult,
	getGetAllSuspenseQueryOptions,
	getGetUsersStrategySuspenseQueryOptions,
	type GetUsersStrategySuspenseQueryError,
	type GetUsersStrategySuspenseQueryResult,
	mapTradeStrategiesToStrategies,
} from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type StrategiesQueries = [
	{
		queryFnData: GetAllSuspenseQueryResult;
		error: GetAllSuspenseQueryError;
	},
	{
		queryFnData: GetUsersStrategySuspenseQueryResult;
		error: GetUsersStrategySuspenseQueryError;
	},
];

function StrategiesSummary() {
	const [strategiesQuery, userStrategiesQuery] = useSuspenseQueries<StrategiesQueries>({
		queries: [
			getGetAllSuspenseQueryOptions(),
			getGetUsersStrategySuspenseQueryOptions(),
		],
	});

	const strategies = useMemo(
		() =>
			mapTradeStrategiesToStrategies(
				strategiesQuery.data.data,
				userStrategiesQuery.data.data,
			),
		[strategiesQuery.data.data, userStrategiesQuery.data.data],
	);

	const total = strategies.length;
	const active = strategies.filter((s) => s.isActive).length;
	const inactive = total - active;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} />
			<SummaryCard title='Активные' value={active} color='green' />
			<SummaryCard title='Отключены' value={inactive} color='gray' />
		</SummaryList>
	);
}

export const StrategiesSummaryBoundary = withQueryBoundary(StrategiesSummary, {
	suspenseProps: {
		fallback: null,
	},
});
