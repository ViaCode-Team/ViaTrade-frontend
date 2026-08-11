import type { MouseEvent } from 'react';

import { Button } from '@mantine/core';

import {
	isTradeFromSignalAvailable,
	type TradeFromSignalDraft,
} from '../model/trade-from-signal';
import { openCreateTradeFromSignalModal } from './open-create-trade-from-signal-modal';

type CreateTradeFromSignalButtonProps = {
	draft: TradeFromSignalDraft;
	placement?: 'card' | 'table';
};

export function CreateTradeFromSignalButton({
	draft,
	placement = 'card',
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
			size={placement === 'card' ? 'compact-sm' : 'compact-xs'}
			variant='light'
			onClick={handleClick}
		>
			Создать сделку
		</Button>
	);
}
