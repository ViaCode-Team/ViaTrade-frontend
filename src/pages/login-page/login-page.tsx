import { Button, Stack, TextField, Typography } from '@mui/material';
import { type SyntheticEvent, useState } from 'react';
import * as v from 'valibot';
import 'valibot-i18n-better-ru';
// const loginSchema = z.object({
// 	login: z.string().max(128),
// 	password: z.string().max(32),
// });

v.setGlobalConfig({ lang: 'better-ru' });

const loginSchema = v.object({
	login: v.pipe(v.string(), v.nonEmpty(), v.maxLength(128)),
	password: v.pipe(v.string(), v.nonEmpty(), v.maxLength(32)),
});

type TLoginData = { login: string; password: string };

export const LoginForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<Partial<TLoginData>>({});

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const result = v.safeParse(loginSchema, { login, password });

		if (!result.success) {
			const s = v.flatten(result.issues);
			setErrors({
				login: s.nested?.login?.[0],
				password: s.nested?.password?.[0],
			});
			return;
		}

		setErrors({});
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
