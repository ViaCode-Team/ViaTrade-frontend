import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useSecurity } from '@/entities/security';
import { useLogin } from '@/entities/session';
import { invalidateGetMe } from '@/entities/user';
import { useCurrentUserQueryControl } from '@/shared/lib/auth';
import { clearLocalAuthBlocked, setPinSetupMark } from '@/shared/lib/secure-storage';

import type { TLoginData } from './login-data';

import { mapLoginApiError } from './login-error-map';
import { getLoginFormErrors, validateLoginForm } from './login-validation';

export function useLoginForm() {
	const [apiError, setApiError] = useState<string | null>(null);
	const queryClient = useQueryClient();
	const { checkSecurityState } = useSecurity();
	const { resumeCurrentUserQuery } = useCurrentUserQueryControl();

	const { mutate, isPending } = useLogin({
		skipInvalidation: true,
		mutation: {
			onSuccess: async () => {
				await clearLocalAuthBlocked();
				await setPinSetupMark();
				await checkSecurityState();
				resumeCurrentUserQuery();
				void invalidateGetMe(queryClient);
			},
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
