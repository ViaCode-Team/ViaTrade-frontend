import {
	Alert,
	Button,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';

import { brandGradient } from '@/app/providers/theme-provider/theme';

import { useLoginForm } from '../lib/use-login-form';

export function LoginForm() {
	const { form, apiError, isPending, handleSubmit } = useLoginForm();

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
				</Stack>

				<Button
					variant='gradient'
					gradient={brandGradient}
					size='md'
					type='submit'
					loading={isPending}
				>
					Войти
				</Button>
			</Stack>
		</form>
	);
}
