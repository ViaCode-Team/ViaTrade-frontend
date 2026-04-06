import {
	Button,
	Paper,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconMailCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/shared/model/routes';

import classes from './email-confirmation-page.module.css';

export function EmailConfirmationPage() {
	const navigate = useNavigate();

	return (
		<div className={classes.root}>
			<Title order={2} fw='bold' mb='sm'>
				Подтверждение почты
			</Title>

			<Paper withBorder p='lg' radius='md'>
				<Stack gap='sm'>
					<IconMailCheck size={30} />
					<Text fw={600}>Проверьте почтовый ящик и подтвердите e-mail по ссылке из письма.</Text>
					<Text c='dimmed' size='sm'>
						Если письмо не пришло, проверьте папку «Спам» или запросите отправку повторно.
					</Text>
					<Button variant='light' w='fit-content' onClick={() => navigate(ROUTES.PROFILE)}>
						Вернуться в профиль
					</Button>
				</Stack>
			</Paper>
		</div>
	);
}
