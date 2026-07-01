import { useSecurity } from './use-security';
import { useSessionLockout } from './use-session-lockout';

export function SecuritySessionLockout() {
	const { isLocked, checkSecurityState } = useSecurity();

	useSessionLockout(isLocked, checkSecurityState);

	return null;
}
