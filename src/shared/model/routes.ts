export const ROUTES = {
	LANDING: '/',
	HOME: '/dashboard',
	SIGNALS: '/signals',
	STOCKS: '/stocks',
	STOCK: '/stocks/:stockId',
	STRATEGIES: '/strategies',
	STRATEGY: '/strategies/:strategyName',
	NOTES: '/notes',
	REMINDERS: '/reminders',
	PROFILE: '/profile',
	LOGIN: '/login',
	REGISTER: '/register',
	STATISTICS: '/statistics',
} as const;

export type PathParams = {
	[ROUTES.STOCK]: {
		stockId: string;
	};
	[ROUTES.STRATEGY]: {
		strategyName: string;
	};
};

// Типизированный переход по пути с динамическим параметром
// navigate(generatePath(ROUTES.STRATEGY, { strategyName: 'momentum-1d' }));

// Использование типизированного useParams
// const params = useParams<PathParams[typeof ROUTES.STRATEGY]>();
// params.strategyName - динамический параметр

declare module 'react-router' {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface Register {
		params: PathParams;
	}
}
