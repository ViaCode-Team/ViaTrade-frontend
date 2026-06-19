import {
	Alert,
	Button,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';

import { brandGradient } from '@/shared/lib/theme';

import { useRegisterForm } from './use-register-form';

export function RegisterForm() {
	const { form, apiError, isPending, handleSubmit } = useRegisterForm();

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap='lg'>
				{apiError && (
					<Alert color='red' variant='outline'>
						{apiError}
					</Alert>
				)}

				<Stack gap='sm'>
					<TextInput
						label='Логин'
						autoFocus
						key={form.key('login')}
						{...form.getInputProps('login')}
					/>
					<PasswordInput
						label='Пароль'
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>
					<PasswordInput
						label='Подтверждение пароля'
						key={form.key('confirmPassword')}
						{...form.getInputProps('confirmPassword')}
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
