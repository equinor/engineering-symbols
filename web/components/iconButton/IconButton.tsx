import * as Icons from './icons';

import { IconButton } from './styles';
import { ComponentType, ReactElement, SVGAttributes } from 'react';

type IconButtonProps = {
	appearance?: string;
	disabled?: boolean;
	onClick: () => void;
	name: IconName;
};

export type IconName = 'lensMinus' | 'lensPlus' | 'zoomOut' | 'zoomIn' | 'face3d' | 'wrench' | 'floppyDisk' | 'xmark' | 'list' | 'input' | 'rotateTR';

export type SvgBaseProps = SVGAttributes<SVGElement>;

const components: Record<IconName, ComponentType<SvgBaseProps>> = {
	floppyDisk: Icons.FloppyDisk,
	lensMinus: Icons.LensMinus,
	rotateTR: Icons.RotateTR,
	lensPlus: Icons.LensPlus,
	zoomOut: Icons.ZoomOut,
	zoomIn: Icons.ZoomIn,
	face3d: Icons.Face3d,
	wrench: Icons.Wrench,
	xmark: Icons.Xmark,
	input: Icons.Input,
	list: Icons.List,
};

export const IconButtonComponent = ({ name, onClick, disabled = false, appearance, ...rest }: IconButtonProps): ReactElement | null => {
	const Component = components[name];

	return Component ? (
		<IconButton disabled={disabled} onClick={() => onClick()} appearance={appearance}>
			<Component {...rest} />{' '}
		</IconButton>
	) : null;
};
