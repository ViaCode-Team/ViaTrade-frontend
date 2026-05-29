import { useMemo, useState } from 'react';

import {
	mapStrategyResultResponseToTradeHistory,
	useGetResultByStrategyAndTradeCodeSuspense,
} from '@/entities/signal';
import { getSignalHistoryMock } from '@/entities/signal';

type UseHistoryTableOptions = {
	strategyName: string;
	tradeCode: string;
};

export function useHistoryTable({ strategyName, tradeCode }: UseHistoryTableOptions) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const { data: historyData } = useGetResultByStrategyAndTradeCodeSuspense(
		strategyName,
		tradeCode,
		undefined,
		{
			query: {
				queryFn: () => getSignalHistoryMock(strategyName, tradeCode),
				staleTime: Infinity,
			},
		},
	);

	const history = useMemo(
		() =>
			mapStrategyResultResponseToTradeHistory(
				historyData.data,
				strategyName,
				tradeCode,
			),
		[historyData.data, strategyName, tradeCode],
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
