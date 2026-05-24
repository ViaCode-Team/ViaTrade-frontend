import {
	Card,
	Flex,
	Loader,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconNotesOff } from '@tabler/icons-react';

import cls from './notes-overview.module.css';

export function LoadingNotesState() {
	return (
		<Card withBorder p='xl' className={cls.emptyState}>
			<Stack gap='sm' align='center'>
				<Loader size='sm' />
				<Text size='sm' c='dimmed'>
					Заметки загружаются
				</Text>
			</Stack>
		</Card>
	);
}

type EmptyNotesStateProps = {
	hasNotes: boolean;
};

export function EmptyNotesState({ hasNotes }: EmptyNotesStateProps) {
	return (
		<Flex p='xl' align='center' justify='center'>
			<Stack gap='sm' align='center'>
				<ThemeIcon size='xl' variant='default'>
					<IconNotesOff size={24} />
				</ThemeIcon>

				<Stack gap={4} align='center'>
					<Title order={3}>
						{hasNotes ? 'По фильтрам ничего не найдено' : 'Заметок пока нет'}
					</Title>
					<Text c='dimmed' ta='center'>
						{hasNotes
							? 'Измените поиск или тип источника.'
							: 'Создайте заметку на странице акции или стратегии, и она появится здесь.'}
					</Text>
				</Stack>
			</Stack>
		</Flex>
	);
}
