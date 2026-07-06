import {
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { INITIAL_SECURITY_SNAPSHOT, readSecuritySnapshot } from './security-state';
import { SecurityContext } from './use-security';

type SecurityProviderProps = {
	children: ReactNode;
};

export function SecurityProvider({ children }: SecurityProviderProps) {
	const [securitySnapshot, setSecuritySnapshot] = useState(INITIAL_SECURITY_SNAPSHOT);
	const stateCheckIdRef = useRef(0);

	const checkSecurityState = useCallback(async () => {
		const stateCheckId = stateCheckIdRef.current + 1;
		stateCheckIdRef.current = stateCheckId;

		const nextSnapshot = await readSecuritySnapshot();

		if (stateCheckIdRef.current === stateCheckId) {
			setSecuritySnapshot(nextSnapshot);
		}
	}, []);

	useEffect(() => {
		void checkSecurityState();
	}, [checkSecurityState]);

	const contextValue = useMemo(() => ({
		...securitySnapshot,
		checkSecurityState,
	}), [securitySnapshot, checkSecurityState]);

	return (
		<SecurityContext value={contextValue}>
			{children}
		</SecurityContext>
	);
}
