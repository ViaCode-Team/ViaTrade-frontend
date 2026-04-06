import { Badge, Paper, Text } from '@mantine/core';
import { IconTimeline } from '@tabler/icons-react';

import type { Signal } from '@/entities/signal';

import classes from './signal-card.module.css';

type SignalCardProps = {
	signal: Signal;
	onClick: (signal: Signal) => void;
};

function getSignalDirectionColor(direction: Signal['direction']) {
	return direction === 'buy' ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)';
}

function getConfidenceColor(confidence: number) {
	return confidence >= 70 ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-yellow-6)';
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
	const isBuy = signal.direction === 'buy';

	return (
		<Paper
			onClick={() => onClick(signal)}
			className={classes.root}
			style={{
				borderLeftColor: getSignalDirectionColor(signal.direction),
			}}
			withBorder
		>
			<div className={classes.header}>
				<div className={classes.assetInfo}>
					<div>
						<Text fw='bold' size='lg' truncate className={classes.assetName}>
							{signal.asset}
						</Text>
						<Text size='xs' c='dimmed' className={classes.assetType}>
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
				<div className={classes.dateInfo}>
					<Text size='xs' c='dimmed'>Дата сигнала</Text>
					<div className={classes.dateCol}>
						<Text fw='bold' truncate>{signal.date}</Text>

						{signal.time && (
							<Text size='xs' className={classes.signalTime}>
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
						className={classes.confidenceValue}
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
							backgroundColor: getConfidenceColor(signal.confidence),
						}}
					/>
				</div>
			</div>

			<div className={classes.footer}>
				<IconTimeline size={18} className={classes.strategyIcon} />
				<Text size='sm' c='dimmed' truncate className={classes.strategy}>
					{signal.strategy}
				</Text>
			</div>
		</Paper>
	);
}
