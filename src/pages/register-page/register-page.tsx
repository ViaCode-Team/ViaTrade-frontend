import { AuthCard } from '@/entities/auth';
import { RegisterForm } from '@/features/auth/register';
import { ROUTES } from '@/shared/model/routes';

export function RegisterPage() {
	return (
		<AuthCard title='Регистрация'>
			<RegisterForm />

			<AuthCard.Footer text='Уже есть аккаунт?' linkText='Авторизация' to={ROUTES.LOGIN} />
		</AuthCard>
	);
}
