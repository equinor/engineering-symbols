import { SVGAttributes } from 'react';

import { IconAppearance, SvgSizeName } from '../../context';

export type SvgBaseProps = SVGAttributes<SVGElement>;

export type IconName =
	| 'arrow-right'
	| 'arrow-down'
	| 'arrow-up';

export interface IconProps extends SvgBaseProps {
	appearance?: IconAppearance;
	rotate?: number;
	size?: SvgSizeName;
	name: IconName;
}
