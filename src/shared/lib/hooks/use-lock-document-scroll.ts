import { useEffect } from 'react';

import { lockDocumentScroll } from '../lock-document-scroll';

export function useLockDocumentScroll(enabled: boolean) {
	useEffect(() => {
		if (!enabled)
			return;

		return lockDocumentScroll();
	}, [enabled]);
}
