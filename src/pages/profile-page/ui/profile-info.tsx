import {
	ActionIcon,
	Avatar,
	Badge,
	Button,
	Divider,
	Group,
	Stack,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import {
	IconBrandTelegram,
	IconCalendar,
	IconCheck,
	IconEdit,
	IconLink,
	IconMail,
	IconUser,
	IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { MeDto } from '@/shared/api';

import classes from './ProfileInfo.module.css';

type ProfileInfoProps = {
	user: MeDto;
};

function useLoginEdit(currentLogin: string) {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(currentLogin);

	const start = () => {
		setValue(currentLogin);
		setIsEditing(true);
	};

	const cancel = () => {
		setValue(currentLogin);
		setIsEditing(false);
	};

	const save = () => {
		// TODO: integrate with API when endpoint is available
		setIsEditing(false);
	};

	return {
		isEditing,
		value,
		setValue,
		start,
		cancel,
		save,
	};
}

export function ProfileInfo({ user }: ProfileInfoProps) {
	const loginEdit = useLoginEdit(user.login);

	return (
		<Stack gap='lg'>
			{/* Avatar + login centered */}
			<div className={classes.avatarWrapper}>
				<Avatar size='xl' className={classes.avatar}>
					<IconUser size={48} />
				</Avatar>

				{loginEdit.isEditing
					? (
							<TextInput
								size='sm'
								value={loginEdit.value}
								onChange={(e) => loginEdit.setValue(e.currentTarget.value)}
								className={classes.editField}
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
								<Text size='lg' fw={600}>
									{user.login}
								</Text>
								<Tooltip label='Изменить логин'>
									<ActionIcon size='sm' variant='subtle' onClick={loginEdit.start}>
										<IconEdit size={16} />
									</ActionIcon>
								</Tooltip>
							</Group>
						)}
			</div>

			{/* Personal info */}
			<Stack gap='xs'>
				<Text size='sm' c='dimmed' fw={500} mb='xs'>
					Личная информация
				</Text>

				{/* Email */}
				<div className={classes.infoRow}>
					<IconMail size={20} className={classes.infoIcon} />
					<Text size='sm' className={classes.label}>
						Почта
					</Text>
					<Text size='sm' c='dimmed' fs='italic' className={classes.value}>
						Скоро будет доступно
					</Text>
				</div>

				{/* Last login date */}
				<div className={classes.infoRow}>
					<IconCalendar size={20} className={classes.infoIcon} />
					<Text size='sm' className={classes.label}>
						Последний вход
					</Text>
					<Text className={classes.value}>
						{dayjs(user.lastLoginDate).format('DD.MM.YYYY, HH:mm')}
					</Text>
				</div>
			</Stack>

			<Divider />

			{/* Bindings section */}
			<Stack gap='xs'>
				<Text size='sm' c='dimmed' fw={500} mb='xs'>
					Привязки
				</Text>

				<div className={classes.bindingRow}>
					<Group gap='sm'>
						<IconBrandTelegram size={24} color='#229ED9' />
						<div>
							<Text size='sm' fw={500}>
								Telegram
							</Text>
							{user.tgId
								? (
										<Text size='xs' c='dimmed'>
											ID:
											{' '}
											{user.tgId}
										</Text>
									)
								: (
										<Text size='xs' c='dimmed'>
											Не привязан
										</Text>
									)}
						</div>
					</Group>

					{user.tgId
						? (
								<Badge
									leftSection={<IconLink size={12} />}
									color='green'
									variant='filled'
									size='md'
								>
									Привязан
								</Badge>
							)
						: (
								<Button
									size='xs'
									variant='outline'
									leftSection={<IconLink size={14} />}
								>
									Привязать
								</Button>
							)}
				</div>
			</Stack>
		</Stack>
	);
}
