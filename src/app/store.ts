import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from '@/entities/user';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
