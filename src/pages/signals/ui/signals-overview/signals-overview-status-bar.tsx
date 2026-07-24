import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';

type SignalsOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	showDirectionBadges: boolean;
	buyCount: number;
	sellCount: number;
};

export function SignalsOverviewStatusBar({
	totalCount,
	filteredCount,
	showDirectionBadges,
	buyCount,
	sellCount,
}: SignalsOverviewStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			badges={showDirectionBadges
				? (
						<>
							{buyCount > 0 && <ValueBadge variant='dot' color='green' size='sm' label='Покупать' value={buyCount} />}
							{sellCount > 0 && <ValueBadge variant='dot' color='red' size='sm' label='Продавать' value={sellCount} />}
						</>
					)
				: null}
		/>
	);
}
