'use client';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
	login: z.string().min(3, 'Логин должен содержать не менее 3 символов'),
	password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
});

export function LoginForm() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<{ login?: string; password?: string }>(
		{},
	);
	const router = useRouter();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const result = loginSchema.safeParse({ login, password });

		if (!result.success) {
			const { fieldErrors } = z.flattenError(result.error);

			setErrors({
				login: fieldErrors.login?.toString(),
				password: fieldErrors.password?.toString(),
			});
			return;
		}

		console.log('Login data:', result.data);
		router.push('/');
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
				Вход
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
				<Button variant='contained' type='submit'>
					Войти
				</Button>
			</Stack>
		</Stack>
	);
}
