import { Stack, Text, Title } from '@mantine/core';

export function StockNotFound() {
	return (
		<Stack gap='md'>
			<Stack gap={4}>
				<Title order={2}>
					Акция не найдена
				</Title>

				<Text size='sm' c='dimmed'>
					Проверьте адрес страницы или вернитесь к списку акций.
				</Text>
			</Stack>
		</Stack>
	);
}
