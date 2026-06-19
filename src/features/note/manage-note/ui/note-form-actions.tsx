import {
	Button,
	Group,
} from '@mantine/core';
import {
	IconCheck,
	IconRotate,
} from '@tabler/icons-react';

import { brandGradient } from '@/shared/lib/theme';

type NoteFormActionsProps = {
	submitLabel: string;
	resetLabel: string;
	isSubmitDisabled: boolean;
	isResetDisabled: boolean;
	isSubmitting?: boolean;
	onReset: () => void;
};

export function NoteFormActions({
	submitLabel,
	resetLabel,
	isSubmitDisabled,
	isResetDisabled,
	isSubmitting,
	onReset,
}: NoteFormActionsProps) {
	return (
		<Group gap='sm' justify='flex-end'>
			<Button
				variant='default'
				size='sm'
				type='button'
				leftSection={<IconRotate size={16} />}
				disabled={isResetDisabled || isSubmitting}
				onClick={onReset}
			>
				{resetLabel}
			</Button>

			<Button
				variant='gradient'
				gradient={brandGradient}
				size='sm'
				type='submit'
				leftSection={<IconCheck size={16} />}
				disabled={isSubmitDisabled}
				loading={isSubmitting}
			>
				{submitLabel}
			</Button>
		</Group>
	);
}
