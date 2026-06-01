// In-memory master key
let sessionMasterKey: CryptoKey | null = null;

export function getSessionMasterKey(): CryptoKey | null {
	return sessionMasterKey;
}

export function setSessionMasterKey(key: CryptoKey | null): void {
	sessionMasterKey = key;
}
