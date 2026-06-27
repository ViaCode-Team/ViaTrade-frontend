import { Stack } from '@mantine/core';

import { AppEmptyState } from '@/shared/ui/app-empty-state';

import { BackToStrategiesLink } from './back-to-strategies-link';

export function StrategyNotFound() {
	return (
		<Stack gap='md'>
			<BackToStrategiesLink />

			<AppEmptyState title='Стратегия не найдена' description='Проверьте адрес страницы или вернитесь к списку стратегий.'></AppEmptyState>
		</Stack>
	);
}
