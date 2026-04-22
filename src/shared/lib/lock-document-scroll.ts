export function lockDocumentScroll() {
	const previousBodyOverflow = document.body.style.overflow;
	const previousBodyTouchAction = document.body.style.touchAction;
	const previousHtmlOverflow = document.documentElement.style.overflow;

	document.body.style.overflow = 'hidden';
	document.body.style.touchAction = 'none';
	document.documentElement.style.overflow = 'hidden';

	return () => {
		document.body.style.overflow = previousBodyOverflow;
		document.body.style.touchAction = previousBodyTouchAction;
		document.documentElement.style.overflow = previousHtmlOverflow;
	};
}
