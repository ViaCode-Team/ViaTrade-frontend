export const ITERATIONS = 600000;
export const SALT_LENGTH = 16;
export const IV_LENGTH = 12;

export function generateSalt(): Uint8Array {
	return window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
}

export function generateIv(): Uint8Array {
	return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

/**
 * Derives an AES-GCM Key Encryption Key (KEK) from a PIN string and a salt.
 */
export async function deriveKeyFromPin(pin: string, salt: Uint8Array): Promise<CryptoKey> {
	const enc = new TextEncoder();
	const keyMaterial = await window.crypto.subtle.importKey(
		'raw',
		enc.encode(pin) as BufferSource,
		{ name: 'PBKDF2' },
		false,
		['deriveBits', 'deriveKey'],
	);

	return window.crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: salt as BufferSource,
			iterations: ITERATIONS,
			hash: 'SHA-256',
		},
		keyMaterial,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt'],
	);
}

/**
 * Generates a random AES-GCM Data Encryption Key (DEK / Master Key).
 */
export async function generateMasterKey(): Promise<CryptoKey> {
	return window.crypto.subtle.generateKey(
		{
			name: 'AES-GCM',
			length: 256,
		},
		true,
		['encrypt', 'decrypt'],
	);
}

/**
 * Exports a CryptoKey to a raw Uint8Array.
 */
export async function exportKey(key: CryptoKey): Promise<Uint8Array> {
	const exported = await window.crypto.subtle.exportKey('raw', key);
	return new Uint8Array(exported);
}

/**
 * Imports a raw Uint8Array into a CryptoKey for AES-GCM.
 */
export async function importKey(
	rawKey: Uint8Array,
	extractable = false,
): Promise<CryptoKey> {
	return window.crypto.subtle.importKey(
		'raw',
		rawKey as BufferSource,
		{ name: 'AES-GCM' },
		extractable,
		['encrypt', 'decrypt'],
	);
}

/**
 * Encrypts a string (or JSON) using AES-GCM.
 * Returns the encrypted buffer (ciphertext + tag).
 */
export async function encryptText(text: string, key: CryptoKey, iv: Uint8Array): Promise<Uint8Array> {
	const enc = new TextEncoder();
	const encoded = enc.encode(text);

	const ciphertext = await window.crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv as BufferSource,
		},
		key,
		encoded as BufferSource,
	);

	return new Uint8Array(ciphertext);
}

/**
 * Decrypts a buffer back to string using AES-GCM.
 */
export async function decryptText(encryptedData: Uint8Array, key: CryptoKey, iv: Uint8Array): Promise<string> {
	const decrypted = await window.crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: iv as BufferSource,
		},
		key,
		encryptedData as BufferSource,
	);

	const dec = new TextDecoder();
	return dec.decode(decrypted);
}

/**
 * Encrypts a raw Uint8Array.
 */
export async function encryptBuffer(buffer: Uint8Array, key: CryptoKey, iv: Uint8Array): Promise<Uint8Array> {
	const ciphertext = await window.crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv as BufferSource,
		},
		key,
		buffer as BufferSource,
	);
	return new Uint8Array(ciphertext);
}

/**
 * Decrypts a buffer.
 */
export async function decryptBuffer(encryptedData: Uint8Array, key: CryptoKey, iv: Uint8Array): Promise<Uint8Array> {
	const decrypted = await window.crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: iv as BufferSource,
		},
		key,
		encryptedData as BufferSource,
	);
	return new Uint8Array(decrypted);
}
