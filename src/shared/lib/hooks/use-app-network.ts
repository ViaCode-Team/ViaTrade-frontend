import { useNetwork } from '@mantine/hooks';
import { onlineManager } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';

export function useAppNetwork() {
	const state = useNetwork();

	const isOnline = useSyncExternalStore(
		onlineManager.subscribe,
		() => onlineManager.isOnline(),
		() => true,
	);

	return {
		networkState: state,
		isOnline,
	};
}
