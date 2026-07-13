import type { To } from 'react-router';

import { Text } from '@mantine/core';

import { AppLink } from '@/shared/ui/app-link';

type AuthFooterProps = {
	text: string;
	linkText: string;
	to: To;
};

export function AuthCardLink({ text, linkText, to }: AuthFooterProps) {
	return (
		<Text ta='center' size='sm' c='dimmed'>
			{text}

			{' '}

			<AppLink to={to}>
				{linkText}
			</AppLink>
		</Text>
	);
}
