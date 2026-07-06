import { useCallback } from 'react';

import { useSecurity } from '@/entities/security';

import { useLocalAuthBlockResolver } from './use-local-auth-block-resolver';

export function useLocalAuthBlockedLogout() {
	const { isLocalAuthBlocked, checkSecurityState } = useSecurity();

	const handleResolved = useCallback(async () => {
		await checkSecurityState();
	}, [checkSecurityState]);

	useLocalAuthBlockResolver({
		isActive: isLocalAuthBlocked,
		retryOnOnline: true,
		onResolved: handleResolved,
	});
}
