import { FreshnessButton } from './freshness-button';
import { useDataFreshness } from './use-data-freshness';

export function DataFreshness() {
	const state = useDataFreshness();

	return <FreshnessButton {...state} />;
}
