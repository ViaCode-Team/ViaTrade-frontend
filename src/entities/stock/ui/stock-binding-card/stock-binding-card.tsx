import {
	Card,
	Checkbox,
	Flex,
	Text,
	Title,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import { ROUTES } from '@/shared/model';

import type { Stock } from '../../model';

import cls from './stock-binding-card.module.css';

type StockBindingCardProps = {
	stock: Stock;
	isSelected: boolean;
	onSelectedChange: (stockId: string, checked: boolean) => void;
	ariaLabel?: string;
};

export function StockBindingCard({
	stock,
	isSelected,
	onSelectedChange,
	ariaLabel,
}: StockBindingCardProps) {
	const stockPath = generatePath(ROUTES.STOCK, {
		stockId: stock.ticker.toLowerCase(),
	});

	return (
		<Card
			component='article'
			bg='transparent'
			withBorder
			padding='sm'
			data-selected={isSelected}
			className={cls.card}
		>
			<Flex gap='sm' align='center'>
				<div className={cls.checkboxColumn}>
					<Checkbox
						checked={isSelected}
						onChange={(event) => {
							onSelectedChange(stock.id, event.currentTarget.checked);
						}}
						size='md'
						aria-label={ariaLabel ?? `Связать ${stock.ticker}`}
					/>
				</div>

				<RouterLink
					to={stockPath}
					className={cls.stockLink}
					aria-label={`Открыть описание акции ${stock.ticker}`}
				>
					<div className={cls.stockInfo}>
						<Title order={4} lineClamp={1} className={cls.ticker}>
							{stock.ticker}
						</Title>

						<Text size='sm' c='dimmed' lineClamp={1}>
							{stock.name}
						</Text>
					</div>
				</RouterLink>
			</Flex>
		</Card>
	);
}
