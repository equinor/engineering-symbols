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
		.split(/(?=[A-Z])/)
		.join('-')
		.toLocaleLowerCase()
); // exmpl: arrow-right

type IconNameKeys = typeof iconsKeys[number];

export type IconName = typeof iconsName[number];

export const components: Record<IconName, ComponentType<SvgBaseProps>> = Object.assign(
	{},
	...iconsName.map((el, id: number) => ({ [el]: Icons[iconsKeys[id] as IconNameKeys] }))
);

export const Icon = ({ name, width = 70, height = 70, appearance = 'black', rotate = 0, getPosition }: IconProps): ReactElement | null => {
	const Component: any = components[name];
	// const points: Point[] = [];

	// const { children } = Component().props;

	// console.log(9, 'children:', Component().props.viewBox);

	// const convertPoint = ({ x, y, id }: Point, xRng: number, yRng: number) => {
	// 	let drtc = 'none';

	// 	if (y >= 0 && x >= 0) {
	// 		// drtc = 'southwest'
	// 		drtc = 'south';
	// 	} else if (y >= 0 && x <= 0) {
	// 		// drtc = 'southeast'
	// 		drtc = 'east';
	// 	} else if (y <= 0 && x <= 0) {
	// 		// drtc = 'northwest'
	// 		drtc = 'north';
	// 	} else if (y <= 0 && x >= 0) {
	// 		drtc = 'east';
	// 	}

	// 	if (rotate > 0) {
	// 		const theta = (rotate * Math.PI) / 180;

	// 		return new Point(x * Math.cos(theta) - y * Math.sin(theta), y * Math.cos(theta) + x * Math.sin(theta), id, drtc);
	// 	}

	// 	// Converts a Point with origo TopLeft to a point with origo CenterCenter
	// 	return new Point(-xRng / 2 + x, -yRng / 2 + y, id, drtc);
	// };

	// Filter all RECT points
	// children.length && children.filter(({ props, type }: PositionProps) => type === 'rect' && points.push(convertPoint(props, width, height)));

	// getPosition(points);

	// console.log('👉 Callback:', points);
	console.log('👉 ', 'appearance:', appearance);

	return Component ? (
		<IconWrapper rotate={rotate}>
			<Component className="eq_icon" width={width} height={height} fill={appearance} />
		</IconWrapper>
	) : null;
};
