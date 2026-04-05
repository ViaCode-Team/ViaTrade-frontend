import { Badge, Paper, Text } from '@mantine/core';
import { IconTimeline } from '@tabler/icons-react';

import type { Signal } from '@/entities/signal';

import classes from './signal-card.module.css';

type SignalCardProps = {
	signal: Signal;
	onClick: (signal: Signal) => void;
};

export function SignalCard({ signal, onClick }: SignalCardProps) {
	const isBuy = signal.direction === 'buy';

	return (
		<Paper
			onClick={() => onClick(signal)}
			className={classes.root}
			style={{
				borderLeftColor: isBuy ? '#2e7d32' : '#d32f2f',
			}}
			withBorder
		>
			<div className={classes.header}>
				<div className={classes.assetInfo}>
					<div>
						<Text fw='bold' size='lg' truncate style={{ maxWidth: 120 }}>
							{signal.asset}
						</Text>
						<Text size='xs' c='dimmed' style={{ whiteSpace: 'nowrap' }}>
							{signal.type === 'stock' ? 'Акция' : 'Фьючерс'}
						</Text>
					</div>
				</div>
				<Badge
					color={isBuy ? 'green' : 'red'}
					size='sm'
					fw={600}
					style={{ flexShrink: 0 }}
				>
					{isBuy ? 'Покупка' : 'Продажа'}
				</Badge>
			</div>

			<div className={classes.priceRow}>
				<div>
					<Text size='xs' c='dimmed'>Цена закрытия</Text>
					<Text fw='bold' truncate>
						$
						{signal.close.toFixed(2)}
					</Text>
				</div>
				<div style={{ textAlign: 'right' }}>
					<Text size='xs' c='dimmed'>Дата сигнала</Text>
					<div className={classes.dateCol}>
						<Text fw='bold' truncate>{signal.date}</Text>

						{signal.time && (
							<Text
								size='xs'
								style={{ whiteSpace: 'nowrap', fontSize: '0.7rem' }}
							>
								{signal.time}
							</Text>
						)}
					</div>
				</div>
			</div>

			<div className={classes.confidenceSection}>
				<div className={classes.confidenceHeader}>
					<Text size='xs' c='dimmed'>Надёжность сигнала</Text>
					<Text
						size='xs'
						fw='bold'
						c={signal.confidence >= 70 ? 'green' : 'yellow'}
						style={{ flexShrink: 0, marginLeft: 8 }}
					>
						{signal.confidence}
						%
					</Text>
				</div>
				<div className={classes.progressTrack}>
					<div
						className={classes.progressBar}
						style={{
							width: `${signal.confidence}%`,
							backgroundColor: signal.confidence >= 70
								? 'var(--mantine-color-green-6)'
								: 'var(--mantine-color-yellow-6)',
						}}
					/>
				</div>
			</div>

			<div className={classes.footer}>
				<IconTimeline size={18} style={{ flexShrink: 0, color: 'var(--mantine-color-dimmed)' }} />
				<Text size='sm' c='dimmed' truncate style={{ flex: 1, minWidth: 0 }}>
					{signal.strategy}
				</Text>
			</div>
		</Paper>
	);
}
