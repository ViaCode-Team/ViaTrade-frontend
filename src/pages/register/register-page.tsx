import { AuthCard, AuthCardLink } from '@/entities/session';
import { ROUTES } from '@/shared/model';
import { AuthBackground } from '@/shared/ui/auth-background';

import { RegisterForm } from './ui/register-feature';

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
		<AuthBackground tickers={TICKERS}>
			<AuthCard title='Регистрация'>
				<RegisterForm />

				<AuthCardLink text='Уже есть аккаунт?' linkText='Авторизация' to={ROUTES.LOGIN} />
			</AuthCard>
		</AuthBackground>
	);
}
