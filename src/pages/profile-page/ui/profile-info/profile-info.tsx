import {
	Avatar,
	Card,
	Flex,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

import { useGetMeSuspense } from '@/entities/user';

import { ProfileBanner } from './profile-banner';
import cls from './profile-info.module.css';

export function ProfileInfo() {
	const { data } = useGetMeSuspense();
	const { data: user } = data;

	return (
		<Card p={0} radius='md' className={cls.card}>
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
					<Text c='dimmed' ta='center'>Дата регистрации: 10.03.2026</Text>
				</Flex>
			</Stack>
		</Card>
	);
}
