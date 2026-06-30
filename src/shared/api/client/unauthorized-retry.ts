import ky from 'ky';

type UnauthorizedHandlerResult = boolean | void;
type UnauthorizedHandler = (request: Request) => Promise<UnauthorizedHandlerResult>;

let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
	unauthorizedHandler = handler;
}

export function canRetryUnauthorizedRequest(response: Response, retryCount: number): boolean {
	return response.status === 401 && retryCount === 0 && unauthorizedHandler !== null;
}

export async function retryUnauthorizedRequest(request: Request) {
	const shouldRetry = await unauthorizedHandler?.(request);

	if (shouldRetry === false) {
		return;
	}

	return ky.retry({
		code: 'AUTH_REFRESHED',
		request: new Request(request),
	});
}
