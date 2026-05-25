import { Group, Paper, Skeleton } from '@mantine/core';

import cls from '../dashboard-page.module.css';

export function DashboardSignalCardSkeleton() {
	return (
		<Paper className={cls.signalCard} withBorder p='sm'>
			<div className={cls.signalHeader}>
				<Group gap='xs'>
					<Skeleton height={20} width={76} radius='sm' />
					<Skeleton height={24} width={60} />
				</Group>
				<Skeleton height={18} width={100} mt={4} />
			</div>

			<div className={cls.signalFooter}>
				<Skeleton height={20} width={120} mb={6} />
				<Group gap='xs' wrap='nowrap'>
					<Skeleton height={18} width={34} />
					<Skeleton height={8} style={{ flex: 1 }} radius='xl' />
					<Skeleton height={18} width={28} />
				</Group>
			</div>
		</Paper>
	);
}
