import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getInstruments } from '../api/gen';

const INSTRUMENTS_PAGE_SIZE = 100;

export function useInstrumentOptions() {
	const instrumentsQuery = useInfiniteQuery({
		queryKey: ['instrument-options'],
		initialPageParam: 1,
		queryFn: ({ pageParam, signal }) => getInstruments({
			page: pageParam,
			pageSize: INSTRUMENTS_PAGE_SIZE,
			sortBy: ['symbolAsc'],
		}, { signal }),
		getNextPageParam: (lastPage) => (
			lastPage.data.page < lastPage.data.totalPages
				? lastPage.data.page + 1
				: undefined
		),
	});

	const selectOptions = useMemo(() => {
		const instruments = instrumentsQuery.data?.pages.flatMap((page) => page.data.items) ?? [];

		return instruments.map((tc) => ({
			value: String(tc.id),
			label: `${tc.symbol} — ${tc.description || 'Нет описания'}`,
		}));
	}, [instrumentsQuery.data?.pages]);

	return {
		selectOptions,
		isLoadingInstruments: instrumentsQuery.isLoading,
		isLoadingMoreInstruments: instrumentsQuery.isFetchingNextPage,
		loadMoreInstruments: instrumentsQuery.fetchNextPage,
		hasMoreInstruments: instrumentsQuery.hasNextPage,
	};
}
