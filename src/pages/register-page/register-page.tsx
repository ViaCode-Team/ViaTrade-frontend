import { AuthFooter, AuthLayout } from '@/entities/auth';
import { RegisterForm } from '@/features/register';
import { ROUTES } from '@/shared/model/routes';

export function RegisterPage() {
	return (
		<AuthLayout title='Регистрация'>
			<RegisterForm />

			<AuthFooter text='Уже есть аккаунт?' linkText='Авторизация' to={ROUTES.LOGIN} />
		</AuthLayout>
	);
}

export default RegisterPage;
