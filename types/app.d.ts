import type {
	AppDispatch as StoreAppDispatch,
	RootState as StoreRootState,
} from '../src/app/store';

declare global {
	type RootState = StoreRootState;
	type AppDispatch = StoreAppDispatch;
}

export {};
