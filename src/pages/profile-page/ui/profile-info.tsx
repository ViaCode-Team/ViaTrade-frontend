import type { SxProps, Theme } from '@mui/material/styles';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EventIcon from '@mui/icons-material/Event';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';
import TelegramIcon from '@mui/icons-material/Telegram';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { MeDto } from '@/shared/api';

const styles: Record<string, SxProps<Theme>> = {
	avatarWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 1.5,
		mb: 1,
	},
	avatar: {
		width: { xs: 72, sm: 96 },
		height: { xs: 72, sm: 96 },
		background: 'linear-gradient(135deg, #ffb752 0%, #e09530 100%)',
		'& .MuiSvgIcon-root': {
			fontSize: { xs: 36, sm: 48 },
		},
	},
	loginRow: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 0.5,
	},
	infoRow: {
		display: 'flex',
		flexDirection: { xs: 'column', sm: 'row' },
		alignItems: { xs: 'flex-start', sm: 'center' },
		gap: { xs: 0.25, sm: 1.5 },
		minHeight: { xs: 'auto', sm: 40 },
		py: { xs: 0.5, sm: 0 },
	},
	infoIcon: {
		color: 'text.secondary',
		fontSize: 20,
		flexShrink: 0,
		display: { xs: 'none', sm: 'block' },
	},
	label: {
		color: 'text.secondary',
		width: { xs: 'auto', sm: 130 },
		flexShrink: 0,
		fontWeight: { xs: 500, sm: 400 },
	},
	value: {
		flex: 1,
		minWidth: 0,
	},
	sectionTitle: {
		mb: 1.5,
		mt: 0.5,
	},
	bindingRow: {
		display: 'flex',
		flexDirection: { xs: 'column', sm: 'row' },
		alignItems: { xs: 'flex-start', sm: 'center' },
		justifyContent: 'space-between',
		gap: { xs: 1, sm: 2 },
		py: { xs: 1.5, sm: 1 },
		px: 1.5,
		borderRadius: 1,
		bgcolor: 'action.hover',
	},
	linkedChip: {
		bgcolor: 'success.main',
		color: 'success.contrastText',
		fontWeight: 600,
		'& .MuiChip-icon': {
			color: 'inherit',
		},
	},
	editField: {
		width: '100%',
		maxWidth: { xs: '100%', sm: 260 },
		'& .MuiInputBase-input': {
			py: 0.5,
			textAlign: 'center',
		},
	},
};

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
		<Stack spacing={3}>
			{/* Avatar + login centered */}
			<Box sx={styles.avatarWrapper}>
				<Avatar sx={styles.avatar}>
					<PersonIcon />
				</Avatar>

				{loginEdit.isEditing
					? (
							<TextField
								size='small'
								value={loginEdit.value}
								onChange={(e) => loginEdit.setValue(e.target.value)}
								sx={styles.editField}
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton size='small' onClick={loginEdit.save} color='success'>
													<CheckIcon fontSize='small' />
												</IconButton>
												<IconButton size='small' onClick={loginEdit.cancel} color='error'>
													<CloseIcon fontSize='small' />
												</IconButton>
											</InputAdornment>
										),
									},
								}}
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
							<Box sx={styles.loginRow}>
								<Typography variant='h6' fontWeight={600}>
									{user.login}
								</Typography>
								<Tooltip title='Изменить логин'>
									<IconButton size='small' onClick={loginEdit.start}>
										<EditIcon sx={{ fontSize: 16 }} />
									</IconButton>
								</Tooltip>
							</Box>
						)}
			</Box>

			{/* Personal info */}
			<Stack spacing={1}>
				<Typography variant='subtitle2' color='text.secondary' sx={styles.sectionTitle}>
					Личная информация
				</Typography>

				{/* Email */}
				<Box sx={styles.infoRow}>
					<EmailOutlinedIcon sx={styles.infoIcon} />
					<Typography variant='body2' sx={styles.label}>
						Почта
					</Typography>
					<Typography variant='body2' color='text.secondary' fontStyle='italic' sx={styles.value}>
						Скоро будет доступно
					</Typography>
				</Box>

				{/* Last login date */}
				<Box sx={styles.infoRow}>
					<EventIcon sx={styles.infoIcon} />
					<Typography variant='body2' sx={styles.label}>
						Последний вход
					</Typography>
					<Typography variant='body1' sx={styles.value}>
						{dayjs(user.lastLoginDate).format('DD.MM.YYYY, HH:mm')}
					</Typography>
				</Box>
			</Stack>

			<Divider />

			{/* Bindings section */}
			<Stack spacing={1}>
				<Typography variant='subtitle2' color='text.secondary' sx={styles.sectionTitle}>
					Привязки
				</Typography>

				<Box sx={styles.bindingRow}>
					<Stack direction='row' alignItems='center' spacing={1.5}>
						<TelegramIcon sx={{ color: '#229ED9', fontSize: 24 }} />
						<Box>
							<Typography variant='body2' fontWeight={500}>
								Telegram
							</Typography>
							{user.tgId
								? (
										<Typography variant='caption' color='text.secondary'>
											ID:
											{' '}
											{user.tgId}
										</Typography>
									)
								: (
										<Typography variant='caption' color='text.secondary'>
											Не привязан
										</Typography>
									)}
						</Box>
					</Stack>

					{user.tgId
						? (
								<Chip
									icon={<LinkIcon />}
									label='Привязан'
									size='small'
									sx={styles.linkedChip}
								/>
							)
						: (
								<Button
									size='small'
									variant='outlined'
									startIcon={<LinkIcon />}
								>
									Привязать
								</Button>
							)}
				</Box>
			</Stack>
		</Stack>
	);
}
