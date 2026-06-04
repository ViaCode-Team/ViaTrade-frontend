import { type Signal, SignalsList } from '@/entities/signal';

const exampleSignals: Signal[] = [
	{
		id: 'id',
		asset: 'asset',
		tradeCode: 'tradeCode',
		date: 'date',
		dateTime: 'dateTime',
		close: 349.1442,
		direction: 'buy',
		strategy: 'Trend Following',
	},
];

export function ExampleSignals() {
	return (
		<SignalsList
			signals={exampleSignals}
			hasAnySignals={true}
			onSignalSelect={() => {}}
		/>
	);
}
