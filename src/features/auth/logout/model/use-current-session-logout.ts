import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useSecurity } from '@/entities/security';
import { ROUTES } from '@/shared/model';

import { resolveCurrentSessionLogout } from './current-session-logout';

export function useCurrentSessionLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { checkSecurityState } = useSecurity();

	return useCallback(async () => {
		await resolveCurrentSessionLogout(queryClient);
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	}, [checkSecurityState, navigate, queryClient]);
}
