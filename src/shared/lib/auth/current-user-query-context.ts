import { createContext } from 'react';

export type CurrentUserQueryContextValue = {
	isCurrentUserQueryEnabled: boolean;
	suspendCurrentUserQuery: () => void;
	resumeCurrentUserQuery: () => void;
};

export const CurrentUserQueryContext = createContext<CurrentUserQueryContextValue | null>(null);
