import type { StackProps } from '@mantine/core';
import type { ReactNode } from 'react';

import { Stack } from '@mantine/core';

import {
	SectionHeader,
	type SectionHeaderProps,
} from './section-header';

type SectionComponent = 'section' | 'article' | 'div';
type SectionHeaderConfig = SectionHeaderProps | ReactNode;

type SectionProps = {
	children: ReactNode;
	header?: SectionHeaderConfig;
	gap?: StackProps['gap'];
	component?: SectionComponent;
	className?: string;
	id?: string;
};

export function Section({
	children,
	header,
	gap = 'md',
	component = 'section',
	className,
	id,
}: SectionProps) {
	const resolvedHeader = resolveSectionHeader(header);

	return (
		<Stack gap={gap} component={component} className={className} id={id}>
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
