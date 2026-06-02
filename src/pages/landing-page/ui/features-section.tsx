import {
	Card,
	Container,
	rem,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import {
	IconAdjustments,
	IconChartBar,
	IconDeviceAnalytics,
	IconLayoutDashboard,
	IconTargetArrow,
	IconWifiOff,
} from '@tabler/icons-react';

import cls from './features-section.module.css';

const MOCKDATA = [
	{
		icon: IconChartBar,
		title: 'Торговые сигналы',
		description: 'Получайте проверенные сигналы в реальном времени, чтобы оперативно реагировать на изменения рынка и максимизировать прибыль.',
		color: 'teal',
	},
	{
		icon: IconAdjustments,
		title: 'Гибкая настройка',
		description: 'Вы сами можете конфигурировать параметры и типы сигналов, которые вам нужны, подстраивая алгоритмы под ваш индивидуальный стиль торговли.',
		color: 'orange',
	},
	{
		icon: IconDeviceAnalytics,
		title: 'Глубокая аналитика',
		description: 'Изучайте детальную статистику ваших сделок, находите слабые места и постоянно улучшайте свои торговые результаты.',
		color: 'blue',
	},
	{
		icon: IconTargetArrow,
		title: 'Эффективные стратегии',
		description: 'Доступ к базе успешных торговых стратегий. Читайте их подробные описания, адаптируйте под свой стиль торговли и минимизируйте риски.',
		color: 'green',
	},
	{
		icon: IconWifiOff,
		title: 'Офлайн доступ',
		description: 'Просматривайте сохраненную у вас информацию, аналитику и историю сделок даже без подключения к интернету благодаря PWA технологиям.',
		color: 'grape',
	},
	{
		icon: IconLayoutDashboard,
		title: 'Контроль рисков',
		description: 'Интуитивно понятные инструменты риск-менеджмента. Защитите свой депозит от просадок с помощью продуманных алгоритмов.',
		color: 'red',
	},
];

export function FeaturesSection() {
	const features = MOCKDATA.map((feature) => (
		<Card key={feature.title} shadow='md' radius='md' padding='xl' withBorder className={cls.card}>
			<Stack gap='sm'>
				<ThemeIcon
					size={50}
					radius='md'
					variant='light'
					color={feature.color}
				>
					<feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
				</ThemeIcon>
				<Text fz='lg' fw={500}>
					{feature.title}
				</Text>
				<Text c='dimmed' fz='sm'>
					{feature.description}
				</Text>
			</Stack>
		</Card>
	));

	return (
		<Container size='lg' py={80}>
			<Stack gap={50}>
				<Title order={2} ta='center'>
					Почему выбирают ViaTrade?
				</Title>
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl' verticalSpacing='xl'>
					{features}
				</SimpleGrid>
			</Stack>
		</Container>
	);
}
