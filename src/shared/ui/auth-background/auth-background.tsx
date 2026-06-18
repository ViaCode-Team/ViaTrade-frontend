import type { ReactNode } from 'react';

import { Center } from '@mantine/core';
import clsx from 'clsx';

import cls from './auth-background.module.css';

export type Ticker = {
	id: number;
	name: string;
	price: string;
	up: boolean;
};

type AuthBackgroundProps = {
	children: ReactNode;
	tickers: Ticker[];
};

export function AuthBackground({ children, tickers }: AuthBackgroundProps) {
	return (
		<Center className={cls.container}>
			<div className={cls.tickersWrapper}>
				{tickers.map((ticker) => (
					<div key={ticker.id} className={clsx(cls.floatingTicker, cls[`ticker${ticker.id}`])}>
						<div className={cls.tickerName}>{ticker.name}</div>
						<div className={cls.tickerPrice}>
							{ticker.price}
							{' '}
							<span className={ticker.up ? cls.tickerPriceGreen : cls.tickerPriceRed}>{ticker.up ? '▲' : '▼'}</span>
						</div>
					</div>
				))}
			</div>

			<div className={cls.content}>
				{children}
			</div>
		</Center>
	);
}
