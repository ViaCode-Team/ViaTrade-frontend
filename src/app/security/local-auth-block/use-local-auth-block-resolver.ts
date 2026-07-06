import { useEffect } from 'react';

import { type LocalAuthBlockResult, resolveLocalAuthBlock } from './resolve-local-auth-block';

type UseLocalAuthBlockResolverParams = {
	isActive?: boolean;
	retryOnOnline?: boolean;
	onResolved?: () => Promise<void> | void;
	onSettled?: (result: LocalAuthBlockResult) => Promise<void> | void;
};

export function useLocalAuthBlockResolver({
	isActive = true,
	retryOnOnline = false,
	onResolved,
	onSettled,
}: UseLocalAuthBlockResolverParams) {
	useEffect(() => {
		if (!isActive)
			return;

		let isDisposed = false;

		const resolveBlock = async () => {
			const result = await resolveLocalAuthBlock();

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
	}, [isActive, retryOnOnline, onResolved, onSettled]);
}
