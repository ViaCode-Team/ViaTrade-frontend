export function createSkeletons(count: number) {
	return Array.from({ length: count }, () => ({
		id: `skeleton-${crypto.randomUUID()}`,
	}));
}
