import {
	Avatar,
	Card,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@mantine/core';

import { ProfileBanner } from './profile-banner';
import cls from './profile-info.module.css';

export function ProfileInfoSkeleton() {
	return (
		<Card p={0} radius='md' className={cls.card}>
			<ProfileBanner />

			<Stack gap='sm'>
				<Stack align='center' gap='xs' className={cls.profileHeader}>
					<div className={cls.avatarRing}>
						<Skeleton circle>
							<Avatar size='var(--vt-profile-avatar-size)' />
						</Skeleton>
					</div>

					<Stack align='center' gap={6}>
						<Skeleton h={28} w={150} />
						<Skeleton h={18} w={210} />
					</Stack>
				</Stack>

				<SimpleGrid minColWidth={300} spacing='sm' autoFlow='auto-fit'>
					<Skeleton h={78} />
					<Skeleton h={78} />
				</SimpleGrid>
			</Stack>
		</Card>
	);
}
