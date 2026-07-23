import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { TradesHistoryTableView } from './trades-history-table-view';
import { TradesHistoryTableSkeleton } from './trades-history-table.skeleton';
import { useTradesHistoryTable } from './use-trades-history-table';

function TradesHistoryTable() {
	const table = useTradesHistoryTable();
	const {
		trades,
		page,
		totalPages,
		setPage,
		...viewProps
	} = table;

	return (
		<TradesHistoryTableView
			hasData={!!trades.length}
			pagination={{ page, totalPages, onPageChange: setPage }}
			{...viewProps}
		/>
	);
}

export const TradesHistoryTableBoundary = withQueryBoundary(TradesHistoryTable, {
	suspenseProps: {
		fallback: <TradesHistoryTableSkeleton />,
	},
});
