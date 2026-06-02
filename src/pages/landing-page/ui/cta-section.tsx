import {
	Button,
	Container,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router';

import { ROUTES } from '@/shared/model/routes';
import { brandGradient } from '@/shared/model/theme';

export function CtaSection() {
	return (
		<Container size='lg' ta='center' py={80}>
			<Stack gap='xl' align='center'>
				<Title order={2}>
					Готовы вывести свой трейдинг на
					{' '}
					<Text component='span' variant='gradient' gradient={brandGradient} inherit>
						новый уровень
					</Text>
					?
				</Title>
				<Text c='dimmed' fz='lg' maw={600}>
					Присоединяйтесь к тысячам успешных трейдеров, которые уже используют наши сигналы, а также ведут подробную и удобную аналитику своих торгов для постоянного приумножения капитала.
				</Text>
				<Group justify='center'>
					<Button
						component={Link}
						to={ROUTES.REGISTER}
						size='xl'
						color='brand'
						radius='md'
						rightSection={<IconArrowRight size={20} stroke={1.5} />}
					>
						Начать прямо сейчас
					</Button>
				</Group>
			</Stack>
		</Container>
	);
}
