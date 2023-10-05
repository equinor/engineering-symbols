import { useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { HexColorPicker } from 'react-colorful';
import { saveAs } from 'file-saver';
import copyToClipboard from 'copy-to-clipboard';

import { Typography, Button, Icon, Snackbar, Popover } from '@equinor/eds-core-react';
import { download, copy } from '@equinor/eds-icons';

import {
	CustomizeColorElementStyled,
	CustomizeResetElementStyled,
	AnnotationTooltipDotStyled,
	PreviewContenButtonsStyled,
	PreviewCloseButtonStyled,
	AnnotationTooltipStyled,
	CustomizeElementsStyled,
	PreviewImageWrapStyled,
	CustomizeElementStyled,
	CustomizeDetailsStyled,
	CustomizeSliderStyled,
	AnnotationWrapStyled,
	CustomizeColorStyled,
	CustomizeResetStyled,
	PreviewImageStyled,
	PopoverWrapStyled,
	PreviewWrapStyled,
	CustomizeStyled,
	PreviewStyled,
} from './styles';

import { PreviewComponentProps } from './Preview.types';
import { SymbolConnector } from '../svg/Svg.types';
import { ConnectorsProps } from '../../types';

import { rotatePoint, useOnClickOutside } from '../../helpers';
import { SvgComponent } from '../svg';

import Close from '../../svg/close.svg';
import { ButtonComponent } from '../button';

const SLIDER_MIN_VALUE = 0;
const SLIDER_MAX_VALUE = 359;

export const PreviewComponent: React.FunctionComponent<PreviewComponentProps> = ({
	setPreviewColorPicked,
	setPreviewAppearance,
	setPreviewShow,
	appearance,
	selected,
	isShow,
	theme,
}): JSX.Element => {
	const { key, connectors, width, height, geometry } = selected;
	// const FIXTURE_METADATA = ['Gas', 'Oil', 'Water', 'CO2', 'Aquifer', 'Shale'];

	const [presentConnectors, setPresentConnectors] = useState<boolean>(false);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

	const [showCustomizeColor, setShowCustomizeColor] = useState<boolean>(false);
	const [rotatedConnectors, setRotatedConnectors] = useState<SymbolConnector[]>(connectors);

	const [rotate, setRotate] = useState<number>(0);

	const debounceRotateValue = useDebouncedCallback((value) => setRotate(value), 1);

	const previewComponentRef = useRef(null);
	const customizeColorRef = useRef(null);
	const popoverRef = useRef<HTMLButtonElement>(null);
	const svgRef = useRef(null);

	const ICON_FRAME_WIDTH = 140;
	const ICON_FRAME_HEIGHT = 140;

	const hasConnectors = connectors.length > 0;

	console.log('👉', 'selected:', selected);

	useOnClickOutside(customizeColorRef, () => setShowCustomizeColor(false));

	const getSvg = () => {
		if (!svgRef || !svgRef.current) return '';

		const ref: HTMLDivElement = svgRef.current;
		const svg = ref.getElementsByTagName('svg')[0];
		const clone = svg.cloneNode(true) as SVGSVGElement;

		return clone;
	};

	const getSvgString = () => {
		const svg = getSvg();

		if (!svg) return '';

		const svgData = new XMLSerializer().serializeToString(svg);

		return svgData;
	};

	const onDownloadSvg = () => {
		const url = new Blob([getSvgString()], { type: 'image/svg+xml' });

		saveAs(url, `${key}.svg`);
	};

	const onColorPicker = (color: string) => {
		setPreviewAppearance(color);
		setPreviewColorPicked(true);
	};

	const onRestCustomize = () => {
		setRotate(0);
		setPreviewColorPicked(false);
		setPreviewAppearance(theme.fill);
	};

	const onCopyToClipboard = (val: string) => {
		copyToClipboard(val);
		setSnackbarOpen(true);
		setPopoverOpen(false);
	};

	useOnClickOutside(previewComponentRef, () => setPreviewShow(false));

	useEffect(() => {
		if (!hasConnectors) return;

		const updtConnectors = connectors.map((connector) => {
			const { relativePosition } = connector;
			const updtRelativePosition = rotatePoint(relativePosition, rotate, width, height);
			// Avoid mutation
			const cloneConnector = { ...connector };

			cloneConnector.relativePosition = updtRelativePosition;

			return cloneConnector;
		});

		setRotatedConnectors(updtConnectors);
	}, [rotate, selected]);

	return (
		<PreviewStyled ref={previewComponentRef} isShow={isShow}>
			<CustomizeStyled>
				<PreviewCloseButtonStyled onClick={() => setPreviewShow(false)}>
					<Close />
				</PreviewCloseButtonStyled>
				<PreviewWrapStyled>
					<PreviewImageWrapStyled>
						<PreviewImageStyled ref={svgRef} rotate={rotate}>
							<SvgComponent
								renderConnectors={presentConnectors}
								viewBoxHeight={height}
								viewBoxWidth={width}
								connectors={connectors}
								height={ICON_FRAME_HEIGHT}
								width={ICON_FRAME_WIDTH}
								fill={appearance}
								path={geometry}
							/>
							{hasConnectors &&
								rotatedConnectors.map(({ relativePosition }: SymbolConnector, id: number) => {
									if (!relativePosition) return;
									const scaleRate = height > width ? ICON_FRAME_HEIGHT / height : ICON_FRAME_WIDTH / width;
									// const DISTANCE_FOR_TRIANGLE = 30;
									const DISTANCE_FOR_TRIANGLE = 6.5;
									const PADDING = 32;

									const top =
										relativePosition.y * scaleRate +
										(ICON_FRAME_HEIGHT - height * scaleRate) / 2 -
										DISTANCE_FOR_TRIANGLE +
										PADDING;
									const left = relativePosition.x * scaleRate + (ICON_FRAME_WIDTH - width * scaleRate) / 2;

									return (
										<AnnotationWrapStyled key={`annnotaion-${id}`} presentConnectors={presentConnectors} top={top} left={left}>
											{/* <AnnotationTooltipStyled>{FIXTURE_METADATA[id]}</AnnotationTooltipStyled> */}
											<AnnotationTooltipDotStyled />
										</AnnotationWrapStyled>
									);
								})}
							<ButtonComponent size="s" onClick={() => setPresentConnectors(!presentConnectors)}>
								Connectors {!presentConnectors ? 'on' : 'off'}
							</ButtonComponent>
						</PreviewImageStyled>
					</PreviewImageWrapStyled>
				</PreviewWrapStyled>

				<CustomizeElementsStyled>
					<Typography variant="h2">{key}</Typography>

					<CustomizeDetailsStyled>
						<CustomizeSliderStyled value={rotate} min={SLIDER_MIN_VALUE} max={SLIDER_MAX_VALUE}>
							<CustomizeElementStyled>
								<input
									type="range"
									name="range"
									id="range"
									min={SLIDER_MIN_VALUE}
									max={SLIDER_MAX_VALUE}
									step="0"
									value={rotate}
									onChange={({ target }) => debounceRotateValue(target.value)}
								/>
								<output name="result">{rotate}</output>
							</CustomizeElementStyled>
						</CustomizeSliderStyled>

						<CustomizeColorElementStyled>
							<CustomizeElementStyled>
								<CustomizeColorStyled color={appearance} show={showCustomizeColor} ref={customizeColorRef}>
									<Typography variant="body_short" bold>
										Color
									</Typography>
									<Button onClick={() => setShowCustomizeColor(true)}></Button>
									<HexColorPicker color={appearance} onChange={onColorPicker} />
								</CustomizeColorStyled>
							</CustomizeElementStyled>
						</CustomizeColorElementStyled>

						<CustomizeResetElementStyled>
							<CustomizeElementStyled>
								<CustomizeResetStyled>
									<Typography variant="body_short" bold>
										Customize
									</Typography>
									<ButtonComponent size="s" onClick={() => onRestCustomize()}>
										Reset
									</ButtonComponent>
								</CustomizeResetStyled>
							</CustomizeElementStyled>
						</CustomizeResetElementStyled>
					</CustomizeDetailsStyled>

					<PreviewContenButtonsStyled>
						<Button
							aria-controls="popover"
							variant="outlined"
							aria-haspopup
							ref={popoverRef}
							onClick={() => setPopoverOpen(!isPopoverOpen)}>
							<Icon data={copy}></Icon>
							Copy ...
						</Button>

						<Button onClick={() => onDownloadSvg()}>
							<Icon data={download}></Icon>
							Download
						</Button>

						<Popover
							anchorEl={popoverRef.current}
							open={isPopoverOpen}
							id="popover"
							placement="top"
							onClose={() => setPopoverOpen(false)}>
							<Popover.Content>
								<PopoverWrapStyled>
									<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(geometry)}>
										<Icon data={copy}></Icon>Copy geometry string
									</Button>
									<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(key)}>
										<Icon data={copy}></Icon>Copy icon name
									</Button>
									<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(getSvgString())}>
										<Icon data={copy}></Icon>Copy SVG
									</Button>
								</PopoverWrapStyled>
							</Popover.Content>
						</Popover>
						<Snackbar open={isSnackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={3000}>
							Copied!
						</Snackbar>
					</PreviewContenButtonsStyled>
				</CustomizeElementsStyled>
			</CustomizeStyled>
		</PreviewStyled>
	);
};
