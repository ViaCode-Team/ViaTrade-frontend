export type ProfileBannerCandle = readonly [
	x: number,
	high: number,
	open: number,
	close: number,
	low: number,
	isGreen: boolean,
];

export const profileBannerCandles: ProfileBannerCandle[] = [
	[20, 68, 86, 74, 94, true],
	[56, 62, 80, 66, 88, true],
	[92, 70, 72, 82, 90, false],
	[128, 48, 76, 54, 84, true],
	[164, 42, 62, 46, 70, true],
	[200, 50, 52, 64, 72, false],
	[236, 32, 56, 36, 62, true],
	[272, 24, 42, 28, 50, true],
	[308, 30, 34, 44, 52, false],
	[344, 16, 38, 20, 46, true],
	[380, 10, 26, 14, 34, true],
	[416, 16, 18, 28, 36, false],
];
