/* eslint-disable ts/consistent-type-definitions */
import '@mui/material/Button';

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		glass: true;
	}
}
