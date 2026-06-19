import { Stack } from '@mantine/core';

import { EmptyState } from '@/shared/ui/empty-state';

import { BackToStrategiesLink } from './back-to-strategies-link';

export function StrategyNotFound() {
	return (
		<Stack gap='md'>
			<BackToStrategiesLink />

			<EmptyState title='Стратегия не найдена' description='Проверьте адрес страницы или вернитесь к списку стратегий.'></EmptyState>
		</Stack>
	);
}
