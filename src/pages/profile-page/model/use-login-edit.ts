import { useState } from 'react';

type UseLoginEditReturn = {
	isEditing: boolean;
	value: string;
	setValue: (value: string) => void;
	cancel: () => void;
	save: () => void;
};

export function useLoginEdit(currentLogin: string): UseLoginEditReturn {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(currentLogin);

	const cancel = () => {
		setValue(currentLogin);
		setIsEditing(false);
	};

	const save = () => {
		// TODO: integrate with API when endpoint is available
		setIsEditing(false);
	};

	return {
		isEditing,
		value,
		setValue,
		cancel,
		save,
	};
}
