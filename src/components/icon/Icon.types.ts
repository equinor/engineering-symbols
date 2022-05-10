import { SVGAttributes } from 'react';

import { IconAppearance } from '../../context';
import { IconName } from './Icon';

export type SvgBaseProps = SVGAttributes<SVGElement>;

export class Point {
	constructor(readonly x: number, readonly y: number) {}
}

export type PositionProps = {
	props: {
		x: number;
		y: number;
		width?: number;
		height?: number;
		id?: string;
		fill?: string;
	};
	type: string;
};

export interface IconProps extends SvgBaseProps {
	getPosition: (props: Point[]) => void;
	appearance?: IconAppearance;
	rotate?: number;
	height?: number;
	width?: number;
	name: IconName;
}
