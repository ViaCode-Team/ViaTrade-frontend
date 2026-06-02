import {
	Badge,
	Box,
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

export function HeroSection() {
	return (
		<Box py={120} pos='relative' style={{ overflow: 'hidden' }}>
			<Container size='lg' pos='relative'>
				<Stack align='center' gap={40}>
					<Badge variant='outline' color='gray' size='lg' radius='xl'>
						Аналитическая платформа
					</Badge>

					<Stack gap='md' align='center'>
						<Title
							order={1}
							ta='center'
							fw={900}
							fz={{ base: 40, md: 68 }}
							lh={1.1}
							tt='uppercase'
						>
							Инструменты для
							{' '}
							<Text component='span' variant='gradient' gradient={brandGradient} inherit>
								системного трейдинга
							</Text>
						</Title>

						<Text
							ta='center'
							fz={{ base: 'xl', md: 24 }}
							fw={500}
							c='white'
						>
							Принимайте решения на основе данных, а не эмоций
						</Text>
					</Stack>

					<Text
						c='dimmed'
						ta='center'
						fz={{ base: 'md', md: 'lg' }}
						maw={750}
					>
						Инструменты для анализа рынка, ведения торгового журнала и отслеживания статистики. Наглядные метрики для оценки эффективности и оптимизации вашей торговой системы.
					</Text>

					<Group justify='center' gap='md'>
						<Button
							component={Link}
							to={ROUTES.REGISTER}
							size='xl'
							rightSection={<IconArrowRight size={20} stroke={1.5} />}
						>
							Попробовать бесплатно
						</Button>
						<Button
							component={Link}
							to={ROUTES.LOGIN}
							size='xl'
							color='dark'
							variant='default'

						>
							Войти
						</Button>
					</Group>
				</Stack>
			</Container>
		</Box>
	);
}
