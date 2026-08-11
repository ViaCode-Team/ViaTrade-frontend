import type { MouseEvent } from 'react';

import { Button } from '@mantine/core';

import {
	isTradeFromSignalAvailable,
	type TradeFromSignalDraft,
} from '../model/trade-from-signal';
import { openCreateTradeFromSignalModal } from './open-create-trade-from-signal-modal';

type CreateTradeFromSignalButtonProps = {
	draft: TradeFromSignalDraft;
};

export function CreateTradeFromSignalButton({
	draft,
}: CreateTradeFromSignalButtonProps) {
	if (!isTradeFromSignalAvailable(draft)) {
		return null;
	}

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		openCreateTradeFromSignalModal(draft);
	};

	return (
		<Button
			size='compact-xs'
			variant='light'
			onClick={handleClick}
		>
			Создать сделку
		</Button>
	);
}
