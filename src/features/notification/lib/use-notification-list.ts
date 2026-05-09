import { useEffect, useReducer, useRef } from 'react';

import type {
	NotificationEditableField,
	NotificationItem,
} from '../model';

import {
	createNotificationCopy,
	createNotificationItem,
} from '../model';

type UseNotificationListOptions = {
	defaultNotifications?: NotificationItem[];
	loadedNotifications?: NotificationItem[];
	isLoading?: boolean;
};

type UseNotificationListReturn = {
	notifications: NotificationItem[];
	isLoading: boolean;
	onNotificationAdd: () => void;
	onNotificationChange: (
		notificationId: string,
		field: NotificationEditableField,
		value: string,
	) => void;
	onNotificationDuplicate: (notificationId: string) => void;
	onNotificationClearText: (notificationId: string) => void;
	onNotificationDelete: (notificationId: string) => void;
};

type NotificationListAction
	= | {
		type: 'replace';
		notifications: NotificationItem[];
	}
	| {
		type: 'add';
	}
	| {
		type: 'change';
		notificationId: string;
		field: NotificationEditableField;
		value: string;
	}
	| {
		type: 'duplicate';
		notificationId: string;
	}
	| {
		type: 'clearText';
		notificationId: string;
	}
	| {
		type: 'delete';
		notificationId: string;
	};

export function useNotificationList({
	defaultNotifications = [],
	loadedNotifications,
	isLoading = false,
}: UseNotificationListOptions = {}): UseNotificationListReturn {
	const [notifications, dispatch] = useReducer(
		notificationListReducer,
		defaultNotifications,
	);
	const hasUserChangesRef = useRef(false);

	useEffect(() => {
		if (hasUserChangesRef.current || loadedNotifications === undefined) {
			return;
		}

		dispatch({
			type: 'replace',
			notifications: loadedNotifications,
		});
	}, [loadedNotifications]);

	const markUserChanged = () => {
		hasUserChangesRef.current = true;
	};

	const handleNotificationAdd = () => {
		markUserChanged();
		dispatch({ type: 'add' });
	};

	const handleNotificationChange = (
		notificationId: string,
		field: NotificationEditableField,
		value: string,
	) => {
		markUserChanged();
		dispatch({
			type: 'change',
			notificationId,
			field,
			value,
		});
	};

	const handleNotificationDuplicate = (notificationId: string) => {
		markUserChanged();
		dispatch({
			type: 'duplicate',
			notificationId,
		});
	};

	const handleNotificationClearText = (notificationId: string) => {
		markUserChanged();
		dispatch({
			type: 'clearText',
			notificationId,
		});
	};

	const handleNotificationDelete = (notificationId: string) => {
		markUserChanged();
		dispatch({
			type: 'delete',
			notificationId,
		});
	};

	return {
		notifications,
		isLoading,
		onNotificationAdd: handleNotificationAdd,
		onNotificationChange: handleNotificationChange,
		onNotificationDuplicate: handleNotificationDuplicate,
		onNotificationClearText: handleNotificationClearText,
		onNotificationDelete: handleNotificationDelete,
	};
}

function notificationListReducer(
	notifications: NotificationItem[],
	action: NotificationListAction,
) {
	switch (action.type) {
		case 'replace':
			return action.notifications;

		case 'add':
			return [
				...notifications,
				createNotificationItem(),
			];

		case 'change':
			return notifications.map((notification) => {
				if (notification.id !== action.notificationId) {
					return notification;
				}

				return {
					...notification,
					[action.field]: action.value,
				};
			});

		case 'duplicate': {
			const notificationIndex = notifications.findIndex(
				(notification) => notification.id === action.notificationId,
			);

			if (notificationIndex === -1) {
				return notifications;
			}

			const nextNotifications = [...notifications];
			const notification = nextNotifications[notificationIndex];

			nextNotifications.splice(
				notificationIndex + 1,
				0,
				createNotificationCopy(notification),
			);

			return nextNotifications;
		}

		case 'clearText':
			return notifications.map((notification) => {
				if (notification.id !== action.notificationId) {
					return notification;
				}

				return {
					...notification,
					text: '',
				};
			});

		case 'delete':
			return notifications.filter(
				(notification) => notification.id !== action.notificationId,
			);

		default:
			return notifications;
	}
}
