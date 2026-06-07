import { Center } from '@mantine/core';

import { AuthCard } from '@/entities/auth';
import { LoginForm } from '@/features/auth/login';
import { ROUTES } from '@/shared/model/routes';

import cls from './login-page.module.css';

const TICKERS = [
	{ id: 1, name: 'SBER', price: '275.40', up: true },
	{ id: 2, name: 'GAZP', price: '164.25', up: false },
	{ id: 3, name: 'LKOH', price: '7230.0', up: true },
	{ id: 4, name: 'YNDX', price: '3420.5', up: true },
	{ id: 5, name: 'TCSG', price: '3150.0', up: false },
	{ id: 6, name: 'ROSN', price: '580.10', up: true },
	{ id: 7, name: 'MGNT', price: '6890.0', up: false },
	{ id: 8, name: 'MOEX', price: '210.45', up: true },
];

export function LoginPage() {
	return (
		<Center className={cls.container}>
			<div className={cls.tickersWrapper}>
				{TICKERS.map((ticker) => (
					<div key={ticker.id} className={`${cls.floatingTicker} ${cls[`ticker${ticker.id}`]}`}>
						<div className={cls.tickerName}>{ticker.name}</div>
						<div className={cls.tickerPrice}>
							{ticker.price}
							{' '}
							<span className={ticker.up ? cls.tickerPriceGreen : cls.tickerPriceRed}>{ticker.up ? '▲' : '▼'}</span>
						</div>
					</div>
				))}
			</div>

			<div style={{
				position: 'relative',
				zIndex: 5,
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
			}}
			>
				<AuthCard title='Авторизация'>
					<LoginForm />

					<AuthCard.Footer text='Нет аккаунта?' linkText='Регистрация' to={ROUTES.REGISTER} />
				</AuthCard>
			</div>
		</Center>
	);
}
