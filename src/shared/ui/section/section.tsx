import type { StackProps } from '@mantine/core';
import type { ReactNode } from 'react';

import { Stack } from '@mantine/core';

import {
	SectionHeader,
	type SectionHeaderProps,
} from './section-header';

type SectionComponent = 'section' | 'article' | 'div';
type SectionHeaderConfig = SectionHeaderProps | ReactNode;
type SectionStackProps = Omit<StackProps, 'children' | 'component'>;

type SectionProps = SectionStackProps & {
	children: ReactNode;
	header?: SectionHeaderConfig;
	component?: SectionComponent;
};

export function Section({
	children,
	header,
	gap = 'md',
	component = 'section',
	...stackProps
}: SectionProps) {
	const resolvedHeader = resolveSectionHeader(header);

	return (
		<Stack {...stackProps} gap={gap} component={component}>
			{resolvedHeader}
			{children}
		</Stack>
	);
}

function resolveSectionHeader(header: SectionHeaderConfig | undefined) {
	if (!header) {
		return null;
	}

	if (isSectionHeaderProps(header)) {
		return <SectionHeader {...header} />;
	}

	return header;
}

function isSectionHeaderProps(header: SectionHeaderConfig): header is SectionHeaderProps {
	return typeof header === 'object' && header !== null && 'title' in header;
}
