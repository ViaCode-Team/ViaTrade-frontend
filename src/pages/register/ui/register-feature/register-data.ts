import { v } from '@/shared/lib/validation';

export const registerSchema = v.object({
	login: v.pipe(
		v.string('Введите логин'),
		v.nonEmpty('Логин обязателен для заполнения'),
		v.minLength(3, 'Логин должен содержать не менее 3 символов'),
		v.maxLength(128, 'Логин должен содержать не более 128 символов'),
	),
	password: v.pipe(
		v.string('Введите пароль'),
		v.nonEmpty('Пароль обязателен для заполнения'),
		v.minLength(8, 'Пароль должен содержать не менее 8 символов'),
		v.maxLength(32, 'Пароль должен содержать не более 32 символов'),
	),
	confirmPassword: v.pipe(
		v.string('Подтвердите пароль'),
		v.nonEmpty('Подтверждение пароля обязательно'),
	),
});

export type TRegisterData = v.InferInput<typeof registerSchema>;
