import { Stack, Text, Title } from '@mantine/core';

import cls from '../stock-page.module.css';

export function StockNotFound() {
	return (
		<Stack gap='md'>
			<Stack gap={4}>
				<Title order={2} className={cls.notFoundTitle}>
					Акция не найдена
				</Title>

				<Text size='sm' c='dimmed'>
					Проверьте адрес страницы или вернитесь к списку акций.
				</Text>
			</Stack>
		</Stack>
	);
}
