import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type SyntheticEvent, useState } from 'react';

import { v } from '@/shared/model/validate';

const loginSchema = v.object({
	login: v.pipe(v.string(), v.nonEmpty(), v.maxLength(128), v.minLength(3)),
	password: v.pipe(v.string(), v.nonEmpty(), v.maxLength(32), v.minLength(8)),
});

type TLoginData = { login: string; password: string };

// Todo: Variant for button
// export const GlassBtn = styled(Button)(() => ({
// 	background: 'rgba(255,255,255,0.06)',
// 	backdropFilter: 'blur(6px)',
// 	border: '1px solid rgba(255,255,255,0.08)',
// 	color: '#fff',
// 	textTransform: 'none',
// 	padding: '8px 18px',
// 	borderRadius: 10,
// 	'&:hover': {
// 		background: 'rgba(255,255,255,0.1)',
// 	},
// }));

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
		<Stack alignItems='center' width={1} gap={6}>
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
			</Stack>
		</Stack>
	);
};

export default LoginPage;
