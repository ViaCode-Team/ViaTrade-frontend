import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
	getGetInstrumentsQueryKey,
	getInstruments,
} from '@/entities/instrument';

const INSTRUMENTS_PAGE_SIZE = 15;

export function useRemindInstrumentOptions() {
	const instrumentsQuery = useInfiniteQuery({
		queryKey: getGetInstrumentsQueryKey({ pageSize: INSTRUMENTS_PAGE_SIZE }),
		queryFn: ({ pageParam }) => getInstruments({ page: pageParam, pageSize: INSTRUMENTS_PAGE_SIZE }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => (
			lastPage.data.page < lastPage.data.totalPages
				? lastPage.data.page + 1
				: undefined
		),
	});
	const options = useMemo(
		() => getLoadedInstruments(instrumentsQuery.data?.pages),
		[instrumentsQuery.data?.pages],
	);

	const loadNextPage = () => {
		if (!instrumentsQuery.hasNextPage || instrumentsQuery.isFetchingNextPage) {
			return;
		}

		void instrumentsQuery.fetchNextPage();
	};

	return {
		options,
		loadNextPage,
		isLoadingNextPage: instrumentsQuery.isFetchingNextPage,
	};
}

function getLoadedInstruments(pages: Awaited<ReturnType<typeof getInstruments>>[] | undefined) {
	if (!pages) {
		return [];
	}

	const instrumentIds = new Set<number>();

	return pages
		.flatMap((page) => page.data.items)
		.filter((instrument) => {
			if (instrumentIds.has(instrument.id)) {
				return false;
			}

			instrumentIds.add(instrument.id);
			return true;
		})
		.map((instrument) => ({
			value: instrument.id.toString(),
			label: `${instrument.symbol} — ${instrument.description || instrument.symbol}`,
		}));
}
