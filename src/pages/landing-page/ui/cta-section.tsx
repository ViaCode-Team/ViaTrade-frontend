import {
	Box,
	Button,
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
		<Box ta='center' py={80}>
			<Stack gap='xl' align='center'>
				<Title order={2}>
					Готовы систематизировать свою
					{' '}
					<Text component='span' variant='gradient' gradient={brandGradient} inherit>
						торговлю
					</Text>
					?
				</Title>
				<Text c='dimmed' fz='lg' maw={600}>
					Начните использовать профессиональные инструменты для учета и анализа сделок, чтобы принимать решения на основе объективной статистики.
				</Text>
				<Group justify='center'>
					<Button
						component={Link}
						to={ROUTES.REGISTER}
						size='xl'
						color='brand'

						rightSection={<IconArrowRight size={20} stroke={1.5} />}
					>
						Попробовать
					</Button>
				</Group>
			</Stack>
		</Box>
	);
}
