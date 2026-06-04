import { Center } from '@mantine/core';

import { AuthCard } from '@/entities/auth';
import { LoginForm } from '@/features/auth/login';
import { ROUTES } from '@/shared/model/routes';

import cls from './login-page.module.css';

const TICKERS = [
	{ id: 1, name: 'SBER' },
	{ id: 2, name: 'GAZP' },
	{ id: 3, name: 'LKOH' },
	{ id: 4, name: 'YNDX' },
	{ id: 5, name: 'TCSG' },
	{ id: 6, name: 'ROSN' },
	{ id: 7, name: 'MGNT' },
	{ id: 8, name: 'MOEX' },
];

export function LoginPage() {
	return (
		<Center className={cls.container}>
			<div className={cls.tickersWrapper}>
				{TICKERS.map((ticker) => (
					<div key={ticker.id} className={`${cls.floatingTicker} ${cls[`ticker${ticker.id}`]}`}>
						<div className={cls.tickerName}>{ticker.name}</div>
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
