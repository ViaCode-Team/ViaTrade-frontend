import { useEffect, useReducer, useRef } from 'react';

import type {
	RemindEditableField,
	RemindItem,
} from '../model';

import {
	createRemindCopy,
	createRemindItem,
} from '../model';

type UseRemindListOptions = {
	defaultReminds?: RemindItem[];
	loadedReminds?: RemindItem[];
	isLoading?: boolean;
};

type UseRemindListReturn = {
	reminds: RemindItem[];
	isLoading: boolean;
	onRemindAdd: () => void;
	onRemindChange: (
		remindId: string,
		field: RemindEditableField,
		value: string,
	) => void;
	onRemindDuplicate: (remindId: string) => void;
	onRemindClearText: (remindId: string) => void;
	onRemindDelete: (remindId: string) => void;
};

type RemindListAction
	= | {
		type: 'replace';
		reminds: RemindItem[];
	}
	| {
		type: 'add';
	}
	| {
		type: 'change';
		remindId: string;
		field: RemindEditableField;
		value: string;
	}
	| {
		type: 'duplicate';
		remindId: string;
	}
	| {
		type: 'clearText';
		remindId: string;
	}
	| {
		type: 'delete';
		remindId: string;
	};

export function useRemindList({
	defaultReminds = [],
	loadedReminds,
	isLoading = false,
}: UseRemindListOptions = {}): UseRemindListReturn {
	const [reminds, dispatch] = useReducer(
		remindListReducer,
		defaultReminds,
	);
	const hasUserChangesRef = useRef(false);

	useEffect(() => {
		if (hasUserChangesRef.current || loadedReminds === undefined) {
			return;
		}

		dispatch({
			type: 'replace',
			reminds: loadedReminds,
		});
	}, [loadedReminds]);

	const markUserChanged = () => {
		hasUserChangesRef.current = true;
	};

	const handleRemindAdd = () => {
		markUserChanged();
		dispatch({ type: 'add' });
	};

	const handleRemindChange = (
		remindId: string,
		field: RemindEditableField,
		value: string,
	) => {
		markUserChanged();
		dispatch({
			type: 'change',
			remindId,
			field,
			value,
		});
	};

	const handleRemindDuplicate = (remindId: string) => {
		markUserChanged();
		dispatch({
			type: 'duplicate',
			remindId,
		});
	};

	const handleRemindClearText = (remindId: string) => {
		markUserChanged();
		dispatch({
			type: 'clearText',
			remindId,
		});
	};

	const handleRemindDelete = (remindId: string) => {
		markUserChanged();
		dispatch({
			type: 'delete',
			remindId,
		});
	};

	return {
		reminds,
		isLoading,
		onRemindAdd: handleRemindAdd,
		onRemindChange: handleRemindChange,
		onRemindDuplicate: handleRemindDuplicate,
		onRemindClearText: handleRemindClearText,
		onRemindDelete: handleRemindDelete,
	};
}

function remindListReducer(
	reminds: RemindItem[],
	action: RemindListAction,
) {
	switch (action.type) {
		case 'replace':
			return action.reminds;

		case 'add':
			return [
				...reminds,
				createRemindItem(),
			];

		case 'change':
			return reminds.map((remind) => {
				if (remind.id !== action.remindId) {
					return remind;
				}

				return {
					...remind,
					[action.field]: action.value,
				};
			});

		case 'duplicate': {
			const remindIndex = reminds.findIndex(
				(remind) => remind.id === action.remindId,
			);

			if (remindIndex === -1) {
				return reminds;
			}

			const nextReminds = [...reminds];
			const remind = nextReminds[remindIndex];

			nextReminds.splice(
				remindIndex + 1,
				0,
				createRemindCopy(remind),
			);

			return nextReminds;
		}

		case 'clearText':
			return reminds.map((remind) => {
				if (remind.id !== action.remindId) {
					return remind;
				}

				return {
					...remind,
					text: '',
				};
			});

		case 'delete':
			return reminds.filter(
				(remind) => remind.id !== action.remindId,
			);

		default:
			return reminds;
	}
}
