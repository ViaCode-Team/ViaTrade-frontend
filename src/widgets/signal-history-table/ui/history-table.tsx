import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useSignalHistoryTable } from '../lib/use-history-table';
import { SignalHistoryTableView } from './history-table-view';
import { SignalHistoryTableSkeleton } from './history-table.skeleton';

type HistoryTableProps = {
	instrumentId: number;
	strategyId: number;
	strategyName: string;
	strategyDisplayName: string;
};

export function SignalHistoryTable({ instrumentId, strategyId, strategyName, strategyDisplayName }: HistoryTableProps) {
	const table = useSignalHistoryTable({ strategyId, instrumentId });
	const { activePage, totalPages, setPage, ...viewProps } = table;

	return (
		<SignalHistoryTableView
			strategyName={strategyName}
			strategyDisplayName={strategyDisplayName}
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
