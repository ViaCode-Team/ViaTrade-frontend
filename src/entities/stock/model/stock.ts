export type Stock = {
	id: string;
	ticker: string;
	name: string;
	price: number;
	dayChangePercent: number;
	linkedStrategies: StockLinkedStrategy[];
};

export type StockLinkedStrategy = {
	id: number;
	name: string;
	description: string;
	accuracy: number;
	signalFrequency: string;
	investmentHorizon: string;
	isActive: boolean;
};

export const mockStocks: Stock[] = [
	{
		id: 'aapl',
		ticker: 'AAPL',
		name: 'Apple Inc.',
		price: 185.91,
		dayChangePercent: 1.24,
		linkedStrategies: [
			createLinkedStrategy(1, 'Momentum 1D', 'Ищет краткосрочный импульс после сильного закрытия дня.', 74, '1-3 сигнала в неделю', '1-3 дня', true),
			createLinkedStrategy(2, 'Trend Follow', 'Работает по устойчивому направлению цены и подтверждению объема.', 68, '2-4 сигнала в месяц', '2-6 недель', true),
			createLinkedStrategy(3, 'Mean Reversion', 'Отслеживает возврат к среднему после резкого отклонения.', 61, '1-2 сигнала в неделю', '3-7 дней', false),
		],
	},
	{
		id: 'tsla',
		ticker: 'TSLA',
		name: 'Tesla, Inc.',
		price: 219.45,
		dayChangePercent: -0.86,
		linkedStrategies: [
			createLinkedStrategy(1, 'Momentum 1D', 'Отрабатывает сильные направленные движения после новостей и пробоев.', 74, '1-3 сигнала в неделю', '1-3 дня', true),
			createLinkedStrategy(4, 'Volatility Breakout', 'Использует расширение дневного диапазона для поиска входа.', 72, '2-5 сигналов в месяц', '1-2 недели', true),
			createLinkedStrategy(5, 'Risk Guard', 'Фильтрует сделки по волатильности и ограничивает перегретые входы.', 57, 'по условиям рынка', 'до 1 недели', false),
		],
	},
	{
		id: 'msft',
		ticker: 'MSFT',
		name: 'Microsoft Corporation',
		price: 388.47,
		dayChangePercent: 0.52,
		linkedStrategies: [
			createLinkedStrategy(2, 'Trend Follow', 'Следит за плавным трендом и избегает шумных участков.', 68, '2-4 сигнала в месяц', '2-6 недель', true),
			createLinkedStrategy(6, 'Quality Swing', 'Подходит для спокойных позиционных входов по сильным компаниям.', 76, '1-2 сигнала в месяц', '1-3 месяца', true),
		],
	},
	{
		id: 'googl',
		ticker: 'GOOGL',
		name: 'Alphabet Inc.',
		price: 142.38,
		dayChangePercent: -1.18,
		linkedStrategies: [
			createLinkedStrategy(2, 'Trend Follow', 'Работает при сохранении направления после отчетов и крупных движений.', 68, '2-4 сигнала в месяц', '2-6 недель', true),
			createLinkedStrategy(3, 'Mean Reversion', 'Ищет возврат цены после сильных дневных отклонений.', 61, '1-2 сигнала в неделю', '3-7 дней', false),
			createLinkedStrategy(6, 'Quality Swing', 'Оценивает устойчивость движения на среднесрочном горизонте.', 76, '1-2 сигнала в месяц', '1-3 месяца', true),
		],
	},
	{
		id: 'nvda',
		ticker: 'NVDA',
		name: 'NVIDIA Corporation',
		price: 875.28,
		dayChangePercent: 2.31,
		linkedStrategies: [
			createLinkedStrategy(1, 'Momentum 1D', 'Ищет продолжение сильного импульса по дневному закрытию.', 74, '1-3 сигнала в неделю', '1-3 дня', true),
			createLinkedStrategy(4, 'Volatility Breakout', 'Работает с широкими диапазонами и пробоями уровней.', 72, '2-5 сигналов в месяц', '1-2 недели', true),
			createLinkedStrategy(7, 'AI Leaders', 'Фокусируется на лидерах AI-сегмента и устойчивости спроса.', 81, '1-3 сигнала в месяц', '1-2 месяца', true),
		],
	},
	{
		id: 'jpm',
		ticker: 'JPM',
		name: 'JPMorgan Chase & Co.',
		price: 198.64,
		dayChangePercent: 0.18,
		linkedStrategies: [
			createLinkedStrategy(6, 'Quality Swing', 'Подходит для спокойного движения внутри финансового сектора.', 76, '1-2 сигнала в месяц', '1-3 месяца', true),
			createLinkedStrategy(8, 'Dividend Balance', 'Отбирает устойчивые инструменты для умеренного риска.', 64, 'по условиям рынка', '3-6 месяцев', false),
		],
	},
];

export function getStockById(stockId: string | undefined) {
	const normalizedStockId = stockId?.toLowerCase();

	return mockStocks.find((stock) => (
		stock.id === normalizedStockId
		|| stock.ticker.toLowerCase() === normalizedStockId
	)) ?? null;
}

export function getStockChangeColor(dayChangePercent: number) {
	if (dayChangePercent > 0) {
		return 'green';
	}

	if (dayChangePercent < 0) {
		return 'red';
	}

	return 'gray';
}

function createLinkedStrategy(
	id: number,
	name: string,
	description: string,
	accuracy: number,
	signalFrequency: string,
	investmentHorizon: string,
	isActive: boolean,
): StockLinkedStrategy {
	return {
		id,
		name,
		description,
		accuracy,
		signalFrequency,
		investmentHorizon,
		isActive,
	};
}
