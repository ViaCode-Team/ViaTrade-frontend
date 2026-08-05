import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
	type CurrentSessionLogoutResult,
	resolveCurrentSessionLogout,
} from '@/features/auth/logout';

type UseLocalAuthBlockResolverParams = {
	isActive?: boolean;
	retryOnOnline?: boolean;
	onResolved?: () => Promise<void> | void;
	onSettled?: (result: CurrentSessionLogoutResult) => Promise<void> | void;
};

export function useLocalAuthBlockResolver({
	isActive = true,
	retryOnOnline = false,
	onResolved,
	onSettled,
}: UseLocalAuthBlockResolverParams) {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!isActive)
			return;

		let isDisposed = false;

		const resolveBlock = async () => {
			const result = await resolveCurrentSessionLogout(queryClient);

			if (isDisposed)
				return;

			if (result === 'resolved') {
				await onResolved?.();
			}

			await onSettled?.(result);
		};

		void resolveBlock();

		if (!retryOnOnline) {
			return () => {
				isDisposed = true;
			};
		}

		window.addEventListener('online', resolveBlock);

		return () => {
			isDisposed = true;
			window.removeEventListener('online', resolveBlock);
		};
	}, [isActive, retryOnOnline, onResolved, onSettled, queryClient]);
}
