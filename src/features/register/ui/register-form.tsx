import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
		<Stack component='form' onSubmit={submit} gap={4}>
			{apiError && (
				<Alert severity='error' variant='outlined'>
					{apiError}
				</Alert>
			)}

			<Stack gap={2}>
				<TextField
					label='Email'
					type='email'
					value={formData.email}
					onChange={(e) => setField('email', e.target.value)}
					error={!!errors.email}
					helperText={errors.email}
					fullWidth
				/>
				<TextField
					label='Логин'
					value={formData.login}
					onChange={(e) => setField('login', e.target.value)}
					error={!!errors.login}
					helperText={errors.login}
					fullWidth
				/>
				<TextField
					label='Пароль'
					type='password'
					value={formData.password}
					onChange={(e) => setField('password', e.target.value)}
					error={!!errors.password}
					helperText={errors.password}
					fullWidth
				/>
				<TextField
					label='Подтверждение пароля'
					type='password'
					value={formData.confirmPassword}
					onChange={(e) => setField('confirmPassword', e.target.value)}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword}
					fullWidth
				/>
			</Stack>

			<Button
				color='secondary'
				variant='contained'
				size='large'
				type='submit'
				sx={{ fontSize: 16 }}
				loading={isPending}
			>
				Зарегистрироваться
			</Button>
		</Stack>
	);
}
