const BROWSERS = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'] as const;
const OPERATING_SYSTEMS = ['Windows', 'Mac OS', 'Linux', 'Android', 'iOS', 'iPhone'] as const;

export function parseUserAgent(userAgent: string): string {
	if (!userAgent)
		return 'Неизвестное устройство';

	const browser = BROWSERS.find((b) => userAgent.includes(b)) ?? '';
	const os = OPERATING_SYSTEMS.find((o) => userAgent.includes(o)) ?? '';
	const normalizedOs = os === 'iPhone' ? 'iOS' : os;

	if (browser && normalizedOs)
		return `${browser} · ${normalizedOs}`;
	if (browser)
		return browser;
	if (normalizedOs)
		return normalizedOs;

	return userAgent.length > 50
		? `${userAgent.slice(0, 50)}…`
		: userAgent;
}
