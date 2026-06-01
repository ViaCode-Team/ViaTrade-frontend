import { useForm } from '@mantine/form';
import { useState } from 'react';

import { useRegister } from '@/entities/auth';

import type { TRegisterData } from '../model/register-data';

import { mapRegisterApiError } from '../model/register-error-map';
import { getRegisterFormErrors, validateRegisterForm } from '../model/register-validation';

export function useRegisterForm() {
	const [apiError, setApiError] = useState<string | null>(null);

	const { mutate, isPending } = useRegister({
		mutation: {
			onError: (error) => {
				setApiError(mapRegisterApiError(error));
			},
		},
	});

	const form = useForm<TRegisterData>({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			login: '',
			password: '',
			confirmPassword: '',
		},
		validate: (values) => {
			const result = validateRegisterForm(values);
			const errors = getRegisterFormErrors(result) as Record<string, string>;

			if (values.password !== values.confirmPassword) {
				errors.confirmPassword = 'Пароли не совпадают';
			}

			return errors;
		},
	});

	const handleSubmit = (values: TRegisterData) => {
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
