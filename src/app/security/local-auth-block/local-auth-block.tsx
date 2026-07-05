import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { logoutCurrentSessionSilently } from '@/entities/auth';
import { blockLocalAuth, clearLocalAuthBlock, useSecurity } from '@/entities/security';
import { ROUTES } from '@/shared/model';
import { GlobalLoader } from '@/shared/ui/global-loader';

export function LocalAuthBlock() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { checkSecurityState } = useSecurity();

	useEffect(() => {
		const block = async () => {
			const isLoggedOut = await logoutCurrentSessionSilently();

			if (isLoggedOut) {
				await clearLocalAuthBlock(queryClient);
			}
			else {
				await blockLocalAuth(queryClient);
			}

			await checkSecurityState();
			navigate(ROUTES.LOGIN);
		};

		void block();
	}, [queryClient, checkSecurityState, navigate]);

	return <GlobalLoader />;
}
