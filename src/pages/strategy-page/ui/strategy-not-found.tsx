import { Stack, Text, Title } from '@mantine/core';

import cls from '../strategy-page.module.css';
import { BackToStrategiesLink } from './back-to-strategies-link';

export function StrategyNotFound() {
	return (
		<Stack gap='md'>
			<BackToStrategiesLink />

			<Stack gap={4}>
				<Title order={2} className={cls.notFoundTitle}>
					Стратегия не найдена
				</Title>

				<Text size='sm' c='dimmed'>
					Проверьте адрес страницы или вернитесь к списку стратегий.
				</Text>
			</Stack>
		</Stack>
	);
}
