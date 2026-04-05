import {
	Badge,
	Group,
	Paper,
	SimpleGrid,
	Text,
	Title,
} from '@mantine/core';
import {
	IconBuildingBank,
	IconChartLine,
	IconClock,
	IconCurrencyDollar,
	IconMinus,
	IconPercentage,
	IconTrendingDown,
	IconTrendingUp,
} from '@tabler/icons-react';

import classes from './dashboard-page.module.css';

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

function getDirectionProps(direction: Signal['direction']) {
	switch (direction) {
		case 'buy':
			return { color: 'green' as const, icon: <IconTrendingUp size={14} />, label: 'Покупка' };
		case 'sell':
			return { color: 'red' as const, icon: <IconTrendingDown size={14} />, label: 'Продажа' };
		case 'hold':
			return { color: 'gray' as const, icon: <IconMinus size={14} />, label: 'Держать' };
	}
}

export function StatCard({
	icon,
	title,
	value,
	subtitle,
}: {
	icon: React.ReactNode;
	title: string;
	value: string | number;
	subtitle?: string;
	color: string;
}) {
	return (
		<Paper className={classes.statCard} withBorder p='lg'>
			<Group gap='sm' mb='sm'>
				<div className={classes.iconWrapper}>
					{icon}
				</div>
				<Text size='sm' c='dimmed'>
					{title}
				</Text>
			</Group>
			<div>
				<Title order={3} fw='bold'>
					{value}
				</Title>
				{subtitle && (
					<Text size='xs' c='dimmed'>
						{subtitle}
					</Text>
				)}
			</div>
		</Paper>
	);
}

function DashboardSignalCard({ signal }: { signal: Signal }) {
	const dir = getDirectionProps(signal.direction);

	return (
		<Paper className={classes.signalCard} withBorder p='sm'>
			<div className={classes.signalHeader}>
				<Group gap='xs'>
					<Badge
						color={dir.color}
						size='sm'
						leftSection={dir.icon}
						fw={600}
					>
						{dir.label}
					</Badge>
					<Text fw='bold'>{signal.asset}</Text>
				</Group>
				<Text size='xs' c='dimmed'>{signal.timestamp}</Text>
			</div>

			<div className={classes.signalFooter}>
				<Text size='sm' c='dimmed'>{signal.strategy}</Text>
				<Group gap='xs'>
					<Text size='xs' c='dimmed'>Сила:</Text>
					<div className={classes.strengthTrack}>
						<div
							className={classes.strengthBar}
							style={{
								width: `${signal.strength}%`,
								backgroundColor: signal.strength >= 70
									? 'var(--mantine-color-green-6)'
									: signal.strength >= 50
										? 'var(--mantine-color-yellow-6)'
										: 'var(--mantine-color-gray-5)',
							}}
						/>
					</div>
					<Text size='xs' fw='bold' style={{ minWidth: 30 }}>
						{signal.strength}
						%
					</Text>
				</Group>
			</div>
		</Paper>
	);
}

export function DashboardPage() {
	return (
		<div className={classes.root}>
			<Title order={2} fw='bold' mb='sm'>
				Панель управления
			</Title>

			<Title order={4} mt='lg' mb='sm'>
				Статистика сделок
			</Title>
			<SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='lg' mb='xl'>
				<StatCard
					icon={<IconBuildingBank size={22} />}
					title='Всего сделок'
					value={mockStats.totalTrades}
					subtitle={`Прибыльных: ${mockStats.profitableTrades} | Убыточных: ${mockStats.losingTrades}`}
					color='primary'
				/>
				<StatCard
					icon={<IconCurrencyDollar size={22} />}
					title='Общая прибыль'
					value={`$${mockStats.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
					subtitle={`Средняя: $${mockStats.averageProfit.toFixed(2)}`}
					color='success'
				/>
				<StatCard
					icon={<IconPercentage size={22} />}
					title='Win Rate'
					value={`${mockStats.winRate.toFixed(1)}%`}
					subtitle={`Profit Factor: ${mockStats.profitFactor}`}
					color='warning'
				/>
				<StatCard
					icon={<IconClock size={22} />}
					title='Среднее время'
					value={mockStats.averageHoldTime}
					subtitle='на сделку'
					color='info'
				/>
			</SimpleGrid>

			<Title order={4} mb='sm'>
				<Group gap='xs'>
					<IconChartLine size={20} />
					Сигналы от стратегий
				</Group>
			</Title>
			<Paper p='sm' withBorder>
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='sm'>
					{mockSignals.map((signal) => (
						<DashboardSignalCard key={signal.id} signal={signal} />
					))}
				</SimpleGrid>
			</Paper>
		</div>
	);
}
