import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useSecurity } from '@/entities/security';
import { ROUTES } from '@/shared/model';
import { GlobalLoader } from '@/shared/ui/global-loader';

import { useLocalAuthBlockResolver } from './use-local-auth-block-resolver';

export function LocalAuthBlock() {
	const navigate = useNavigate();
	const { checkSecurityState } = useSecurity();

	const handleSettled = useCallback(async () => {
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	}, [checkSecurityState, navigate]);

	useLocalAuthBlockResolver({ onSettled: handleSettled });

	return <GlobalLoader />;
}
