import { v } from '@/shared/model/validate';

import { loginSchema, type TLoginData } from './login-data';

export function validateLoginForm(data: unknown) {
	return v.safeParse(loginSchema, data);
}

export function getLoginFormErrors(
	result: ReturnType<typeof validateLoginForm>,
): Partial<Record<keyof TLoginData, string>> {
	if (!result.success) {
		const { nested } = v.flatten(result.issues);

		return {
			login: nested?.login?.[0],
			password: nested?.password?.[0],
		};
	}

	return {};
}
