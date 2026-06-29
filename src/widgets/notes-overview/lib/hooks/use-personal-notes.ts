import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
	getGetByUserInstrumentAllSuspenseQueryOptions,
	getGetByUserStrategyAllSuspenseQueryOptions,
} from '@/entities/note';
import { mapTradeCodeToStock } from '@/entities/stock';
import { getGetAllSuspenseQueryOptions as getGetAllStrategiesSuspenseQueryOptions } from '@/entities/strategy';
import { getGetAllStocksCodesSuspenseQueryOptions } from '@/entities/trade-code';
import {
	mergeApiNotesWithDrafts,
	useStoredPersonalNotesQuery,
} from '@/features/note/manage-note';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

import { getApiPersonalNotes } from '../../model/api-notes';

export function usePersonalNotes() {
	const storedNotesQuery = useStoredPersonalNotesQuery();

	const [
		instrumentNotesQuery,
		strategyNotesQuery,
		stocksQuery,
		strategiesQuery,
	] = useSuspenseQueries({
		queries: [
			getGetByUserInstrumentAllSuspenseQueryOptions({ query: { refetchInterval: QUERY_REFETCH_INTERVAL } }) as any,
			getGetByUserStrategyAllSuspenseQueryOptions({ query: { refetchInterval: QUERY_REFETCH_INTERVAL } }) as any,
			getGetAllStocksCodesSuspenseQueryOptions({ query: { refetchInterval: QUERY_REFETCH_INTERVAL } }) as any,
			getGetAllStrategiesSuspenseQueryOptions({ query: { refetchInterval: QUERY_REFETCH_INTERVAL } }) as any,
		],
	}) as [any, any, any, any];

	const apiNotes = useMemo(
		() => getApiPersonalNotes({
			instrumentNotes: instrumentNotesQuery.data?.data ?? [],
			strategyNotes: strategyNotesQuery.data?.data ?? [],
			stocks: (stocksQuery.data?.data ?? []).map(mapTradeCodeToStock),
			strategies: strategiesQuery.data?.data ?? [],
		}),
		[
			instrumentNotesQuery.data?.data,
			strategyNotesQuery.data?.data,
			stocksQuery.data?.data,
			strategiesQuery.data?.data,
		],
	);

	const notes = useMemo(
		() => mergeApiNotesWithDrafts({
			apiNotes,
			storedNotes: storedNotesQuery.data ?? [],
		}),
		[apiNotes, storedNotesQuery.data],
	);

	const refetch = () => {
		void instrumentNotesQuery.refetch();
		void strategyNotesQuery.refetch();
	};

	return {
		notes,
		apiNotes,
		refetch,
	};
}
