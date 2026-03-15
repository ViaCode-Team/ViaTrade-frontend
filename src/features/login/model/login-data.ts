import { v } from '@/shared/model/validate';

export const loginSchema = v.object({
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
});

export type TLoginData = v.InferInput<typeof loginSchema>;
