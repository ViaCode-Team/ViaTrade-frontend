import { AuthCard, AuthCardLink } from '@/entities/auth';
import { LoginForm } from '@/pages/login/ui/login-feature';
import { ROUTES } from '@/shared/model';
import { AuthBackground } from '@/shared/ui/auth-background';

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
		<AuthBackground tickers={TICKERS}>
			<AuthCard title='Авторизация'>
				<LoginForm />

				<AuthCardLink text='Нет аккаунта?' linkText='Регистрация' to={ROUTES.REGISTER} />
			</AuthCard>
		</AuthBackground>
	);
}
