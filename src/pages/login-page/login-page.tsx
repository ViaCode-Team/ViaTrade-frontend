import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type SyntheticEvent, useState } from 'react';
import { Link } from 'react-router';

import { ROUTES } from '@/shared/model/routes';
import { v } from '@/shared/model/validate';

const loginSchema = v.object({
	login: v.pipe(v.string(), v.nonEmpty(), v.maxLength(128), v.minLength(3)),
	password: v.pipe(v.string(), v.nonEmpty(), v.maxLength(32), v.minLength(8)),
});

type TLoginData = { login: string; password: string };

export const LoginPage = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const [errors, setErrors] = useState<Partial<TLoginData>>({});

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const result = v.safeParse(loginSchema, { login, password });

		if (!result.success) {
			const { nested } = v.flatten(result.issues);

			setErrors({
				login: nested?.login?.[0],
				password: nested?.password?.[0],
			});

			return;
		}

		setErrors({});
	};

	return (
		<Stack width={1} alignItems='center' gap={6}>
			<Typography variant='h2' component='h1'>
				Авторизация
			</Typography>

			<Stack
				component='form'
				maxWidth={460}
				width={1}
				onSubmit={handleSubmit}
				gap={4}
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
					sx={{ fontSize: 16 }}
				>
					Войти
				</Button>
				<Stack direction='row' justifyContent='center' gap={1}>
					<Typography variant='body2' color='text.secondary'>
						Нет аккаунта?
					</Typography>
					<Typography
						component={Link}
						to={ROUTES.REGISTER}
						variant='body2'
						color='secondary.main'
						sx={{
							textDecoration: 'none',
							'&:hover': { textDecoration: 'underline' },
						}}
					>
						Зарегистрироваться
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LoginPage;
