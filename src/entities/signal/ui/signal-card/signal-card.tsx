import {
	Badge,
	Card,
	Flex,
	Progress,
	Stack,
	Text,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { Link } from 'react-router';

import type { Signal } from '@/entities/signal';

import { ROUTES } from '@/shared/model/routes';

import cls from './signal-card.module.css';

type SignalCardProps = {
	signal: Signal;
	onClick: (signal: Signal) => void;
};

function getConfidenceColor(confidence: number) {
	return confidence >= 70 ? 'green.6' : 'yellow.6';
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
	const isBuy = signal.direction === 'buy';

	return (
		<Card
			onClick={() => onClick(signal)}
			className={clsx(cls.root, isBuy ? cls.rootBuy : cls.rootSell)}
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
					variant='light'
					color={isBuy ? 'green' : 'red'}
					size='sm'
					className={clsx(
						cls.directionBadge,
						isBuy ? cls.directionBadgeGreen : cls.directionBadgeRed,
					)}
				>
					{isBuy ? 'Покупка' : 'Продажа'}
				</Badge>
			</Flex>


			<Stack h='100%' gap='xs'>
				<Flex justify='space-between' gap='xs'>
					<Flex direction='column'>
						<Text size='sm' c='dimmed'>Цена закрытия</Text>
						<Text fw='bold' lineClamp={1}>
							$
							{signal.close.toFixed(2)}
						</Text>
					</Flex>

					<div>
						<Text ta='end' size='sm' c='dimmed'>Дата сигнала</Text>
						<Text ta='end' fw='bold' lineClamp={1}>{signal.date}</Text>

						<Text ta='end' size='xs' lineClamp={1}>
							{signal.time}
						</Text>
					</div>
				</Flex>

				<Stack gap={4} flex={1} justify='flex-end'>
					<Flex justify='space-between' wrap='nowrap'>
						<Text size='sm' c='dimmed'>Надёжность сигнала</Text>
						<Text
							size='sm'
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


			<Link
				to={ROUTES.STRATEGIES}
				onClick={(event) => event.stopPropagation()}
				className={cls.strategy}
			>
				<Text component='span' size='sm' lineClamp={1}>
					{signal.strategy}
				</Text>

				<Flex component='span' flex='0 0 auto'>
					<IconChevronRight size={16} />
				</Flex>
			</Link>
		</Card>
	);
}
