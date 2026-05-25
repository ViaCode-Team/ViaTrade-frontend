import {
	Flex,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconNotesOff } from '@tabler/icons-react';


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
