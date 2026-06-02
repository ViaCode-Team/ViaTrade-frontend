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
import { IconKey, IconLock, IconServer, IconShieldLock } from '@tabler/icons-react';

import { brandGradient } from '@/shared/model/theme';

import cls from './security-section.module.css';

const SECURITY_FEATURES = [
	{
		title: 'Надежное шифрование',
		description: 'Все передаваемые данные защищены современными протоколами шифрования, обеспечивая полную конфиденциальность ваших сессий.',
		icon: IconLock,
	},
	{
		title: 'Локальный PIN-код',
		description: 'Дополнительная защита вашего устройства: доступ к приложению может быть ограничен локальным PIN-кодом или биометрией.',
		icon: IconShieldLock,
	},
	{
		title: 'Безопасность ключей',
		description: 'Мы не имеем прямого доступа к вашим средствам. Используются только ключи с ограниченными правами для чтения статистики и исполнения сигналов.',
		icon: IconKey,
	},
	{
		title: 'Отказоустойчивость',
		description: 'Инфраструктура платформы распределена на независимых серверах, что гарантирует бесперебойный доступ к рынку в любые моменты волатильности.',
		icon: IconServer,
	},
];

export function SecuritySection() {
	const features = SECURITY_FEATURES.map((feature) => (
		<Paper key={feature.title} p='xl' radius='md' shadow='sm' withBorder className={cls.card}>
			<Stack gap='sm'>
				<Group>
					<ThemeIcon size={40} radius='md'>
						<feature.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
					</ThemeIcon>
					<Title order={3} fz='lg'>{feature.title}</Title>
				</Group>
				<Text c='dimmed' fz='sm'>
					{feature.description}
				</Text>
			</Stack>
		</Paper>
	));

	return (
		<Container size='lg' py={80}>
			<Stack gap={50}>
				<Title order={2} ta='center'>
					Безопасность — наш
					{' '}
					<Text component='span' variant='gradient' gradient={brandGradient} inherit>
						приоритет
					</Text>
				</Title>
				<SimpleGrid cols={{ base: 1, md: 2 }} spacing='lg'>
					{features}
				</SimpleGrid>
			</Stack>
		</Container>
	);
}
