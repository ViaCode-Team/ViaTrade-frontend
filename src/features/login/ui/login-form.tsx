import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useLoginForm } from '../lib/use-login-form';

export function LoginForm() {
	const {
		formData,
		errors,
		apiError,
		isPending,
		setField,
		submit,
	} = useLoginForm();

	return (
		<Stack component='form' onSubmit={submit} gap={4}>
			{apiError && (
				<Alert severity='error' variant='outlined'>
					{apiError}
				</Alert>
			)}

			<Stack gap={2}>
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
			</Stack>

			<Button
				color='secondary'
				variant='contained'
				size='large'
				type='submit'
				sx={{ fontSize: 16 }}
				loading={isPending}
			>
				Войти
			</Button>
		</Stack>
	);
}
