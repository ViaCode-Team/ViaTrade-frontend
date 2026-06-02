import {
	Container,
	Group,
	Paper,
	rem,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconBolt, IconBrain, IconShieldCheck } from '@tabler/icons-react';


const PRINCIPLES = [
	{ title: 'Точность данных', label: 'Своевременное обновление', icon: IconBolt, color: 'teal' },
	{ title: 'Прозрачная аналитика', label: 'Объективные метрики', icon: IconBrain, color: 'blue' },
	{ title: 'Доступность 24/7', label: 'Стабильная инфраструктура', icon: IconShieldCheck, color: 'green' },
];

export function StatsSection() {
	const principles = PRINCIPLES.map((principle) => (
		<Paper key={principle.label} p='md' shadow='sm' withBorder>
			<Group align='center'>
				<ThemeIcon size={40} variant='light' color={principle.color}>
					<principle.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
				</ThemeIcon>
				<div>
					<Text c='dimmed' size='sm' tt='uppercase' fw={700}>
						{principle.label}
					</Text>
					<Text fw={900} size='lg'>
						{principle.title}
					</Text>
				</div>
			</Group>
		</Paper>
	));

	return (
		<Container size='lg' py={60}>
			<Stack gap={50}>
				<Title order={2} ta='center'>
					Наши
					{' '}
					<Text component='span' c='brand' inherit>
						главные принципы
					</Text>
				</Title>
				<SimpleGrid cols={{ base: 1, sm: 3 }}>
					{principles}
				</SimpleGrid>
			</Stack>
		</Container>
	);
}
