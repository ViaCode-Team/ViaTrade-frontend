import { Stack } from '@mantine/core';

import { RemindProvider, useRemindContext } from '@/entities/remind';
import { mockStocks } from '@/entities/stock';
import { openAddRemindModal } from '@/features/remind/add-remind';
import { RemindList } from '@/features/remind/manage-reminds';
import { RemindsControls } from '@/features/remind/search-reminds';

import { RemindsSummary } from './reminds-summary';

function RemindsOverviewContent() {
	const { onRemindAdd } = useRemindContext();

	const handleAddClick = () => {
		openAddRemindModal({
			onAdd: (source) => onRemindAdd(source),
		});
	};

	return (
		<>
			<RemindsSummary />

			<Stack>
				<RemindsControls onAddClick={handleAddClick} />
				<RemindList />
			</Stack>
		</>
	);
}

export function RemindsOverview() {
	return (
		<RemindProvider
			defaultReminds={[
				{
					id: 'mock-remind-1',
					text: 'Проверить отчетность за 3 квартал. Ожидается рост выручки.',
					date: '2024-11-20',
					time: '10:00',
					source: {
						type: 'stock',
						id: mockStocks[0].id.toString(),
						label: mockStocks[0].name,
					},
				},
			]}
		>
			<RemindsOverviewContent />
		</RemindProvider>
	);
}
