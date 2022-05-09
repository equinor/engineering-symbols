/** @jsxImportSource @emotion/react */
import React, { ComponentType, ReactElement, useEffect } from 'react';

import { ThemedApp } from '../../common';
import { IconProps, Point, SvgBaseProps, PositionProps } from './Icon.types';
import * as Icons from './icons';

import * as styles from './Icon.styles';

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

export const Icon = ({ name, width = 70, height = 70, appearance, rotate = 0, getPosition, ...rest }: IconProps): ReactElement | null => {
	const Component: any = components[name];
	const points: Point[] = [];

	// Filter all RECT points
	// If singile element -> no points
	const { children } = Component().props;

	const convertPoint = ({ x, y }: Point, xRng: number, yRng: number) => {
		if (rotate > 0) {
			const theta = (rotate * Math.PI) / 180;

			return new Point(x * Math.cos(theta) - y * Math.sin(theta), y * Math.cos(theta) + x * Math.sin(theta));
		}

		/** Converts a Point with origo TopLeft to a point with origo CenterCenter */
		return new Point(-xRng / 2 + x, -yRng / 2 + y);
	};

	if (children.length) {
		const filteredPoints = children.filter(({ type }: any) => type === 'rect');

		if (filteredPoints) filteredPoints.map(({ props }: PositionProps) => points.push(convertPoint(props, width, height)));
	}

	useEffect(() => getPosition(points), points);

	console.log('👉 Callback:', points);

	return Component ? (
		<ThemedApp>
			<Component css={styles.icon(appearance, rotate)} width={width} height={height} {...rest} />
		</ThemedApp>
	) : null;
};
