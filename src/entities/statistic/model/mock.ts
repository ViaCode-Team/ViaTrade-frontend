import dayjs from 'dayjs';

import type { Trade } from '@/shared/api/types/gen/trade';

export const mockTrades: Trade[] = Array.from({ length: 30 }).map((_, index) => {
	const date = dayjs().subtract(30 - index, 'day');
	const isWin = Math.random() > 0.4; // 60% win rate mock
	const income = isWin ? Math.random() * 50 + 10 : -(Math.random() * 30 + 5);

	return {
		id: index + 1,
		dateOpen: date.toISOString(),
		dateClose: date.add(1, 'hour').toISOString(),
		tradeOpen: 100,
		tradeClose: 100 + income,
		netIncome: Number(income.toFixed(2)),
		count: 1,
		price: 100,
		tradeTypeId: Math.random() > 0.5 ? 1 : 2, // 1 for Long, 2 for Short (mock)
		tradeCodeId: 1,
		userId: 1,
	};
});
