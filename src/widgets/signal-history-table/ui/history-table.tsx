import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useSignalHistoryTable } from '../lib/use-history-table';
import { SignalHistoryTableView } from './history-table-view';
import { SignalHistoryTableSkeleton } from './history-table.skeleton';

type HistoryTableProps = {
	tradeCode: string;
	strategyName: string;
};

export function SignalHistoryTable({ tradeCode, strategyName }: HistoryTableProps) {
	const table = useSignalHistoryTable({ strategyName, tradeCode });
	const { activePage, totalPages, setPage, ...viewProps } = table;

	return (
		<SignalHistoryTableView
			strategyName={strategyName}
			pagination={{ page: activePage, totalPages, onPageChange: setPage }}
			{...viewProps}
		/>
	);
}

export const SignalHistoryTableBoundary = withQueryBoundary(SignalHistoryTable, {
	suspenseProps: {
		fallback: <SignalHistoryTableSkeleton />,
	},
});
