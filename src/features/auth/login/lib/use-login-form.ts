import { useForm } from '@mantine/form';
import { useState } from 'react';

import { useLogin } from '@/entities/auth';

import type { TLoginData } from '../model/login-data';

import { mapLoginApiError } from '../model/login-error-map';
import { getLoginFormErrors, validateLoginForm } from '../model/login-validation';

export function useLoginForm() {
	const [apiError, setApiError] = useState<string | null>(null);

	const { mutate, isPending } = useLogin({
		mutation: {
			onError: (error) => {
				setApiError(mapLoginApiError(error));
			},
		},
	});

	const form = useForm<TLoginData>({
		mode: 'uncontrolled',
		initialValues: {
			login: '',
			password: '',
		},
		validate: (values) => {
			const result = validateLoginForm(values);
			return getLoginFormErrors(result) as Record<string, string>;
		},
	});

	const handleSubmit = (values: TLoginData) => {
		setApiError(null);
		mutate({ data: values });
	};

	return {
		form,
		apiError,
		isPending,
		handleSubmit,
	};
}
