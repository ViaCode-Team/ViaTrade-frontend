export const TRADE_INSTRUMENT_TYPE_OPTIONS = [
	{ label: 'Акция', value: '1' },
	{ label: 'Фьючерс', value: '2' },
] as const;

export const TRADE_SIGNAL_OPTIONS = [
	{ label: 'Long', value: '1' },
	{ label: 'Short', value: '-1' },
] as const;

export const TRADE_DIRECTION_HELP_TEXT
	= 'Long — покупка актива с расчетом на его рост. Short — продажа актива с расчетом на его падение.';
