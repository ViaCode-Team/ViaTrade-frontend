import { type SyntheticEvent, useState } from 'react';

import type { RegisterMutationError } from '@/entities/auth';

import { useRegister } from '@/entities/auth';

import type { TRegisterData } from '../model/register-data';

import { mapRegisterApiError } from '../model/register-error-map';
import {
	getRegisterFormErrors,
	validateRegisterForm,
} from '../model/register-validation';

type TRegisterErrors = Partial<Record<keyof TRegisterData, string>>;

type UseRegisterFormOptions = {
	onError?: (error: RegisterMutationError) => void;
};

type UseRegisterFormReturn = {
	formData: TRegisterData;
	errors: TRegisterErrors;
	apiError: string | null;
	isPending: boolean;
	setField: (field: keyof TRegisterData, value: string) => void;
	submit: (e: SyntheticEvent) => void;
};

export function useRegisterForm(options?: UseRegisterFormOptions): UseRegisterFormReturn {
	const [formData, setFormData] = useState<TRegisterData>({
		email: '',
		login: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState<TRegisterErrors>({});
	const [apiError, setApiError] = useState<string | null>(null);

	const { mutate, isPending } = useRegister({
		mutation: {
			onError: (error: RegisterMutationError) => {
				setApiError(mapRegisterApiError(error));
				options?.onError?.(error);
			},
		},
	});

	const setField = (field: keyof TRegisterData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const submit = (e: SyntheticEvent) => {
		e.preventDefault();

		const result = validateRegisterForm(formData);

		if (!result.success) {
			setErrors(getRegisterFormErrors(result));
			return;
		}

		// Additional check for password match
		if (formData.password !== formData.confirmPassword) {
			setErrors((prev) => ({
				...prev,
				confirmPassword: 'Пароли не совпадают',
			}));
			return;
		}

		mutate({ data: formData });
		setErrors({});
	};

	return {
		formData,
		errors,
		apiError,
		isPending,
		setField,
		submit,
	};
}
