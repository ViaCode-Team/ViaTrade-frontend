import { IconArrowLeft } from '@tabler/icons-react';

import { ROUTES } from '@/shared/model/routes';
import { AppLink } from '@/shared/ui/app-link';

import cls from '../stock-page.module.css';

export function BackToStocksLink() {
	return (
		<AppLink to={ROUTES.STOCKS} className={cls.backLink}>
			<IconArrowLeft size={16} stroke={2} />
			Назад к акциям
		</AppLink>
	);
}
