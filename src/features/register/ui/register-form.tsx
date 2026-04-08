import {
	Alert,
	Button,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';

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
						autoFocus
					/>
					<TextInput
						label='Логин'
						value={formData.login}
						onChange={(e) => setField('login', e.currentTarget.value)}
						error={errors.login}
					/>
					<PasswordInput
						label='Пароль'
						value={formData.password}
						onChange={(e) => setField('password', e.currentTarget.value)}
						error={errors.password}
					/>
					<PasswordInput
						label='Подтверждение пароля'
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
