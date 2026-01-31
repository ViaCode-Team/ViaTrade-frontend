export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
} as const;

// export type PathParams = {};

// Типизированны переход по пути с динамическим параметром
// navigate(generatePath(ROUTES.POST, { postId: 1 }));

// Использование типизированного useParams
// const params = useParams<PathParams[typeof ROUTES.POST]>();
// params.postId - динамический параметр

// declare module 'react-router' {
// 	// eslint-disable-next-line ts/consistent-type-definitions
// 	interface Register {
// 		params: PathParams;
// 	}
// }
