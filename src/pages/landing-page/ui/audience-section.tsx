import {
	Container,
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
		title: 'Новичкам в инвестициях',
		description: 'Получите доступ к готовым стратегиям и понятным сигналам, чтобы делать первые шаги на рынке более уверенно.',
		icon: IconSchool,
		color: 'teal',
	},
	{
		title: 'Занятым профессионалам',
		description: 'Нет времени следить за котировками круглосуточно? Наши автоматизированные алгоритмы сделают эту рутину за вас.',
		icon: IconBriefcase,
		color: 'blue',
	},
	{
		title: 'Опытным трейдерам',
		description: 'Используйте наши данные как дополнительный источник информации для подтверждения ваших собственных гипотез.',
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
		<Container size='md' py={80}>
			<Stack gap={60}>
				<Title order={2} ta='center'>
					Для кого создана платформа?
				</Title>
				<Stack gap={40}>
					{audiences}
				</Stack>
			</Stack>
		</Container>
	);
}
