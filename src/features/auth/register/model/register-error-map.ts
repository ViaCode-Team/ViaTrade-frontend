import type { RegisterMutationError } from '@/entities/auth';

export function mapRegisterApiError(error: RegisterMutationError): string {
	if (error.name === 'NetworkError') {
		return 'Ошибка сети, проверьте подключение';
	}

	const status = 'details' in error ? error.details?.status : undefined;

	switch (status) {
		case 409:
			return 'Пользователь с таким логином или email уже существует';
		case 400:
			return 'Некорректные данные регистрации';
		case 500:
			return 'Ошибка сервера, попробуйте позже';
		case 503:
			return 'Сервис временно недоступен';
		default:
			return 'Неизвестная ошибка, попробуйте позже';
	}
}
