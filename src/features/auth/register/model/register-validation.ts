import { v } from '@/shared/model/validate';

import { registerSchema, type TRegisterData } from './register-data';

export function validateRegisterForm(data: unknown) {
	return v.safeParse(registerSchema, data);
}

export function getRegisterFormErrors(
	result: ReturnType<typeof validateRegisterForm>,
): Partial<Record<keyof TRegisterData, string>> {
	if (!result.success) {
		const { nested } = v.flatten(result.issues);

		return {
			login: nested?.login?.[0],
			password: nested?.password?.[0],
			confirmPassword: nested?.confirmPassword?.[0],
		};
	}

	return {};
}
