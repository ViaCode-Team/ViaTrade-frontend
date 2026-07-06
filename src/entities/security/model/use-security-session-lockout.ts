import { useSecurity } from './use-security';
import { useSessionLockout } from './use-session-lockout';

export function useSecuritySessionLockout() {
	const { isLocked, checkSecurityState } = useSecurity();

	useSessionLockout(isLocked, checkSecurityState);
}
