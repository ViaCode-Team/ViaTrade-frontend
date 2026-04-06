import {
	ActionIcon,
	Avatar,
	Card,
	Group,
	Text,
	TextInput,
} from '@mantine/core';
import {
	IconBrandTelegram,
	IconCalendarClock,
	IconCheck,
	IconMail,
	IconUser,
	IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import type { MeDto } from '@/shared/api';

import { ROUTES } from '@/shared/model/routes';
import { InfoRow } from '@/shared/ui/info-row';

import classes from './profile-info.module.css';

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
	const navigate = useNavigate();

	return (
		<Card p={0} radius='md' className={classes.card}>
			{/* Gradient banner */}
			<div className={classes.banner}>
				<svg
					className={classes.chartLine}
					viewBox='0 0 480 120'
					preserveAspectRatio='xMidYMid slice'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					{/* Japanese candlestick chart, uptrend with pullbacks */}
					{([
						[20, 68, 86, 74, 94, true],
						[56, 62, 80, 66, 88, true],
						[92, 70, 72, 82, 90, false],
						[128, 48, 76, 54, 84, true],
						[164, 42, 62, 46, 70, true],
						[200, 50, 52, 64, 72, false],
						[236, 32, 56, 36, 62, true],
						[272, 24, 42, 28, 50, true],
						[308, 30, 34, 44, 52, false],
						[344, 16, 38, 20, 46, true],
						[380, 10, 26, 14, 34, true],
						[416, 16, 18, 28, 36, false],
					] as [number, number, number, number, number, boolean][]).map(([x, high, open, close, low, green]) => {
						const bodyTop = green ? close : open;
						const bodyBot = green ? open : close;
						const cx = x + 9;
						return (
							<g key={x}>
								<line
									x1={cx}
									y1={high}
									x2={cx}
									y2={bodyTop}
									stroke='rgba(255,255,255,0.1)'
									strokeWidth='1.5'
								/>
								<line
									x1={cx}
									y1={bodyBot}
									x2={cx}
									y2={low}
									stroke='rgba(255,255,255,0.1)'
									strokeWidth='1.5'
								/>
								<rect
									x={x}
									y={bodyTop}
									width={18}
									height={bodyBot - bodyTop}
									rx={2}
									fill={green ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}
								/>
							</g>
						);
					})}
				</svg>
			</div>

			{/* Avatar + login */}
			<div className={classes.header}>
				<div className={classes.avatarRing}>
					<Avatar size={96}>
						<IconUser size={48} />
					</Avatar>
				</div>

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
								<Text size='xl' fw={700}>
									{user.login}
								</Text>
							</Group>

						)}
				{/*
				<Tooltip label='Изменить логин'>
					<ActionIcon size='sm' variant='subtle' onClick={loginEdit.start}>
						<IconEdit size={16} />
					</ActionIcon>
				</Tooltip> */}
			</div>


			{/* Content */}
			<div className={classes.body}>
				<div className={classes.grid}>
					<InfoRow
						icon={<IconMail size={22} />}
						title='Почта'
						description='Перейти к подтверждению'
						onClick={() => navigate(ROUTES.EMAIL_CONFIRMATION)}
					/>

					<InfoRow
						icon={<IconCalendarClock size={22} />}
						title='Дата регистрации'
						description='10.03.2026'
					/>
				</div>

				<div>
					<Text size='xs' c='dimmed' fw={600} tt='uppercase' mb='xs'>
						Привязки
					</Text>

					<div className={classes.grid}>
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
