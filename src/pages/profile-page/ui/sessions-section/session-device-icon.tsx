import { IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet } from '@tabler/icons-react';
import clsx from 'clsx';

import cls from './sessions-list.module.css';

type SessionDeviceIconProps = {
	userAgent: string;
	isCurrent: boolean;
};

const MOBILE_RE = /mobile|android|iphone/;
const TABLET_RE = /tablet|ipad/;

export function SessionDeviceIcon({ userAgent, isCurrent }: SessionDeviceIconProps) {
	const normalizedUserAgent = userAgent.toLowerCase();
	const className = clsx(cls.deviceIcon, isCurrent && cls.currentDeviceIcon);

	if (MOBILE_RE.test(normalizedUserAgent))
		return <IconDeviceMobile size={24} className={className} />;
	if (TABLET_RE.test(normalizedUserAgent))
		return <IconDeviceTablet size={24} className={className} />;

	return <IconDeviceDesktop size={24} className={className} />;
}
