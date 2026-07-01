import {
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';

import {
	hasPinSetup,
	hasPinSetupMark,
	isAppLocked,
	isLocalAuthBlocked,
	tryRestoreSessionMasterKey,
} from '@/shared/lib/secure-storage';

import { SecurityContext } from './use-security';

export function SecurityProvider({ children }: { children: ReactNode }) {
	const [isLocked, setIsLocked] = useState(true);
	const [hasPin, setHasPin] = useState(false);
	const [isPinSetupMark, setIsPinSetupMark] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false);
	const [isReady, setIsReady] = useState(false);

	const checkSecurityState = useCallback(async () => {
		const pinSetup = await hasPinSetup();
		setHasPin(pinSetup);

		const pinMark = await hasPinSetupMark();
		setIsPinSetupMark(pinMark);

		const localAuthBlocked = await isLocalAuthBlocked();
		setIsBlocked(localAuthBlocked);

		if (pinSetup && !localAuthBlocked && isAppLocked()) {
			await tryRestoreSessionMasterKey();
		}

		setIsLocked(isAppLocked());
		setIsReady(true);
	}, []);

	useEffect(() => {
		void checkSecurityState();
	}, [checkSecurityState]);

	return (
		<SecurityContext value={{
			isLocked,
			hasPin,
			isPinSetupMark,
			isLocalAuthBlocked: isBlocked,
			isReady,
			checkSecurityState,
		}}
		>
			{children}
		</SecurityContext>
	);
}
