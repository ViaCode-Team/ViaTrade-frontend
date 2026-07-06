import type { ReactNode } from 'react';

import { useSecuritySessionLockout } from '@/entities/security';
import { useInactivityLock } from '@/features/security/inactivity-lock';

import { useLocalAuthBlockedLogout } from './local-auth-block';

type AppSecurityRuntimeProps = {
	children: ReactNode;
};

export function AppSecurityRuntime({ children }: AppSecurityRuntimeProps) {
	useLocalAuthBlockedLogout();
	useSecuritySessionLockout();
	useInactivityLock();

	return children;
}
