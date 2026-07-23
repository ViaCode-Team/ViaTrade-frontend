import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { DeleteRemindButton, useRemindList } from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

type StockRemindsListProps = {
	instrumentId: number;
};

function StockRemindsList({ instrumentId }: StockRemindsListProps) {
	const {
		reminds,
		filteredReminds,
		handleRemindChange,
		page,
		totalPages,
		setPage,
	} = useRemindList(instrumentId);

	return (
		<DataState hasData={!!reminds.length} hasResults={!!filteredReminds.length}>
			<RemindList
				reminds={filteredReminds}
				hideSourceBadge
				onRemindChange={handleRemindChange}
				renderAction={(remind) => <DeleteRemindButton id={remind.id} />}
				pagination={{ page, totalPages, onPageChange: setPage }}
			/>
		</DataState>
	);
}

export const StockRemindsListBoundary = withQueryBoundary(StockRemindsList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
