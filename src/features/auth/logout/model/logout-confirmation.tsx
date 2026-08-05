import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';

type LogoutConfirmation = {
	title: string;
	description: string;
	confirmLabel: string;
	onConfirm: () => void;
};

export function openLogoutConfirmation({
	title,
	description,
	confirmLabel,
	onConfirm,
}: LogoutConfirmation): void {
	modals.openConfirmModal({
		title,
		centered: true,
		children: (
			<Text size='sm' c='dimmed'>
				{description}
			</Text>
		),
		labels: {
			cancel: 'Отмена',
			confirm: confirmLabel,
		},
		confirmProps: {
			color: 'red',
		},
		withCloseButton: false,
		onConfirm,
	});
}
