import {
	ApiError,
	isProblemDetails,
} from '@/shared/api';

const REMINDER_LIMIT_EXCEEDED_CODE = 'reminder_limit_exceeded';

export type CreateRemindError = {
	title: string;
	message: string;
};

export function getCreateRemindError(error: unknown): CreateRemindError {
	if (
		error instanceof ApiError
		&& isProblemDetails(error.details)
		&& error.details.status === 422
		&& error.details.code === REMINDER_LIMIT_EXCEEDED_CODE
	) {
		return {
			title: 'Лимит напоминаний исчерпан',
			message: 'Достигнут лимит напоминаний. Удалите ненужные напоминания, чтобы создать новое.',
		};
	}

	return {
		title: 'Не удалось создать напоминание',
		message: 'Проверьте соединение и попробуйте ещё раз.',
	};
}
