import React, { ComponentType, ReactElement } from 'react';
import styled from 'styled-components';

import { IconProps, SvgBaseProps } from './Icon.types';
import * as Icons from './icons';

type IconWrapperStyledProps = {
	rotate: number;
};

const IconWrapper = styled.div<IconWrapperStyledProps>`
	.eq_icon {
		transform: rotate(${(props) => `${props.rotate}deg`});
	}
`;

const iconsKeys = Object.keys(Icons) as Array<keyof typeof Icons>; // exmpl: ArrowRight

export const iconsName = iconsKeys.map((name) =>
	name
		// .split(/(?=[A-Z])/)
		// .join('-')
		.toUpperCase()
);

type IconNameKeys = (typeof iconsKeys)[number];

export type IconName = (typeof iconsName)[number];

export const components: Record<IconName, ComponentType<SvgBaseProps>> = Object.assign(
	{},
	...iconsName.map((el, id: number) => ({ [el]: Icons[iconsKeys[id] as IconNameKeys] }))
);

console.log(1);

export const Icon = ({ name, width = 70, height = 70, appearance = 'black', rotate = 0 }: IconProps): ReactElement | null => {
	const Component: any = components[name];

	return Component ? (
		<IconWrapper rotate={rotate}>
			<Component className="eq_icon" width={width} height={height} fill={appearance} />
		</IconWrapper>
	) : null;
};
