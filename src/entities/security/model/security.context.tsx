import {
	type ReactNode,
	useEffect,
	useState,
} from 'react';

import { hasPinSetup, isAppLocked, tryRestoreSessionKey } from '@/shared/lib/secure-storage';

import { SecurityContext } from './use-security';
import { useSessionLockout } from './use-session-lockout';

export function SecurityProvider({ children }: { children: ReactNode }) {
	const [isLocked, setIsLocked] = useState(true);
	const [hasPin, setHasPin] = useState(false);
	const [isReady, setIsReady] = useState(false);

	const checkSecurityState = async () => {
		const pinSetup = await hasPinSetup();
		setHasPin(pinSetup);

		if (pinSetup && isAppLocked()) {
			await tryRestoreSessionKey();
		}

		setIsLocked(isAppLocked());
		setIsReady(true);
	};

	useSessionLockout(isLocked, checkSecurityState);

	useEffect(() => {
		checkSecurityState();
	}, []);

	return (
		<SecurityContext value={{
			isLocked,
			hasPin,
			isReady,
			checkSecurityState,
		}}
		>
			{children}
		</SecurityContext>
	);
}
