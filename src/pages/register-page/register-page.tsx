import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type SyntheticEvent, useState } from 'react';
import { Link } from 'react-router';

import { useRegister } from '@/entities/auth';
import { ROUTES } from '@/shared/model/routes';
import { v } from '@/shared/model/validate';

const registerSchema = v.object({
	email: v.pipe(v.string(), v.nonEmpty(), v.email(), v.maxLength(255)),
	login: v.pipe(v.string(), v.nonEmpty(), v.maxLength(128), v.minLength(3)),
	password: v.pipe(v.string(), v.nonEmpty(), v.maxLength(32), v.minLength(8)),
	confirmPassword: v.pipe(v.string(), v.nonEmpty()),
});

type TRegisterData = {
	email: string;
	login: string;
	password: string;
	confirmPassword: string;
};

export function RegisterPage() {
	const { mutate } = useRegister();
	const [email, setEmail] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errors, setErrors] = useState<Partial<TRegisterData>>({});

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const result = v.safeParse(registerSchema, {
			email,
			login,
			password,
			confirmPassword,
		});

		if (!result.success) {
			const { nested } = v.flatten(result.issues);

			setErrors({
				email: nested?.email?.[0],
				login: nested?.login?.[0],
				password: nested?.password?.[0],
				confirmPassword: nested?.confirmPassword?.[0],
			});

			return;
		}

		// Additional check for password match
		if (password !== confirmPassword) {
			setErrors({
				...errors,
				confirmPassword: 'Пароли не совпадают',
			});
			return;
		}

		mutate({ data: { login, password } });
		setErrors({});
	};

	return (
		<Stack alignItems='center' width={1} gap={6}>
			<Typography variant='h2' component='h1'>
				Регистрация
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
						label='Email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={!!errors.email}
						helperText={errors.email}
					/>
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
					<TextField
						label='Подтверждение пароля'
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword}
					/>
				</Stack>
				<Button
					color='secondary'
					variant='contained'
					size='large'
					type='submit'
					sx={{ fontSize: 16 }}
				>
					Зарегистрироваться
				</Button>
				<Stack direction='row' justifyContent='center' gap={1}>
					<Typography variant='body2' color='text.secondary'>
						Уже есть аккаунт?
					</Typography>
					<Typography
						component={Link}
						to={ROUTES.LOGIN}
						variant='body2'
						color='secondary.main'
						sx={{
							textDecoration: 'none',
							'&:hover': { textDecoration: 'underline' },
						}}
					>
						Войти
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default RegisterPage;
