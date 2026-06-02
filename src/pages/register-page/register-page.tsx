import { Center } from '@mantine/core';

import { AuthCard } from '@/entities/auth';
import { RegisterForm } from '@/features/auth/register';
import { ROUTES } from '@/shared/model/routes';

import cls from './register-page.module.css';

const TICKERS = [
	{ id: 1, name: 'ALRS', price: '74.20', up: true },
	{ id: 2, name: 'SNGS', price: '32.15', up: false },
	{ id: 3, name: 'CHMF', price: '1540.0', up: true },
	{ id: 4, name: 'NVTK', price: '1420.5', up: false },
	{ id: 5, name: 'NLMK', price: '210.30', up: true },
	{ id: 6, name: 'TATN', price: '680.10', up: true },
	{ id: 7, name: 'PIKK', price: '890.0', up: false },
	{ id: 8, name: 'IRAO', price: '4.45', up: true },
];

export function RegisterPage() {
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
				<AuthCard title='Регистрация'>
					<RegisterForm />

					<AuthCard.Footer text='Уже есть аккаунт?' linkText='Авторизация' to={ROUTES.LOGIN} />
				</AuthCard>
			</div>
		</Center>
	);
}
