import { AuthCard as AuthCardComponent } from './auth-card';
import { AuthCardFooter } from './auth-card-footer';

type AuthCardType = typeof AuthCardComponent & {
	Footer: typeof AuthCardFooter;
};

export const AuthCard = AuthCardComponent as AuthCardType;
AuthCard.Footer = AuthCardFooter;
