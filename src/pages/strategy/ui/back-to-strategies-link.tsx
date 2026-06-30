import { ROUTES } from '@/shared/model';
import { BackLink } from '@/shared/ui/back-link';

export function BackToStrategiesLink() {
	return <BackLink to={ROUTES.STRATEGIES}>Назад к стратегиям</BackLink>;
}
