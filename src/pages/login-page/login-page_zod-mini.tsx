import { Button, Stack, TextField, Typography } from '@mui/material';
import { type SyntheticEvent, useState } from 'react';
import { betterRuLocale } from 'zod-i18n-better-ru';
import { z } from 'zod/mini';

z.config(betterRuLocale());

const loginSchema = z.object({
	login: z.string().check(z.maxLength(128), z.minLength(1)),
	password: z.string().check(z.maxLength(32), z.minLength(1)),
});

type TLoginData = { login: string; password: string };

export const LoginForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<Partial<TLoginData>>({});

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const result = loginSchema.safeParse({ login, password });

		if (!result.success) {
			const { fieldErrors } = z.flattenError(result.error);
			setErrors({
				login: fieldErrors.login?.toString(),
				password: fieldErrors.password?.toString(),
			});
		}
	};

	return (
		<Stack
			gap={6}
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
			}}
		>
			<Typography variant='h3' component='h1'>
				Авторизация
			</Typography>
			<Stack
				component='form'
				onSubmit={handleSubmit}
				gap={4}
				sx={{
					width: '100%',
					maxWidth: 460,
				}}
			>
				<Stack gap={2}>
					<TextField
						label='Логин'
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						error={!!errors.login}
						helperText={errors.login}
					/>
					<TextField
						label='Пароль'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={!!errors.password}
						helperText={errors.password}
					/>
				</Stack>
				<Button
					color='secondary'
					variant='contained'
					size='large'
					type='submit'
				>
					Войти
				</Button>
			</Stack>
		</Stack>
	);
};

export default LoginForm;
