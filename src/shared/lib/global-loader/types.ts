export type GlobalLoaderToken = symbol;

export type AcquireOptions = {
	delayMs?: number;
};

export type GlobalLoaderApi = {
	acquire: (options?: AcquireOptions) => GlobalLoaderToken;
	release: (token: GlobalLoaderToken) => void;
};
