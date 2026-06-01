import {
	Badge,
	Box,
	Card,
	Flex,
	NumberFormatter,
	Progress,
	Text,
	Title,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { generatePath, Link } from 'react-router';

import type { Signal } from '@/entities/signal';

import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { ROUTES } from '@/shared/model/routes';
import { InfoPair } from '@/shared/ui/info-pair';

import cls from './signal-card.module.css';

type SignalCardProps = {
	signal: Signal;
	onClick: (signal: Signal) => void;
};

function getConfidenceColor(confidence?: number) {
	if (confidence === undefined) {
		return 'gray';
	}

	return confidence >= 70 ? 'green' : 'yellow';
}

function getSignalDirectionLabel(signal: Signal) {
	switch (signal.direction) {
		case 'buy':
			return 'Покупать';
		case 'sell':
			return 'Продавать';
		case 'hold':
			return 'Держать';
	}
}

function getSignalDirectionColor(signal: Signal) {
	switch (signal.direction) {
		case 'buy':
			return 'green';
		case 'sell':
			return 'red';
		case 'hold':
			return 'gray';
	}
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
	const isBuy = signal.direction === 'buy';
	const isSell = signal.direction === 'sell';
	const directionColor = getSignalDirectionColor(signal);
	const leftBorderStyle = getLeftBorderCardStyle({
		color: isBuy
			? 'var(--mantine-color-green-light)'
			: isSell
				? 'var(--mantine-color-red-light)'
				: 'var(--mantine-color-gray-light)',
		hoverColor: isBuy
			? 'var(--mantine-color-green-filled)'
			: isSell
				? 'var(--mantine-color-red-filled)'
				: 'var(--mantine-color-gray-filled)',
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
						Инструмент
					</Text>
				</Box>

				<Badge
					variant='light'
					color={directionColor}
					size='sm'
					className={clsx(
						cls.directionBadge,
						isBuy && cls.directionBadgeGreen,
						isSell && cls.directionBadgeRed,
					)}
				>
					{getSignalDirectionLabel(signal)}
				</Badge>
			</Flex>

			<InfoPair
				gap='xs'
				items={[
					{
						label: 'Цена закрытия',
						value: <NumberFormatter value={signal.close} suffix=' ₽' decimalScale={3} thousandSeparator='&#8201;' />,
					},
					{
						label: 'Дата сигнала',
						value: (
							<>
								{signal.date}
								{signal.time && (
									<>
										{' '}
										<Text span size='xs'>
											{signal.time}
										</Text>
									</>
								)}
							</>
						),
					},
				]}
			/>

			<Flex direction='column' gap={4} mt='auto'>
				<Flex justify='space-between' wrap='nowrap'>
					<Text size='sm' c='dimmed'>Надёжность сигнала</Text>
					<Text
						size='sm'
						fw='bold'
						c={getConfidenceColor(signal.confidence)}
					>
						{signal.confidence === undefined ? 'Не указана' : `${signal.confidence}%`}
					</Text>
				</Flex>

				<Progress
					value={signal.confidence ?? 0}
					bg='gray.4'
					color={getConfidenceColor(signal.confidence)}
				/>
			</Flex>

			<Link
				to={generatePath(ROUTES.STRATEGY, { strategyName: signal.strategy })}
				className={cls.strategy}
			>
				<Text span size='sm' lineClamp={1}>
					{signal.strategy}
				</Text>

				<Flex flex='0 0 auto'>
					<IconChevronRight size={16} />
				</Flex>
			</Link>
		</Card>
	);
}
