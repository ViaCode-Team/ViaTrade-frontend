import { ROUTES } from '@/shared/model';
import { BackLink } from '@/shared/ui/back-link';

export function BackToStocksLink() {
	return <BackLink to={ROUTES.STOCKS}>Назад к акциям</BackLink>;
}
