import {
	Avatar,
	Card,
	Flex,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useGetMeSuspense } from '@/entities/user';
import { DATE_DISPLAY_FORMAT } from '@/shared/model';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { ProfileBanner } from './profile-banner';
import cls from './profile-info.module.css';
import { ProfileInfoSkeleton } from './profile-info.skeleton';

export function ProfileInfo() {
	const { data } = useGetMeSuspense();
	const { data: user } = data;

	return (
		<Card p={0} className={cls.card}>
			<ProfileBanner />

			<Stack align='center' gap='sm' className={cls.profileHeader}>
				<div className={cls.avatarRing}>
					<Avatar size='var(--vt-profile-avatar-size)'>
						<IconUser size='var(--vt-profile-avatar-icon-size)' />
					</Avatar>
				</div>

				<Flex direction='column' align='center'>
					<Title order={2} ta='center' textWrap='balance' className={cls.loginTitle}>
						{user.login}
					</Title>
					<Text c='dimmed' ta='center'>
						Дата регистрации:
						{' '}
						{dayjs(user.registerDate).format(DATE_DISPLAY_FORMAT)}
					</Text>
				</Flex>
			</Stack>
		</Card>
	);
}

export const ProfileInfoBoundary = withQueryBoundary(ProfileInfo, {
	suspenseProps: {
		fallback: <ProfileInfoSkeleton />,
	},
});
