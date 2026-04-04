import { Alert, Button, Stack, TextInput } from '@mantine/core';

import { brandGradient } from '@/shared/model/theme';

import { useLoginForm } from '../lib/use-login-form';

export function LoginForm() {
	const {
		formData,
		errors,
		apiError,
		isPending,
		setField,
		submit,
	} = useLoginForm();

	return (
		<form onSubmit={submit}>
			<Stack gap='lg'>
				{apiError && (
					<Alert color='red' variant='outline'>
						{apiError}
					</Alert>
				)}

				<Stack gap='sm'>
					<TextInput
						label='Логин'
						value={formData.login}
						onChange={(e) => setField('login', e.currentTarget.value)}
						error={errors.login}
					/>
					<TextInput
						label='Пароль'
						type='password'
						value={formData.password}
						onChange={(e) => setField('password', e.currentTarget.value)}
						error={errors.password}
					/>
				</Stack>

				<Button
					variant='gradient'
					gradient={brandGradient}
					size='lg'
					type='submit'
					fz={16}
					fw={600}
					loading={isPending}
				>
					Войти
				</Button>
			</Stack>
		</form>
	);
}
