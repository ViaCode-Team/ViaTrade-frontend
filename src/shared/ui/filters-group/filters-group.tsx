import { Flex, type FlexProps } from '@mantine/core';

export type FiltersGroupProps = FlexProps;

export function ControlsGroup({
	children,
	gap = 'md',
	wrap = 'wrap',
	align = 'center',
	...props
}: FiltersGroupProps) {
	return (
		<Flex gap={gap} wrap={wrap} align={align} {...props}>
			{children}
		</Flex>
	);
}
