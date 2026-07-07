import type { CSSProperties } from 'react';

type LeftBorderCardStyle = CSSProperties & {
	'--card-left-border-color': string;
	'--card-left-border-hover-color': string;
};

type GetLeftBorderCardStyleParams = {
	color: string;
	hoverColor?: string;
};

export function getLeftBorderCardStyle({
	color,
	hoverColor = color,
}: GetLeftBorderCardStyleParams): LeftBorderCardStyle {
	return {
		'--card-left-border-color': color,
		'--card-left-border-hover-color': hoverColor,
	};
}
