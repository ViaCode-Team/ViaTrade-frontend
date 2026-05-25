import { Card, Group, Skeleton, Stack } from '@mantine/core';

import cls from './remind-list.module.css';

export function RemindCardSkeleton() {
	return (
		<Card withBorder bg='transparent' padding='sm' className={cls.card}>
			<Stack gap='xs'>
				<Group align='flex-start' gap='xs' wrap='nowrap'>
					<Skeleton height={104} style={{ flex: 1 }} radius='sm' />
					<Stack gap='xs'>
						<Skeleton height={28} width={28} radius='sm' />
						<Skeleton height={28} width={28} radius='sm' />
						<Skeleton height={28} width={28} radius='sm' />
					</Stack>
				</Group>

				<Skeleton height={36} radius='sm' />
			</Stack>
		</Card>
	);
}
