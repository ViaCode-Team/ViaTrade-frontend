import { Stack, Title } from '@mantine/core';

import { PageHeader } from '@/shared/ui/page-header';
import { DashboardNotesBoundary } from '@/widgets/dashboard-notes';
import { DashboardRemindersBoundary } from '@/widgets/dashboard-reminders';
import { DashboardSignals } from '@/widgets/dashboard-signals';
import { DashboardStatisticsBoundary } from '@/widgets/dashboard-statistics';
import { DashboardStocksBoundary } from '@/widgets/dashboard-stocks';
import { DashboardStrategiesBoundary } from '@/widgets/dashboard-strategies';

export function DashboardPage() {
	return (
		<Stack gap='xl'>
			<PageHeader title='Панель управления' />

			<Stack gap='sm'>
				<Title order={2}>Общая статистика</Title>
				<DashboardStatisticsBoundary />
			</Stack>

			<Stack gap='xl'>
				<Stack gap='sm'>
					<Title order={2}>Последние сигналы</Title>
					<DashboardSignals />
				</Stack>

				<Stack gap='sm'>
					<Title order={2}>Активные стратегии</Title>
					<DashboardStrategiesBoundary />
				</Stack>

				<Stack gap='sm'>
					<Title order={2}>Лучшие акции</Title>
					<DashboardStocksBoundary />
				</Stack>

				<Stack gap='sm'>
					<Title order={2}>Последние напоминания</Title>
					<DashboardRemindersBoundary />
				</Stack>

				<Stack gap='sm'>
					<Title order={3}>Последние заметки</Title>
					<DashboardNotesBoundary />
				</Stack>
			</Stack>
		</Stack>
	);
}
