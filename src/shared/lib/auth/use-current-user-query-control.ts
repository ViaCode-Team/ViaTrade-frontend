import { use } from 'react';

import { CurrentUserQueryContext } from './current-user-query-context';

export function useCurrentUserQueryControl() {
	const context = use(CurrentUserQueryContext);

	if (!context) {
		throw new Error('useCurrentUserQueryControl must be used within CurrentUserQueryProvider');
	}

	return context;
}
