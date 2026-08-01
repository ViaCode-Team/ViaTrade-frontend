import {
	Alert,
	Button,
	PasswordInput,
	Stack,
	TextInput,
} from '@mantine/core';

import { brandGradient } from '@/shared/lib/theme';

import { useLoginForm } from './use-login-form';

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
						name='username'
						autoComplete='username'
						spellCheck={false}
					/>
					<PasswordInput
						label='Пароль'
						key={form.key('password')}
						{...form.getInputProps('password')}
						name='password'
						autoComplete='current-password'
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
