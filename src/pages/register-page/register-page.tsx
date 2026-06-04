import { Center } from '@mantine/core';

import { AuthCard } from '@/entities/auth';
import { RegisterForm } from '@/features/auth/register';
import { ROUTES } from '@/shared/model/routes';

import cls from './register-page.module.css';

const TICKERS = [
	{ id: 1, name: 'ALRS' },
	{ id: 2, name: 'SNGS' },
	{ id: 3, name: 'CHMF' },
	{ id: 4, name: 'NVTK' },
	{ id: 5, name: 'NLMK' },
	{ id: 6, name: 'TATN' },
	{ id: 7, name: 'PIKK' },
	{ id: 8, name: 'IRAO' },
];

export function RegisterPage() {
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
				<AuthCard title='Регистрация'>
					<RegisterForm />

					<AuthCard.Footer text='Уже есть аккаунт?' linkText='Авторизация' to={ROUTES.LOGIN} />
				</AuthCard>
			</div>
		</Center>
	);
}
