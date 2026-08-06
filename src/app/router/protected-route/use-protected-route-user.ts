import { useGetMe } from '@/entities/user';

type UseProtectedRouteUserParams = {
	isReady: boolean;
	isRestoring: boolean;
	isLocalAuthBlocked: boolean;
	hasPin: boolean;
	isLocked: boolean;
	isCurrentUserQueryEnabled: boolean;
};

export function useProtectedRouteUser({
	isReady,
	isRestoring,
	isLocalAuthBlocked,
	hasPin,
	isLocked,
	isCurrentUserQueryEnabled,
}: UseProtectedRouteUserParams) {
	const canFetchUser = isReady
		&& !isLocalAuthBlocked
		&& (!hasPin || !isLocked)
		&& !isRestoring
		&& isCurrentUserQueryEnabled;

	const { data, isPending } = useGetMe({
		query: {
			enabled: canFetchUser,
			refetchOnWindowFocus: false,
		},
	});

	return {
		isAuthChecked: !canFetchUser || !isPending,
		isUserAuthenticated: Boolean(data?.data),
	};
}
