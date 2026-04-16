import {
	Badge,
	Card,
	Divider,
	Flex,
	Progress,
	Stack,
	Text,
} from '@mantine/core';
import { IconTimeline } from '@tabler/icons-react';

import type { Signal } from '@/entities/signal';

import cls from './signal-card.module.css';

type SignalCardProps = {
	signal: Signal;
	onClick: (signal: Signal) => void;
};

function getSignalDirectionColor(direction: Signal['direction']) {
	return direction === 'buy' ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)';
}

function getConfidenceColor(confidence: number) {
	return confidence >= 70 ? 'green.6' : 'yellow.6';
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
	const isBuy = signal.direction === 'buy';

	return (
		<Card
			onClick={() => onClick(signal)}
			className={cls.root}
			style={{
				borderLeftColor: getSignalDirectionColor(signal.direction),
			}}
			bg='transparent'
			withBorder
		>
			<Flex gap='xs'>
				<div className={cls.assetInfo}>
					<Text component='h3' size='lg' fw='bold' lineClamp={1}>
						{signal.asset}
					</Text>
					<Text size='xs' c='dimmed'>
						{signal.type === 'stock' ? 'Акция' : 'Фьючерс'}
					</Text>
				</div>

				<Badge
					color={isBuy ? 'green' : 'red'}
					size='sm'
				>
					{isBuy ? 'Покупка' : 'Продажа'}
				</Badge>
			</Flex>


			<Stack h='100%' gap='xs'>
				<div className={cls.priceRow}>
					<div>
						<Text size='sm' c='dimmed'>Цена закрытия</Text>
						<Text fw='bold' truncate>
							$
							{signal.close.toFixed(2)}
						</Text>
					</div>

					<div className={cls.dateInfo}>
						<Text size='sm' c='dimmed'>Дата сигнала</Text>
						<div className={cls.dateCol}>
							<Text fw='bold' truncate>{signal.date}</Text>

							<Text size='xs'>
								{signal.time}
							</Text>
						</div>
					</div>
				</div>

				<Stack gap={4} flex={1} justify='flex-end'>
					<Flex justify='space-between' wrap='nowrap'>
						<Text size='sm' c='dimmed'>Надёжность сигнала</Text>
						<Text
							size='xs'
							fw='bold'
							c={signal.confidence >= 70 ? 'green' : 'yellow'}
						>
							{signal.confidence}
							%
						</Text>
					</Flex>

					<Progress
						value={signal.confidence}
						bg='gray.4'
						color={getConfidenceColor(signal.confidence)}
					/>
				</Stack>
			</Stack>

			<Divider />

			<Flex gap={7} align='center'>
				<IconTimeline size={18} className={cls.strategyIcon} />
				<Text size='sm' c='dimmed' lineClamp={1}>
					{signal.strategy}
				</Text>
			</Flex>
		</Card>
	);
}
