import { useMemo, useState } from 'react';

import {
	mapSignalResponsePageToTradeHistory,
	useGetSignalsSuspense,
} from '@/entities/signal';
import { STATIC_QUERY_STALE_TIME } from '@/shared/model';

type UseHistoryTableOptions = {
	strategyId: number;
	instrumentId: number;
};

export function useSignalHistoryTable({ strategyId, instrumentId }: UseHistoryTableOptions) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const { data: historyData } = useGetSignalsSuspense(
		{ strategyId, instrumentId, page: 1, pageSize: 100 },
		{
			query: {
				staleTime: STATIC_QUERY_STALE_TIME,
			},
		},
	);

	const history = useMemo(
		() =>
			mapSignalResponsePageToTradeHistory(historyData.data),
		[historyData.data],
	);

	const totalPages = Math.max(1, Math.ceil(history.length / rowsPerPage));
	const activePage = Math.min(page, totalPages);
	const from = (activePage - 1) * rowsPerPage;
	const to = Math.min(activePage * rowsPerPage, history.length);
	const start = history.length === 0 ? 0 : from + 1;
	const paginatedHistory = history.slice(from, to);

	const handleRowsPerPageChange = (v: string | null) => {
		if (v) {
			setRowsPerPage(Number(v));
			setPage(1);
		}
	};

	return {
		page,
		setPage,
		rowsPerPage,
		handleRowsPerPageChange,
		history,
		paginatedHistory,
		totalPages,
		activePage,
		start,
		to,
	};
}
