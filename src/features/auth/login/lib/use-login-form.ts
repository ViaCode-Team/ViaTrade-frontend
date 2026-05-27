import { type SubmitEvent, useState } from 'react';

import type { LoginMutationError } from '@/entities/auth';

import { useLogin } from '@/entities/auth';

import type { TLoginData } from '../model/login-data';

import { mapLoginApiError } from '../model/login-error-map';
import { getLoginFormErrors, validateLoginForm } from '../model/login-validation';

type TLoginErrors = Partial<Record<keyof TLoginData, string>>;

type UseLoginFormOptions = {
	onError?: (error: LoginMutationError) => void;
};

type UseLoginFormReturn = {
	formData: TLoginData;
	errors: TLoginErrors;
	apiError: string | null;
	isPending: boolean;
	setField: (field: keyof TLoginData, value: string) => void;
	submit: (e: SubmitEvent<HTMLFormElement>) => void;
};

export function useLoginForm(options?: UseLoginFormOptions): UseLoginFormReturn {
	const [formData, setFormData] = useState<TLoginData>({
		login: '',
		password: '',
	});
	const [errors, setErrors] = useState<TLoginErrors>({});
	const [apiError, setApiError] = useState<string | null>(null);

	const { mutate, isPending } = useLogin({
		mutation: {
			onError: (error: LoginMutationError) => {
				setApiError(mapLoginApiError(error));
				options?.onError?.(error);
			},
		},
	});

	const setField = (field: keyof TLoginData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const submit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = validateLoginForm(formData);

		if (!result.success) {
			setErrors(getLoginFormErrors(result));
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
