import { AuthFooter, AuthLayout } from '@/entities/auth';
import { LoginForm } from '@/features/login';
import { ROUTES } from '@/shared/model/routes';

export function LoginPage() {
	return (
		<AuthLayout title='Авторизация'>
			<LoginForm />

			<AuthFooter text='Нет аккаунта?' linkText='Регистрация' to={ROUTES.REGISTER} />
		</AuthLayout>
	);
}
