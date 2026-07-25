import type { LoginMutationError } from '@/entities/auth';

export function mapLoginApiError(error: LoginMutationError): string {
	if (error.name === 'NetworkError') {
		return 'Ошибка сети, проверьте подключение';
	}

	const status = 'details' in error && error.details?.status;

	switch (status) {
		case 401:
			return 'Неправильный логин или пароль';
		case 400:
			return 'Некорректные данные входа';
		case 500:
			return 'Ошибка сервера, попробуйте позже';
		case 503:
			return 'Сервис временно недоступен';
		default:
			return 'Неизвестная ошибка, попробуйте позже';
	}
}
