import { useCallbackRef, useDidUpdate, useDocumentVisibility, useWindowEvent } from '@mantine/hooks';

type PageResumeEffect = () => void | Promise<unknown>;

export function usePageResumeEffect(effect: PageResumeEffect) {
	const runEffect = useCallbackRef(() => {
		void effect();
	});

	const documentVisibility = useDocumentVisibility();

	useDidUpdate(() => {
		if (documentVisibility === 'visible') {
			runEffect();
		}
	}, [documentVisibility]);

	useWindowEvent('focus', runEffect);
	useWindowEvent('pageshow', runEffect);
}
