import { ZoomButtonsContainer } from './styles';
import { IconButtonComponent } from '../iconButton';

type ZoomButtonsProps = {
	onZoomClick: (n: number) => void;
};

export const ZoomButtonsComponent = ({ onZoomClick }: ZoomButtonsProps) => {
	return (
		<ZoomButtonsContainer>
			<IconButtonComponent name="zoomOut" onClick={() => onZoomClick(-1)} />
			<IconButtonComponent name="zoomIn" onClick={() => onZoomClick(1)} />
		</ZoomButtonsContainer>
	);
};
