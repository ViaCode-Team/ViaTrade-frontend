import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useSecurity } from '@/entities/security';
import { useCurrentUserQueryControl } from '@/shared/lib/auth';
import { ROUTES } from '@/shared/model';

import { resolveCurrentSessionLogout } from './current-session-logout';

export function useCurrentSessionLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { checkSecurityState } = useSecurity();
	const { suspendCurrentUserQuery } = useCurrentUserQueryControl();

	return useCallback(async () => {
		suspendCurrentUserQuery();
		await resolveCurrentSessionLogout(queryClient);
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	}, [checkSecurityState, navigate, queryClient, suspendCurrentUserQuery]);
}
