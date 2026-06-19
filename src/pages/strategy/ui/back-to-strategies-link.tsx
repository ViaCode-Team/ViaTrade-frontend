import { IconArrowLeft } from '@tabler/icons-react';

import { ROUTES } from '@/shared/model';
import { AppLink } from '@/shared/ui/app-link';

import cls from '../strategy-page.module.css';

export function BackToStrategiesLink() {
	return (
		<AppLink to={ROUTES.STRATEGIES} className={cls.backLink}>
			<IconArrowLeft size={16} stroke={2} />
			Назад к стратегиям
		</AppLink>
	);
}
