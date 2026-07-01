import { createContext, use } from 'react';

export type SecurityState = {
	isLocked: boolean;
	hasPin: boolean;
	isPinSetupMark: boolean;
	isLocalAuthBlocked: boolean;
	isReady: boolean;
	checkSecurityState: () => Promise<void>;
};

export const SecurityContext = createContext<SecurityState | null>(null);

export function useSecurity() {
	const context = use(SecurityContext);

	if (!context) {
		throw new Error('useSecurity must be used within a SecurityProvider');
	}

	return context;
}
