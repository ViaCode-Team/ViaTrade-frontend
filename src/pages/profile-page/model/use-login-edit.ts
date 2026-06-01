import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

type UseLoginEditReturn = {
	isEditing: boolean;
	value: string;
	setValue: (value: string) => void;
	edit: () => void;
	cancel: () => void;
	save: () => void;
};

export function useLoginEdit(currentLogin: string): UseLoginEditReturn {
	const [isEditing, { open: edit, close: stopEditing }] = useDisclosure(false);
	const [value, setValue] = useState(currentLogin);

	const cancel = () => {
		setValue(currentLogin);
		stopEditing();
	};

	const save = () => {
		// TODO: integrate with API when endpoint is available
		stopEditing();
	};

	return {
		isEditing,
		value,
		setValue,
		edit,
		cancel,
		save,
	};
}
