import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { HexColorPicker } from 'react-colorful';
import { saveAs } from 'file-saver';
import copyToClipboard from 'copy-to-clipboard';

import { Typography, Button, Switch, Icon, Snackbar, Label, Popover, Slider } from '@equinor/eds-core-react';
import { download, copy } from '@equinor/eds-icons';

import {
	AnnotationTooltipDotStyled,
	PreviewContenButtonsStyled,
	PreviewContentTitleStyled,
	PreviewContentDescStyled,
	AnnotationTooltipStyled,
	PreviewImageWrapStyled,
	CustomizeElementStyled,
	CustomizeSwitchStyled,
	AnnotationWrapStyled,
	PreviewContentStyled,
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

import { capitalizeWords, rotatePoint, useOnClickOutside } from '../../helpers';
import { SvgComponent } from '../svg';

export const PreviewComponent: React.FunctionComponent<PreviewComponentProps> = ({
	setPreviewColorPicked,
	setPreviewAppearance,
	onSearchValue,
	appearance,
	selected,
	theme,
}): JSX.Element => {
	const { name, connectors, width, height, geometryString } = selected;

	const [presentConnectors, setPresentConnectors] = useState<boolean>(false);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

	const [showCustomizeColor, setShowCustomizeColor] = useState<boolean>(false);
	const [rotatedConnectors, setRotatedConnectors] = useState<SymbolConnector[]>(connectors);

	const [rotate, setRotate] = useState<number>(0);

	const [containerWidth, setContainerWidth] = useState<number>(0);

	const [isStickyPosition, setStickPosition] = useState<boolean>(false);
	const [resizePosition, setResizePosition] = useState<number>(0);

	const debounceRotateValue = useDebouncedCallback((value) => setRotate(value), 1);

	const svgRef = useRef(null);
	const popoverRef = useRef<HTMLButtonElement>(null);
	const customizeColorRef = useRef(null);

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

	const getSvgPathString = () => {
		const svg = getSvg();

		if (!svg) return '';

		const path = svg.getElementsByTagName('path');
		const d = path[0].getAttribute('d');

		return d;
	};

	const onDownloadSvg = () => {
		const url = new Blob([getSvgString()], { type: 'image/svg+xml' });

		saveAs(url, `${name}.svg`);
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

	const handleScroll = () => {
		const isStick = window.pageYOffset >= 270;

		setStickPosition(isStick);
	};

	const onCopyToClipboard = (val: string) => {
		copyToClipboard(val);
		setSnackbarOpen(true);
	};

	const handleResize = () => {
		const REM = 16;
		const SIDE_PADDING = 3.5 * REM;
		const SIZE_OF_PREVIEW = 0.25; // 25%

		const { innerWidth } = window;
		const previewWidth = (innerWidth - SIDE_PADDING * 2) * SIZE_OF_PREVIEW - REM;

		setContainerWidth(previewWidth);

		if (!isStickyPosition) return;

		const right = (innerWidth - 1400) / 2 / REM + 3.65 + 1;
		const position = right > 0 ? right : SIDE_PADDING / REM;

		setResizePosition(position);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize, true);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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

	useEffect(() => (isStickyPosition ? handleResize() : setResizePosition(0)), [isStickyPosition]);

	return (
		<PreviewStyled isFixed={isStickyPosition} right={resizePosition} width={containerWidth}>
			{/* <IconInputsWrapperStyled>
				<Search aria-label="sitewide" id="search-normal" placeholder="Search" onChange={({ target }) => onSearchValue(target.value)} />
			</IconInputsWrapperStyled>

			<IconSelectWrapperStyled>
				<IconInputsWrapperStyled>
					<Icon data={category}></Icon>
				</IconInputsWrapperStyled>
				<IconInputsWrapperStyled>
					<SingleSelect items={[
						'Oslo',
						'Rogaland',
						'Møre og Romsdal',
						'Nordland',
						'Viken',
						'Innlandet',
						'Vestfold og Telemark',
						'Agder',
						'Vestland',
						'Trøndelag',
						'Troms og Finnmark'
					]}/>
				</IconInputsWrapperStyled>
			</IconSelectWrapperStyled> */}

			<CustomizeStyled>
				<PreviewWrapStyled>
					<PreviewImageWrapStyled>
						<PreviewImageStyled ref={svgRef}>
							<SvgComponent
								renderConnectors={presentConnectors}
								viewBoxHeight={height}
								viewBoxWidth={width}
								connectors={connectors}
								rotate={rotate}
								height={ICON_FRAME_HEIGHT}
								width={ICON_FRAME_WIDTH}
								fill={appearance}
								path={geometryString}
							/>
							{hasConnectors &&
								rotatedConnectors.map(({ relativePosition }: ConnectorsProps, id: number) => {
									if (!relativePosition) return;
									const scaleRate = height > width ? ICON_FRAME_HEIGHT / height : ICON_FRAME_WIDTH / width;
									const DISTANCE_FOR_TRIANGLE = 30;
									const PADDING = 32;

									const top =
										relativePosition.y * scaleRate +
										(ICON_FRAME_HEIGHT - height * scaleRate) / 2 -
										DISTANCE_FOR_TRIANGLE +
										PADDING;
									const left = relativePosition.x * scaleRate + (ICON_FRAME_WIDTH - width * scaleRate) / 2;

									return (
										<AnnotationWrapStyled key={`annnotaion-${id}`} presentConnectors={presentConnectors} top={top} left={left}>
											<AnnotationTooltipStyled>Oil</AnnotationTooltipStyled>
											<AnnotationTooltipDotStyled />
										</AnnotationWrapStyled>
									);
								})}
						</PreviewImageStyled>
					</PreviewImageWrapStyled>

					<PreviewContentStyled>
						<PreviewContentTitleStyled>
							<Typography variant="h2">{capitalizeWords(name.replace('-', ' '))}</Typography>
						</PreviewContentTitleStyled>
					</PreviewContentStyled>
				</PreviewWrapStyled>

				<CustomizeElementStyled>
					<Label label="Rotation" id="even-simpler-slider" />
					<Slider
						aria-labelledby="even-simpler-slider"
						value={rotate}
						step={1}
						max={359}
						min={0}
						minMaxDots={false}
						minMaxValues={false}
						// @ts-ignore: next-line
						onChange={(el, val) => debounceRotateValue(val[0])}
					/>
				</CustomizeElementStyled>

				<CustomizeElementStyled>
					<PreviewContentDescStyled>
						{/* <Typography variant="body_short">{description}</Typography> */}
						{hasConnectors && (
							<CustomizeSwitchStyled>
								<Switch
									onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPresentConnectors(target.checked)}
									checked={presentConnectors}
									label={`${presentConnectors ? ' Hide' : 'Show'} connectors`}
								/>
							</CustomizeSwitchStyled>
						)}
					</PreviewContentDescStyled>
				</CustomizeElementStyled>

				<CustomizeElementStyled>
					<CustomizeColorStyled color={appearance} show={showCustomizeColor} ref={customizeColorRef}>
						<Typography variant="body_short" bold>
							Color
						</Typography>
						<Button onClick={() => setShowCustomizeColor(true)}></Button>
						<HexColorPicker color={appearance} onChange={onColorPicker} />
					</CustomizeColorStyled>
				</CustomizeElementStyled>

				<CustomizeElementStyled>
					<CustomizeResetStyled>
						<Typography variant="body_short" bold>
							Customize
						</Typography>
						<Button color="secondary" onClick={() => onRestCustomize()}>
							Reset
						</Button>
					</CustomizeResetStyled>
				</CustomizeElementStyled>

				<PreviewContenButtonsStyled>
					<Button aria-controls="popover" variant="outlined" aria-haspopup ref={popoverRef} onClick={() => setPopoverOpen(true)}>
						<Icon data={copy}></Icon>
						Copy ...
					</Button>

					<Button fullWidth onClick={() => onDownloadSvg()}>
						<Icon data={download}></Icon>
						Download
					</Button>

					<Popover anchorEl={popoverRef.current} open={isPopoverOpen} id="popover" placement="top" onClose={() => setPopoverOpen(false)}>
						<Popover.Content>
							<PopoverWrapStyled>
								<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(getSvgPathString() as string)}>
									<Icon data={copy}></Icon>Copy geometry string
								</Button>
								<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(name)}>
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
			</CustomizeStyled>
		</PreviewStyled>
	);
};
