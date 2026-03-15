import { v } from '@/shared/model/validate';

export const registerSchema = v.object({
	email: v.pipe(
		v.string('Введите email'),
		v.nonEmpty('Email обязателен для заполнения'),
		v.email('Некорректный формат email'),
		v.maxLength(255, 'Email слишком длинный'),
	),
	login: v.pipe(
		v.string('Введите логин'),
		v.nonEmpty('Логин обязателен для заполнения'),
		v.minLength(3, 'Логин должен содержать не менее 3 символов'),
		v.maxLength(128, 'Логин слишком длинный'),
	),
	password: v.pipe(
		v.string('Введите пароль'),
		v.nonEmpty('Пароль обязателен для заполнения'),
		v.minLength(8, 'Пароль должен содержать не менее 8 символов'),
		v.maxLength(32, 'Пароль слишком длинный'),
	),
	confirmPassword: v.pipe(
		v.string('Подтвердите пароль'),
		v.nonEmpty('Подтверждение пароля обязательно'),
	),
});

export type TRegisterData = v.InferInput<typeof registerSchema>;
