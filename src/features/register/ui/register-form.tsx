import { Alert, Button, Stack, TextInput } from '@mantine/core';

import { brandGradient } from '@/shared/model/theme';

import { useRegisterForm } from '../lib/use-register-form';

export function RegisterForm() {
	const {
		formData,
		errors,
		apiError,
		isPending,
		setField,
		submit,
	} = useRegisterForm();

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
						label='Email'
						type='email'
						value={formData.email}
						onChange={(e) => setField('email', e.currentTarget.value)}
						error={errors.email}
					/>
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
					<TextInput
						label='Подтверждение пароля'
						type='password'
						value={formData.confirmPassword}
						onChange={(e) => setField('confirmPassword', e.currentTarget.value)}
						error={errors.confirmPassword}
					/>
				</Stack>

				<Button
					variant='gradient'
					gradient={brandGradient}
					size='md'
					type='submit'
					loading={isPending}
				>
					Зарегистрироваться
				</Button>
			</Stack>
		</form>
	);
}
