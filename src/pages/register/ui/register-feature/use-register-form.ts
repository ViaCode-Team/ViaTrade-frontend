import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useSecurity } from '@/entities/security';
import { getGetSessionsQueryKey } from '@/entities/session';
import { getGetMeQueryKey, useRegister } from '@/entities/user';
import { useCurrentUserQueryControl } from '@/shared/lib/auth';
import { clearLocalAuthBlocked, setPinSetupMark } from '@/shared/lib/secure-storage';

import type { TRegisterData } from './register-data';

import { mapRegisterApiError } from './register-error-map';
import { getRegisterFormErrors, validateRegisterForm } from './register-validation';

export function useRegisterForm() {
	const [apiError, setApiError] = useState<string | null>(null);
	const queryClient = useQueryClient();
	const { checkSecurityState } = useSecurity();
	const { resumeCurrentUserQuery } = useCurrentUserQueryControl();

	const { mutate, isPending } = useRegister({
		skipInvalidation: true,
		mutation: {
			onSuccess: async () => {
				await clearLocalAuthBlocked();
				await setPinSetupMark();
				await checkSecurityState();
				resumeCurrentUserQuery();

				await Promise.all([
					queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() }),
					queryClient.invalidateQueries({ queryKey: getGetSessionsQueryKey() }),
				]);
			},
			onError: (error) => {
				setApiError(mapRegisterApiError(error));
			},
		},
	});

	const form = useForm<TRegisterData>({
		mode: 'uncontrolled',
		initialValues: {
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
