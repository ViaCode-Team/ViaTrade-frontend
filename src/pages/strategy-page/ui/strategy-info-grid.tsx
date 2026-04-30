import { SimpleGrid } from '@mantine/core';
import {
	IconAlertTriangle,
	IconTargetArrow,
	IconTrendingUp,
} from '@tabler/icons-react';

import { StrategyInfoCard } from './strategy-info-card';

const STRATEGY_INFO_SECTIONS = [
	{
		title: 'Логика стратегии',
		description:
			'Стратегия анализирует движение цены и ищет ситуации, где рынок показывает устойчивое направление. Основной фокус — найти момент, когда актив уже подтвердил импульс, но ещё сохраняет потенциал дальнейшего движения.',
		icon: <IconTrendingUp size={22} stroke={2} />,
	},
	{
		title: 'Когда использовать',
		description:
			'Подходит для сценариев, где трейдеру важны понятные сигналы и заранее определённый горизонт удержания позиции. Лучше раскрывается на инструментах с достаточной ликвидностью и выраженным направленным движением.',
		icon: <IconTargetArrow size={22} stroke={2} />,
	},
	{
		title: 'Ограничения',
		description:
			'Точность не гарантирует будущий результат. В боковом рынке стратегия может давать ложные сигналы.',
		icon: <IconAlertTriangle size={22} stroke={2} />,
	},
];

export function StrategyInfoGrid() {
	return (
		<section>
			<SimpleGrid minColWidth={300} autoFlow='auto-fit'>
				{STRATEGY_INFO_SECTIONS.map((section) => (
					<StrategyInfoCard
						key={section.title}
						title={section.title}
						description={section.description}
						icon={section.icon}
					/>
				))}
			</SimpleGrid>
		</section>
	);
}
