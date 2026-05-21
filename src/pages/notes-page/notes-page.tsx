import {
	Flex,
	Text,
	Title,
} from '@mantine/core';

import { NotesOverview } from '@/widgets/notes-overview';

export function NotesPage() {
	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Заметки</Title>
				<Text c='dimmed'>
					Единый список личных заметок по акциям и стратегиям.
				</Text>
			</Flex>

			<NotesOverview />
		</>
	);
}
