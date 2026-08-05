import type { Strategy } from '@/entities/strategy';

import { StrategyInfoList } from '@/entities/strategy';
import { DataState } from '@/shared/ui/data-state';
import { Section } from '@/shared/ui/section';

export function StrategyInfoSection({ strategy }: { strategy: Strategy }) {
	const hasData = !!strategy.limitDescription || !!strategy.logicDescription || !!strategy.useDescription;

	return (
		<DataState hasData={!!hasData} noDataFallback={null}>
			<Section>
				<StrategyInfoList strategy={strategy} />
			</Section>
		</DataState>
	);
}
