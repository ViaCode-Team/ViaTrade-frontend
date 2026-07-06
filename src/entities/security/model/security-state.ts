import {
	hasPinSetup,
	hasPinSetupMark,
	isAppLocked,
	isLocalAuthBlocked,
	tryRestoreSessionMasterKey,
} from '@/shared/lib/secure-storage';

export type SecuritySnapshot = {
	isLocked: boolean;
	hasPin: boolean;
	isPinSetupMark: boolean;
	isLocalAuthBlocked: boolean;
	isReady: boolean;
};

export const INITIAL_SECURITY_SNAPSHOT: SecuritySnapshot = {
	isLocked: true,
	hasPin: false,
	isPinSetupMark: false,
	isLocalAuthBlocked: false,
	isReady: false,
};

export async function readSecuritySnapshot(): Promise<SecuritySnapshot> {
	const [
		pinSetup,
		pinMark,
		localAuthBlocked,
	] = await Promise.all([
		hasPinSetup(),
		hasPinSetupMark(),
		isLocalAuthBlocked(),
	]);

	if (pinSetup && !localAuthBlocked && isAppLocked()) {
		await tryRestoreSessionMasterKey();
	}

	return {
		isLocked: isAppLocked(),
		hasPin: pinSetup,
		isPinSetupMark: pinMark,
		isLocalAuthBlocked: localAuthBlocked,
		isReady: true,
	};
}
