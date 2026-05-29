import {
	Badge,
	Box,
	Card,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { Link as RouterLink } from 'react-router';

import type { DraftedPersonalNote } from '@/widgets/notes-overview/model/note-drafts';

export function DashboardNoteCard({ note }: { note: DraftedPersonalNote }) {
	const sourceType = note.source.type === 'stock' ? 'Акция' : 'Стратегия';

	return (
		<Card withBorder p='md'>
			<Stack gap='sm'>
				<Group justify='space-between'>
					<Badge variant='default' autoContrast>
						{sourceType}
					</Badge>
				</Group>

				<Box component={RouterLink} to={note.source.path} style={{ textDecoration: 'none', color: 'inherit' }}>
					<Title order={4} lineClamp={1}>
						{note.source.label}
					</Title>
					{note.source.description && (
						<Text size='sm' c='dimmed' lineClamp={1}>
							{note.source.description}
						</Text>
					)}
				</Box>

				<Text size='sm' lineClamp={3} style={{ whiteSpace: 'pre-wrap' }}>
					{note.text || <Text span c='dimmed'>Нет текста</Text>}
				</Text>
			</Stack>
		</Card>
	);
}
