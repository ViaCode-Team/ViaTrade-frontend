import {
	Box,
	Container,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';

const STEPS = [
	{
		title: 'Создайте аккаунт',
		description: 'Пройдите быструю регистрацию и получите доступ к базовому функционалу.',
	},
	{
		title: 'Выберите стратегию',
		description: 'Изучите доступные подходы и выберите тот, который подходит вашему стилю.',
	},
	{
		title: 'Получайте сигналы',
		description: 'Наши алгоритмы круглосуточно анализируют рынок и присылают вам уведомления.',
	},
	{
		title: 'Действуйте',
		description: 'Совершайте сделки на основе полученных данных, ведите удобную аналитику своих торгов и оптимизируйте результаты.',
	},
];

export function HowItWorksSection() {
	const steps = STEPS.map((step, index) => (
		<Box key={step.title} style={{ position: 'relative' }}>
			<Group align='flex-start' wrap='nowrap' gap='md'>
				<Text
					fw={900}
					fz={50}
					lh={1}
					style={{
						color: 'var(--mantine-color-gray-2)',
					}}
				>
					0
					{index + 1}
				</Text>
				<Stack gap='xs' mt={10}>
					<Text fz='lg' fw={700}>
						{step.title}
					</Text>
					<Text c='dimmed' fz='sm'>
						{step.description}
					</Text>
				</Stack>
			</Group>
		</Box>
	));

	return (
		<Container size='lg' py={80} pos='relative'>
			<Stack gap={60}>
				<Title order={2} ta='center' tt='uppercase'>
					Как это работает
				</Title>
				<SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
					{steps}
				</SimpleGrid>
			</Stack>
		</Container>
	);
}
