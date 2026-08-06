import {
	type ReactNode,
	useCallback,
	useMemo,
	useState,
} from 'react';

import { CurrentUserQueryContext } from './current-user-query-context';

export function CurrentUserQueryProvider({ children }: { children: ReactNode }) {
	const [isCurrentUserQueryEnabled, setIsCurrentUserQueryEnabled] = useState(true);

	const suspendCurrentUserQuery = useCallback(() => {
		setIsCurrentUserQueryEnabled(false);
	}, []);

	const resumeCurrentUserQuery = useCallback(() => {
		setIsCurrentUserQueryEnabled(true);
	}, []);

	const value = useMemo(
		() => ({
			isCurrentUserQueryEnabled,
			suspendCurrentUserQuery,
			resumeCurrentUserQuery,
		}),
		[isCurrentUserQueryEnabled, resumeCurrentUserQuery, suspendCurrentUserQuery],
	);

	return (
		<CurrentUserQueryContext value={value}>
			{children}
		</CurrentUserQueryContext>
	);
}
