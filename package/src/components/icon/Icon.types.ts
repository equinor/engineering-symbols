import { SVGAttributes } from 'react';

import { IconName } from './Icon';

export type SvgBaseProps = SVGAttributes<SVGElement>;

export class Point {
	// constructor(readonly x: number, readonly y: number, readonly id: string, readonly drtc?: 'northwest' | 'southwest' | 'northeast' | 'southeast' | 'none') {}
	constructor(readonly x: number, readonly y: number, readonly id: string, readonly drtc?: string) {}
}

export type PositionProps = {
	props: {
		x: number;
		y: number;
		width?: number;
		height?: number;
		id: string;
		fill?: string;
	};
	type: string;
};

export interface IconProps extends SvgBaseProps {
	appearance?: any;
	rotate?: number;
	height?: number;
	width?: number;
	name: IconName;
}
