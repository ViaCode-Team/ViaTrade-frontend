import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import RemoveIcon from '@mui/icons-material/Remove';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type Signal = {
	id: string;
	strategy: string;
	asset: string;
	direction: 'buy' | 'sell' | 'hold';
	strength: number;
	timestamp: string;
};

type TradeStats = {
	totalTrades: number;
	profitableTrades: number;
	losingTrades: number;
	totalProfit: number;
	averageProfit: number;
	winRate: number;
	profitFactor: number;
	averageHoldTime: string;
};

const mockSignals: Signal[] = [
	{
		id: '1',
		strategy: 'RSI Divergence',
		asset: 'EUR/USD',
		direction: 'buy',
		strength: 85,
		timestamp: '10:45',
	},
	{
		id: '2',
		strategy: 'MACD Crossover',
		asset: 'GBP/JPY',
		direction: 'sell',
		strength: 72,
		timestamp: '10:30',
	},
	{
		id: '3',
		strategy: 'Bollinger Breakout',
		asset: 'BTC/USD',
		direction: 'buy',
		strength: 90,
		timestamp: '10:15',
	},
	{
		id: '4',
		strategy: 'Moving Average',
		asset: 'Gold',
		direction: 'hold',
		strength: 45,
		timestamp: '09:55',
	},
	{
		id: '5',
		strategy: 'Stochastic Oscillator',
		asset: 'ETH/USD',
		direction: 'buy',
		strength: 78,
		timestamp: '09:40',
	},
];

const mockStats: TradeStats = {
	totalTrades: 248,
	profitableTrades: 156,
	losingTrades: 92,
	totalProfit: 12450.75,
	averageProfit: 50.20,
	winRate: 62.9,
	profitFactor: 1.85,
	averageHoldTime: '4h 32m',
};

function getDirectionColor(direction: Signal['direction']) {
	switch (direction) {
		case 'buy':
			return { bg: 'success.light', text: 'success.contrastText', icon: <TrendingUpIcon /> };
		case 'sell':
			return { bg: 'error.light', text: 'error.contrastText', icon: <TrendingDownIcon /> };
		case 'hold':
			return { bg: 'grey.400', text: 'grey.50', icon: <RemoveIcon /> };
	}
}

function getDirectionLabel(direction: Signal['direction']) {
	switch (direction) {
		case 'buy':
			return 'Покупка';
		case 'sell':
			return 'Продажа';
		case 'hold':
			return 'Держать';
	}
}

function StatCard({
	icon,
	title,
	value,
	subtitle,
	color,
}: {
	icon: React.ReactNode;
	title: string;
	value: string | number;
	subtitle?: string;
	color: string;
}) {
	return (
		<Paper
			sx={{
				p: 3,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				transition: 'transform 0.2s, box-shadow 0.2s',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: 6,
				},
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
				<Box
					sx={{
						p: 1,
						borderRadius: 2,
						bgcolor: `${color}.lighter`,
						color: `${color}.main`,
						display: 'flex',
					}}
				>
					{icon}
				</Box>
				<Typography variant='subtitle2' color='text.secondary'>
					{title}
				</Typography>
			</Box>
			<Box>
				<Typography variant='h4' fontWeight='bold'>
					{value}
				</Typography>
				{subtitle && (
					<Typography variant='caption' color='text.secondary'>
						{subtitle}
					</Typography>
				)}
			</Box>
		</Paper>
	);
}

function SignalCard({ signal }: { signal: Signal }) {
	const colors = getDirectionColor(signal.direction);

	return (
		<Paper
			sx={{
				p: 2,
				transition: 'transform 0.2s, box-shadow 0.2s',
				'&:hover': {
					transform: 'translateX(4px)',
					boxShadow: 4,
				},
			}}
		>
			<Grid container spacing={2} alignItems='center'>
				<Grid size={12}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<Chip
								icon={colors.icon}
								label={getDirectionLabel(signal.direction)}
								sx={{
									bgcolor: colors.bg,
									color: colors.text,
									'& .MuiChip-icon': { color: 'inherit' },
									fontWeight: 600,
								}}
								size='small'
							/>
							<Typography variant='subtitle1' fontWeight='bold'>
								{signal.asset}
							</Typography>
						</Box>
						<Typography variant='caption' color='text.secondary'>
							{signal.timestamp}
						</Typography>
					</Box>
				</Grid>
				<Grid size={12}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='body2' color='text.secondary'>
							{signal.strategy}
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<Typography variant='caption' color='text.secondary'>
								Сила:
							</Typography>
							<Box
								sx={{
									width: 60,
									height: 6,
									bgcolor: 'grey.200',
									borderRadius: 3,
									overflow: 'hidden',
								}}
							>
								<Box
									sx={{
										width: `${signal.strength}%`,
										height: '100%',
										bgcolor: signal.strength >= 70 ? 'success.main' : signal.strength >= 50 ? 'warning.main' : 'grey.400',
										borderRadius: 3,
										transition: 'width 0.3s',
									}}
								/>
							</Box>
							<Typography variant='caption' fontWeight='bold' sx={{ minWidth: 30 }}>
								{signal.strength}
								%
							</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
}

export function DashboardPage() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' fontWeight='bold' gutterBottom>
				Панель управления
			</Typography>

			{/* Trade Statistics */}
			<Typography variant='h6' gutterBottom sx={{ mt: 3, mb: 2 }}>
				Статистика сделок
			</Typography>
			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={<AccountBalanceIcon />}
						title='Всего сделок'
						value={mockStats.totalTrades}
						subtitle={`Прибыльных: ${mockStats.profitableTrades} | Убыточных: ${mockStats.losingTrades}`}
						color='primary'
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={<AttachMoneyIcon />}
						title='Общая прибыль'
						value={`$${mockStats.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
						subtitle={`Средняя: $${mockStats.averageProfit.toFixed(2)}`}
						color='success'
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={<PercentIcon />}
						title='Win Rate'
						value={`${mockStats.winRate.toFixed(1)}%`}
						subtitle={`Profit Factor: ${mockStats.profitFactor}`}
						color='warning'
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={<TimerIcon />}
						title='Среднее время'
						value={mockStats.averageHoldTime}
						subtitle='на сделку'
						color='info'
					/>
				</Grid>
			</Grid>

			{/* Strategy Signals */}
			<Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<ShowChartIcon color='primary' />
					Сигналы от стратегий
				</Box>
			</Typography>
			<Paper sx={{ p: 2 }}>
				<Grid container spacing={2}>
					{mockSignals.map((signal) => (
						<Grid size={{ xs: 12, sm: 6, md: 4 }} key={signal.id}>
							<SignalCard signal={signal} />
						</Grid>
					))}
				</Grid>
			</Paper>
		</Box>
	);
}

export default DashboardPage;
