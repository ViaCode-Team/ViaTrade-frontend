import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { useEffect } from 'react';
import { useNavigation } from 'react-router';

export function AppNavigationProgress() {
	const { state } = useNavigation();

	useEffect(() => {
		if (state !== 'idle')
			nprogress.start();
		else
			nprogress.complete();
	}, [state]);

	return (
		<NavigationProgress color='brand' />
	);
}
