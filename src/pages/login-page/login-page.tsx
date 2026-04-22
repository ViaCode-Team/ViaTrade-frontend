import { AuthCard } from '@/entities/auth';
import { LoginForm } from '@/features/login';
import { ROUTES } from '@/shared/model/routes';

export function LoginPage() {
	return (
		<AuthCard title='Авторизация'>
			<LoginForm />

			<AuthCard.Footer text='Нет аккаунта?' linkText='Регистрация' to={ROUTES.REGISTER} />
		</AuthCard>
	);
}
