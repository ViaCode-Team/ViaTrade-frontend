const DB_NAME = 'viatrade-secure-db';
const DB_VERSION = 1;
const STORE_NAME = 'keyval';

function getDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);

		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};
	});
}

export async function idbSet<T = unknown>(key: string, value: T): Promise<void> {
	const db = await getDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.put(value, key);

		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

export async function idbGet<T = unknown>(key: string): Promise<T | undefined> {
	const db = await getDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readonly');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.get(key);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function idbDelete(key: string): Promise<void> {
	const db = await getDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.delete(key);

		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

export async function idbClear(): Promise<void> {
	const db = await getDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.clear();

		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}
