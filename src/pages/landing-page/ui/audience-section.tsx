import {
	Box,
	Group,
	rem,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconBriefcase, IconChartLine, IconSchool } from '@tabler/icons-react';

import cls from './audience-section.module.css';

const AUDIENCES = [
	{
		title: 'Начинающим трейдерам',
		description: 'Структурируйте свой подход к торговле с первых дней с помощью удобного журнала сделок и наглядной статистики.',
		icon: IconSchool,
		color: 'teal',
	},
	{
		title: 'Системным трейдерам',
		description: 'Автоматизируйте учет сделок и расчет ключевых метрик для экономии времени и повышения дисциплины.',
		icon: IconBriefcase,
		color: 'blue',
	},
	{
		title: 'Про-трейдерам и командам',
		description: 'Единая среда для анализа торговых результатов, контроля рисков и агрегации статистики по нескольким счетам.',
		icon: IconChartLine,
		color: 'violet',
	},
];

export function AudienceSection() {
	const audiences = AUDIENCES.map((audience) => (
		<Group key={audience.title} align='flex-start' wrap='nowrap' gap='lg' className={cls.item}>
			<ThemeIcon size={60} radius='xl' variant='light' color={audience.color}>
				<audience.icon style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
			</ThemeIcon>
			<Stack gap='xs'>
				<Text fz='xl' fw={700}>
					{audience.title}
				</Text>
				<Text c='dimmed' lh={1.6}>
					{audience.description}
				</Text>
			</Stack>
		</Group>
	));

	return (
		<Box maw={720} mx='auto' w='100%' py={80}>
			<Stack gap={60}>
				<Title order={2} ta='center'>
					Для кого создана платформа?
				</Title>
				<Stack gap={40}>
					{audiences}
				</Stack>
			</Stack>
		</Box>
	);
}
