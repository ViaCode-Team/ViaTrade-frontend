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
	{ title: 'Молниеносные сигналы', label: 'Скорость реакции алгоритма', icon: IconBolt, color: 'teal' },
	{ title: 'Обоснованные стратегии', label: 'Опора на исторические данные', icon: IconBrain, color: 'blue' },
	{ title: 'Надежность 24/7', label: 'Стабильность инфраструктуры', icon: IconShieldCheck, color: 'green' },
];

export function StatsSection() {
	const principles = PRINCIPLES.map((principle) => (
		<Paper key={principle.label} p='md' radius='md' shadow='sm' withBorder>
			<Group align='center'>
				<ThemeIcon size={40} radius='md' variant='light' color={principle.color}>
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
