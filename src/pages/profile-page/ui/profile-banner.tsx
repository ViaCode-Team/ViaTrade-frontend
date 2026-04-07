import { profileBannerCandles } from '../model/profile-banner-candles';
import classes from './profile-info.module.css';

export function ProfileBanner() {
	return (
		<div className={classes.banner}>
			<svg
				className={classes.chartLine}
				viewBox='0 0 450 120'
				preserveAspectRatio='xMidYMid slice'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				{profileBannerCandles.map(([x, high, open, close, low, isGreen]) => {
					const bodyTop = isGreen ? close : open;
					const bodyBottom = isGreen ? open : close;
					const centerX = x + 9;

					return (
						<g key={x}>
							<line
								x1={centerX}
								y1={high}
								x2={centerX}
								y2={bodyTop}
								stroke='var(--vt-profile-chart-line)'
								strokeWidth='1.5'
							/>
							<line
								x1={centerX}
								y1={bodyBottom}
								x2={centerX}
								y2={low}
								stroke='var(--vt-profile-chart-line)'
								strokeWidth='1.5'
							/>
							<rect
								x={x}
								y={bodyTop}
								width={18}
								height={bodyBottom - bodyTop}
								rx={2}
								fill={isGreen ? 'var(--vt-profile-candle-up)' : 'var(--vt-profile-candle-down)'}
							/>
						</g>
					);
				})}
			</svg>
		</div>
	);
}
