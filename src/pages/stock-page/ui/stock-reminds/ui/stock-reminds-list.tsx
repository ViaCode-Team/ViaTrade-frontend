import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { RemindCardActions, useRemindList } from '@/features/remind/manage-reminds';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

type StockRemindsListProps = {
	instrumentId: number;
};

function StockRemindsList({ instrumentId }: StockRemindsListProps) {
	const {
		reminds,
		filteredReminds,
		handleRemindChange,
	} = useRemindList(instrumentId);

	return (
		<RemindList
			reminds={filteredReminds}
			hasAnyReminds={reminds.length > 0}
			hideSourceBadge
			onRemindChange={handleRemindChange}
			actionSlot={(remind) => <RemindCardActions remindId={remind.id} />}
		/>
	);
}

export const StockRemindsListBoundary = withQueryBoundary(StockRemindsList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
