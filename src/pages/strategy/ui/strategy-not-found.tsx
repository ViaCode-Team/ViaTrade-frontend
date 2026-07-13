import { Stack } from '@mantine/core';

import { NoResultsState } from '@/shared/ui/app-empty-state';

import { BackToStrategiesLink } from './back-to-strategies-link';

export function StrategyNotFound() {
	return (
		<Stack gap='md'>
			<BackToStrategiesLink />

			<NoResultsState
				title='Стратегия не найдена'
				description='Проверьте адрес страницы или вернитесь к списку стратегий.'
			/>
		</Stack>
	);
}
