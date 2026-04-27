import {
	Badge,
	Box,
	Card,
	Flex,
	Progress,
	Text,
	Title,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { Link } from 'react-router';

import type { Signal } from '@/entities/signal';

import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { ROUTES } from '@/shared/model/routes';

import cls from './signal-card.module.css';

type SignalCardProps = {
	signal: Signal;
	onClick: (signal: Signal) => void;
};

function getConfidenceColor(confidence: number) {
	return confidence >= 70 ? 'green' : 'yellow';
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
	const isBuy = signal.direction === 'buy';
	const leftBorderStyle = getLeftBorderCardStyle({
		color: isBuy
			? 'var(--mantine-color-green-light)'
			: 'var(--mantine-color-red-light)',
		hoverColor: isBuy
			? 'var(--mantine-color-green-filled)'
			: 'var(--mantine-color-red-filled)',
	});

	return (
		<Card
			component='article'
			className={cls.root}
			variant='left-border'
			style={leftBorderStyle}
			bg='transparent'
			withBorder
		>
			<button
				type='button'
				className={cls.cardButton}
				onClick={() => onClick(signal)}
				aria-label={`Открыть историю сигнала ${signal.asset}`}
			/>

			<Flex gap='xs'>
				<Box flex={1}>
					<Title order={4} lineClamp={1}>
						{signal.asset}
					</Title>
					<Text size='sm' c='dimmed'>
						{signal.type === 'stock' ? 'Акция' : 'Фьючерс'}
					</Text>
				</Box>

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

			<Flex justify='space-between' gap='xs'>
				<div>
					<Text size='sm' c='dimmed'>
						Цена закрытия
					</Text>

					<Text fw='bold' lineClamp={1}>
						{signal.close.toFixed(2)}
						{' '}
						₽
					</Text>
				</div>

				<div>
					<Text ta='end' size='sm' c='dimmed'>Дата сигнала</Text>
					<Text ta='end' fw='bold' lineClamp={1}>
						{signal.date}
						{' '}
						<Text component='span'size='xs'>
							{signal.time}
						</Text>
					</Text>
				</div>
			</Flex>

			<Flex direction='column' gap={4} flex={1} justify='flex-end'>
				<Flex justify='space-between' wrap='nowrap'>
					<Text size='sm' c='dimmed'>Надёжность сигнала</Text>
					<Text
						size='sm'
						fw='bold'
						c={getConfidenceColor(signal.confidence)}
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
			</Flex>

			<Link
				to={ROUTES.STRATEGIES}
				className={cls.strategy}
			>
				<Text component='span' size='sm' lineClamp={1}>
					{signal.strategy}
				</Text>

				<Flex flex='0 0 auto'>
					<IconChevronRight size={16} />
				</Flex>
			</Link>
		</Card>
	);
}
