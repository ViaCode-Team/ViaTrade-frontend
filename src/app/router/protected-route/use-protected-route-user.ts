import { useGetMe } from '@/entities/user';

type UseProtectedRouteUserParams = {
	isReady: boolean;
	isRestoring: boolean;
	isLocalAuthBlocked: boolean;
	hasPin: boolean;
	isLocked: boolean;
};

export function useProtectedRouteUser({
	isReady,
	isRestoring,
	isLocalAuthBlocked,
	hasPin,
	isLocked,
}: UseProtectedRouteUserParams) {
	const canFetchUser = isReady
		&& !isLocalAuthBlocked
		&& (!hasPin || !isLocked)
		&& !isRestoring;

	const { data, isPending } = useGetMe({
		query: {
			enabled: canFetchUser,
			refetchOnWindowFocus: false,
		},
	});

	return {
		isAuthChecked: !isPending,
		isUserAuthenticated: Boolean(data?.data),
	};
}
