import * as Icons from './icons';

import { IconButton } from './styles';
import { ComponentType, ReactElement, SVGAttributes } from 'react';

type IconButtonProps = {
	onClick: () => void;
	name: IconName;
	disabled?: boolean;
};

export type IconName = 'lensMinus' | 'lensPlus' | 'zoomOut' | 'zoomIn' | 'face3d' | 'wrench';

type SvgBaseProps = SVGAttributes<SVGElement>;

const components: Record<IconName, ComponentType<SvgBaseProps>> = {
	lensMinus: Icons.LensMinus,
	lensPlus: Icons.LensPlus,
	zoomOut: Icons.ZoomOut,
	zoomIn: Icons.ZoomIn,
	face3d: Icons.Face3d,
	wrench: Icons.Wrench,
};

export const IconButtonComponent = ({ name, onClick, disabled = false }: IconButtonProps): ReactElement | null => {
	const Component = components[name];

	return Component ? (
		<IconButton disabled={disabled} onClick={() => onClick()}>
			<Component />{' '}
		</IconButton>
	) : null;
};
