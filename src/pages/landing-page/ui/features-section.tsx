import {
	Box,
	Card,
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
		title: 'Аналитика рынка',
		description: 'Инструменты для мониторинга рынка в реальном времени и отслеживания интересующих активов.',
		color: 'teal',
	},
	{
		icon: IconAdjustments,
		title: 'Кастомизация',
		description: 'Настраивайте дашборды, фильтры и уведомления под ваши конкретные задачи и торговую систему.',
		color: 'orange',
	},
	{
		icon: IconDeviceAnalytics,
		title: 'Статистика сделок',
		description: 'Подробный анализ истории торгов: винрейт, просадки, профит-фактор и другие ключевые метрики.',
		color: 'blue',
	},
	{
		icon: IconTargetArrow,
		title: 'Журнал трейдера',
		description: 'Ведите детальный учет сделок, добавляйте комментарии и теги для последующего анализа и работы над ошибками.',
		color: 'green',
	},
	{
		icon: IconWifiOff,
		title: 'Офлайн доступ',
		description: 'Просматривайте сохраненную аналитику и историю сделок без постоянного подключения к сети благодаря PWA.',
		color: 'grape',
	},
	{
		icon: IconLayoutDashboard,
		title: 'Управление рисками',
		description: 'Встроенные калькуляторы позиций и инструменты для оценки риск-менеджмента перед открытием сделок.',
		color: 'red',
	},
];

export function FeaturesSection() {
	const features = MOCKDATA.map((feature) => (
		<Card key={feature.title} shadow='md' padding='xl' withBorder className={cls.card}>
			<Stack gap='sm'>
				<ThemeIcon
					size={50}

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
		<Box py={80}>
			<Stack gap={50}>
				<Title order={2} ta='center'>
					Почему выбирают ViaTrade?
				</Title>
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl' verticalSpacing='xl'>
					{features}
				</SimpleGrid>
			</Stack>
		</Box>
	);
}
