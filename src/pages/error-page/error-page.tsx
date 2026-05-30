import {
	Button,
	Container,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconHome, IconRefresh } from '@tabler/icons-react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

import LogoIcon from '@/shared/assets/icons/logo-default.svg?react';

type ErrorPageProps = {
	statusCode?: number;
};

export function ErrorPage({ statusCode = 404 }: ErrorPageProps) {
	const navigate = useNavigate();
	const error = useRouteError();

	let status: string | number = statusCode;
	let title = 'Страница не найдена';
	let description = 'Запрашиваемая страница не существует или была удалена.';

	if (isRouteErrorResponse(error)) {
		status = error.status;

		if (error.status === 404) {
			title = 'Страница не найдена';
			description = 'Запрашиваемая страница не существует или была удалена.';
		}
		else if (error.status >= 500) {
			title = 'Внутренняя ошибка сервера';
			description = 'Сервис временно недоступен. Ведутся технические работы по устранению проблемы.';
		}
		else {
			title = `Ошибка ${error.status}`;
			description = error.statusText || (error.data && error.data.message) || 'Не удалось обработать запрос.';
		}
	}
	else if (error instanceof Error) {
		status = 'Ошибка';
		title = 'Системный сбой';
		description = 'Произошла критическая ошибка в работе приложения.';
	}

	return (
		<Container size='sm'>
			<Stack gap='xl' justify='center' align='center' h='100vh'>
				<Stack gap='xs' align='center' ta='center'>
					<LogoIcon width={100} height={100} />

					<Title c='var(--mantine-color-text)'>
						{status}
					</Title>

					<div>
						<Title order={2}>
							{title}
						</Title>

						<Text c='dimmed'>
							{description}
						</Text>
					</div>
				</Stack>

				<Group justify='center'>
					<Button
						variant='default'
						leftSection={<IconHome size={18} />}
						onClick={() => navigate('/')}
					>
						На главную
					</Button>

					{status !== 404 && (
						<Button
							variant='filled'
							leftSection={<IconRefresh size={18} />}
							onClick={() => window.location.reload()}
						>
							Обновить страницу
						</Button>
					)}
				</Group>
			</Stack>
		</Container>
	);
}
