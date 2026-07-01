type RequestGate = (request: Request) => boolean | Promise<boolean>;

const LOCKED_RESPONSE_STATUS = 423;
const LOCKED_RESPONSE_STATUS_TEXT = 'App locked';

let requestGate: RequestGate | null = null;

export function setApiRequestGate(gate: RequestGate): void {
	requestGate = gate;
}

export async function getBlockedApiRequestResponse(request: Request): Promise<Response | undefined> {
	const canSendRequest = await requestGate?.(request);

	if (canSendRequest !== false)
		return undefined;

	return new Response(null, {
		status: LOCKED_RESPONSE_STATUS,
		statusText: LOCKED_RESPONSE_STATUS_TEXT,
	});
}
