export function createSkeletons(count: number) {
	return Array.from({ length: count }, (_, i) => ({
		id: `skeleton-${i}`,
	}));
}
