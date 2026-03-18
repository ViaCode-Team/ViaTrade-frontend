import TimelineIcon from '@mui/icons-material/Timeline';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import type { Signal } from '@/entities/signal';

type SignalCardProps = {
	signal: Signal;
	onClick: (signal: Signal) => void;
};

export function SignalCard({ signal, onClick }: SignalCardProps) {
	const isBuy = signal.direction === 'buy';

	return (
		<Paper
			onClick={() => onClick(signal)}
			sx={{
				p: 2.0,
				cursor: 'pointer',
				transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				borderLeft: `4px solid ${isBuy ? '#2e7d32' : '#d32f2f'}`,
				'&:hover': {
					transform: 'translateY(-6px)',
					boxShadow: 12,
				},
				position: 'relative',
				overflow: 'hidden',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
				mb: 2,
				gap: 1,
			}}
			>
				<Box sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1.5,
					minWidth: 0,
					flex: 1,
				}}
				>
					<Box sx={{ minWidth: 0 }}>
						<Typography variant='h6' fontWeight='bold' noWrap sx={{ maxWidth: 120 }}>
							{signal.asset}
						</Typography>
						<Typography variant='caption' color='text.secondary' sx={{ whiteSpace: 'nowrap' }}>
							{signal.type === 'stock' ? 'Акция' : 'Фьючерс'}
						</Typography>
					</Box>
				</Box>
				<Chip
					label={isBuy ? 'Покупка' : 'Продажа'}
					color={isBuy ? 'success' : 'error'}
					size='small'
					sx={{ fontWeight: 600, flexShrink: 0 }}
				/>
			</Box>

			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				gap: 1,
			}}
			>
				<Box sx={{ minWidth: 0 }}>
					<Typography variant='caption' color='text.secondary'>Цена закрытия</Typography>
					<Typography variant='body1' fontWeight='bold' noWrap>
						$
						{signal.close.toFixed(2)}
					</Typography>
				</Box>
				<Box sx={{ textAlign: 'right', minWidth: 0 }}>
					<Typography variant='caption' color='text.secondary'>Дата сигнала</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
						<Typography variant='body1' fontWeight='bold' noWrap>{signal.date}</Typography>

						{signal.time && (
							<Typography
								variant='caption'
								sx={{
									whiteSpace: 'nowrap',
									fontSize: '0.7rem',
								}}
							>
								{signal.time}
							</Typography>
						)}
					</Box>
				</Box>
			</Box>

			<Box sx={{ mb: 1.5, mt: 'auto' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
					<Typography variant='caption' color='text.secondary'>Надёжность сигнала</Typography>
					<Typography variant='caption' fontWeight='bold' color={signal.confidence >= 70 ? 'success.main' : 'warning.main'} sx={{ flexShrink: 0, ml: 1 }}>
						{signal.confidence}
						%
					</Typography>
				</Box>
				<Box sx={{
					width: '100%',
					height: 8,
					bgcolor: 'grey.200',
					borderRadius: 4,
					overflow: 'hidden',
				}}
				>
					<Box
						sx={{
							height: '100%',
							width: `${signal.confidence}%`,
							bgcolor: signal.confidence >= 70 ? 'success.main' : 'warning.main',
							borderRadius: 4,
							transition: 'width 0.5s ease',
						}}
					/>
				</Box>
			</Box>

			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				pt: 1.5,
				borderTop: 1,
				borderColor: 'divider',

			}}
			>
				<TimelineIcon fontSize='small' color='action' sx={{ flexShrink: 0 }} />
				<Typography variant='body2' color='text.secondary' noWrap sx={{ flex: 1, minWidth: 0 }}>
					{signal.strategy}
				</Typography>
			</Box>
		</Paper>
	);
}
