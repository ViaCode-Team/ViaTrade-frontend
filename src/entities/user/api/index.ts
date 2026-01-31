import { baseApi } from '@/shared/api';

type TUserRegisterRequest = {
	login: string;
	password: string;
};

type TUserLoginRequest = {
	login: string;
	password: string;
};

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<void, TUserRegisterRequest>({
			query: (credentials) => ({
				url: 'auth/register',
				method: 'POST',
				body: credentials,
			}),
		}),

		login: builder.mutation<void, TUserLoginRequest>({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),

		getMe: builder.query<void, void>({
			query: () => ({
				url: 'auth/me',
				method: 'GET',
			}),
		}),

		logout: builder.mutation<void, void>({
			query: () => ({
				url: 'auth/logout',
				method: 'POST',
			}),
		}),
	}),
});
