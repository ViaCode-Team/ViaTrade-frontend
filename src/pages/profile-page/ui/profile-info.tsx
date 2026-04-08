import {
	ActionIcon,
	Avatar,
	Card,
	Group,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import {
	IconBrandTelegram,
	IconCheck,
	IconMail,
	IconUser,
	IconX,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { useGetMeSuspense } from '@/entities/user';
import { ROUTES } from '@/shared/model/routes';
import { InfoRow } from '@/shared/ui/info-row';

import { useLoginEdit } from '../model/use-login-edit';
import { ProfileBanner } from './profile-banner';
import cls from './profile-info.module.css';

export function ProfileInfo() {
	const { data } = useGetMeSuspense();
	const { data: user } = data;

	const loginEdit = useLoginEdit(user.login);
	const navigate = useNavigate();

	return (
		<Card p={0} radius='md' className={cls.card}>
			<ProfileBanner />

			<div className={cls.header}>
				<div className={cls.avatarRing}>
					<Avatar size={96}>
						<IconUser size={48} />
					</Avatar>
				</div>


				<Stack gap={5}>
					{loginEdit.isEditing
						? (
								<TextInput
									size='sm'
									value={loginEdit.value}
									onChange={(e) => loginEdit.setValue(e.currentTarget.value)}
									className={cls.editField}
									rightSection={(
										<Group gap={2}>
											<ActionIcon size='sm' variant='subtle' color='green' onClick={loginEdit.save}>
												<IconCheck size={14} />
											</ActionIcon>
											<ActionIcon size='sm' variant='subtle' color='red' onClick={loginEdit.cancel}>
												<IconX size={14} />
											</ActionIcon>
										</Group>
									)}
									rightSectionWidth={60}
									autoFocus
									onKeyDown={(e) => {
										if (e.key === 'Enter')
											loginEdit.save();
										if (e.key === 'Escape')
											loginEdit.cancel();
									}}
								/>
							)
						: (
								<Group gap='xs' justify='center'>
									<Text size='xl' fw={700}>
										{user.login}
									</Text>
								</Group>
							)}

					<Text c='dimmed' ta='center' size='sm'>Дата регистрации: 10.03.2026</Text>
				</Stack>

			</div>

			<div className={cls.body}>

				<div>
					<Text size='xs' c='dimmed' fw={600} tt='uppercase' mb='xs'>
						Сторонние сервисы
					</Text>

					<div className={cls.grid}>
						<InfoRow
							icon={<IconMail size={22} color='var(--mantine-color-brand-7)' />}
							title='Электронная почта'
							description='Не подтверждена'
							onClick={() => navigate(ROUTES.EMAIL_CONFIRMATION)}
						/>

						<InfoRow
							icon={<IconBrandTelegram size={22} color='#229ED9' />}
							title='Telegram'
							description={user.tgId ? `ID: ${user.tgId}` : 'Не привязан'}
							onClick={() => {}}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
}
