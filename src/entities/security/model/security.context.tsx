/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	type ReactNode,
	use,
	useEffect,
	useState,
} from 'react';

import { hasPinSetup, isAppLocked, tryRestoreSessionKey } from '@/shared/lib/secure-storage';

import { useSessionLockout } from './use-session-lockout';

type SecurityState = {
	isLocked: boolean;
	hasPin: boolean;
	isOffline: boolean;
	isReady: boolean;
	checkSecurityState: () => Promise<void>;
};

const SecurityContext = createContext<SecurityState | null>(null);

export function SecurityProvider({ children }: { children: ReactNode }) {
	const [isLocked, setIsLocked] = useState(true);
	const [hasPin, setHasPin] = useState(false);
	const [isOffline, setIsOffline] = useState(!navigator.onLine);
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

		const handleOnline = () => setIsOffline(false);
		const handleOffline = () => setIsOffline(true);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return (
		<SecurityContext value={{
			isLocked,
			hasPin,
			isOffline,
			isReady,
			checkSecurityState,
		}}
		>
			{children}
		</SecurityContext>
	);
}

export function useSecurity() {
	const context = use(SecurityContext);

	if (!context) {
		throw new Error('useSecurity must be used within a SecurityProvider');
	}

	return context;
}
