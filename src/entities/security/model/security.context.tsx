import {
	type ReactNode,
	useEffect,
	useState,
} from 'react';

import { hasPinSetup, hasPinSetupMark, isAppLocked, tryRestoreSessionKey } from '@/shared/lib/secure-storage';

import { SecurityContext } from './use-security';
import { useSessionLockout } from './use-session-lockout';

export function SecurityProvider({ children }: { children: ReactNode }) {
	const [isLocked, setIsLocked] = useState(true);
	const [hasPin, setHasPin] = useState(false);
	const [isPinSetupMark, setIsPinSetupMark] = useState(false);
	const [isReady, setIsReady] = useState(false);

	const checkSecurityState = async () => {
		const pinSetup = await hasPinSetup();
		setHasPin(pinSetup);

		const pinMark = await hasPinSetupMark();
		setIsPinSetupMark(pinMark);

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
			isPinSetupMark,
			isReady,
			checkSecurityState,
		}}
		>
			{children}
		</SecurityContext>
	);
}
