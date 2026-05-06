import type { InvalidateTarget, MutationInvalidatesConfig } from 'orval';

type MutationName = string | readonly string[];
type InvalidationMode = NonNullable<Exclude<InvalidateTarget, string>['invalidateMode']>;
type InvalidationRule = MutationInvalidatesConfig[number];
type InvalidationDeclaration = {
	mutations: MutationName;
	invalidate?: readonly InvalidateTarget[];
	reset?: readonly InvalidateTarget[];
};

function toMutationList(mutations: MutationName): string[] {
	return typeof mutations === 'string' ? [mutations] : [...mutations];
}

function createInvalidationRule(
	invalidateMode: InvalidationMode,
	onMutations: MutationName,
	targets: readonly InvalidateTarget[],
): InvalidationRule {
	return {
		onMutations: toMutationList(onMutations),
		invalidates: targets.map((target) =>
			typeof target === 'string'
				? { query: target, invalidateMode }
				: { ...target, invalidateMode },
		),
	};
}

export function defineInvalidations(declarations: readonly InvalidationDeclaration[]): MutationInvalidatesConfig {
	return declarations.flatMap(({ mutations, invalidate = [], reset = [] }) => [
		...(invalidate.length > 0
			? [createInvalidationRule('invalidate', mutations, invalidate)]
			: []),
		...(reset.length > 0
			? [createInvalidationRule('reset', mutations, reset)]
			: []),
	]);
}

const authInvalidationTargets = {
	sessions: 'getSessions',
	sessionsInfinite: 'getSessionsInfinite',
	me: { query: 'getMe', file: '@/entities/user' },
} satisfies Record<string, InvalidateTarget>;

const authSessionTargets = [
	authInvalidationTargets.sessions,
	authInvalidationTargets.sessionsInfinite,
] satisfies InvalidateTarget[];

const authUserStateTargets = [
	...authSessionTargets,
	authInvalidationTargets.me,
] satisfies InvalidateTarget[];

export const authMutationInvalidates = defineInvalidations([
	{
		mutations: ['login', 'register'],
		invalidate: authUserStateTargets,
	},
	{
		mutations: 'refresh',
		invalidate: authSessionTargets,
	},
	{
		mutations: ['logout', 'logoutAll'],
		reset: authUserStateTargets,
	},
]);

const strategyInvalidationTargets = {
	instrumentsLinks: 'getAllInstrumentsLink',
	userStrategies: 'getUsersStrategy',
} satisfies Record<string, InvalidateTarget>;

export const strategyMutationInvalidates = defineInvalidations([
	{
		mutations: ['createInstrumentsLink', 'deleteInstrumentsLink'],
		invalidate: [strategyInvalidationTargets.instrumentsLinks],
	},
	{
		mutations: ['createUsersStrategy', 'deleteUsersStrategy'],
		invalidate: [
			strategyInvalidationTargets.userStrategies,
			strategyInvalidationTargets.instrumentsLinks,
		],
	},
]);
