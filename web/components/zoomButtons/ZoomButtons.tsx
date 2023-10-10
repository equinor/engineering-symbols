import ZoomOut from '../../svg/zoom-out.svg';
import ZoomIn from '../../svg/zoom-in.svg';

import { ZoomButtonsContainer, ZoomButton } from './styles';

type ZoomButtonsProps = {
	onZoomClick: (n: number) => void;
};

export const ZoomButtonsComponent = ({ onZoomClick }: ZoomButtonsProps) => {
	return (
		<ZoomButtonsContainer>
			<ZoomButton onClick={() => onZoomClick(-1)}>
				<ZoomOut />
			</ZoomButton>
			<ZoomButton onClick={() => onZoomClick(1)}>
				<ZoomIn />
			</ZoomButton>
		</ZoomButtonsContainer>
	);
};
