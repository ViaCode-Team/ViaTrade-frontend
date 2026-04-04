import { Anchor, Text } from '@mantine/core';
import { Link as RouterLink, type To } from 'react-router';

type AuthFooterProps = {
	text: string;
	linkText: string;
	to: To;
};

export function AuthFooter({ text, linkText, to }: AuthFooterProps) {
	return (
		<Text ta='center' size='sm' c='dimmed'>
			{text}

			{' '}

			<Anchor
				component={RouterLink}
				to={to}
				c='#ffb752'
			>
				{linkText}
			</Anchor>
		</Text>
	);
}
