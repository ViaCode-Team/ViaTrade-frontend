import { useMemo, useState } from 'react';

import type { TradeSignal } from '@/shared/api';

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
	const [selectedSignals, setSelectedSignals] = useState<TradeSignal[]>([1, -1]);

	const { data: historyData } = useGetSignalsSuspense(
		{
			strategyId,
			instrumentId,
			signals: selectedSignals,
			page,
			pageSize: rowsPerPage,
		},
		{
			query: {
				staleTime: STATIC_QUERY_STALE_TIME,
			},
		},
	);

	const history = useMemo(
		() => mapSignalResponsePageToTradeHistory(historyData.data),
		[historyData.data],
	);

	const totalCount = historyData.data.totalCount;
	const totalPages = Math.max(1, historyData.data.totalPages);
	const activePage = Math.min(page, totalPages);
	const start = totalCount === 0 ? 0 : (activePage - 1) * rowsPerPage + 1;
	const to = Math.min(activePage * rowsPerPage, totalCount);

	const handleRowsPerPageChange = (v: string | null) => {
		if (v) {
			setRowsPerPage(Number(v));
			setPage(1);
		}
	};
	const handleSelectedSignalsChange = (val: string[]) => setSelectedSignals(val.map(Number) as TradeSignal[]);

	return {
		page,
		setPage,
		rowsPerPage,
		handleRowsPerPageChange,
		selectedSignals,
		handleSelectedSignalsChange,
		history,
		totalCount,
		totalPages,
		activePage,
		start,
		to,
	};
}
