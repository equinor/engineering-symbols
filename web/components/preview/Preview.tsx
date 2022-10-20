import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { HexColorPicker } from 'react-colorful';
import FileSaver from 'file-saver';
import SVGPathCommander from 'svg-path-commander';
import copyToClipboard from 'copy-to-clipboard';

import { Typography, Button, Switch, Icon, Snackbar, Label, Slider, Input, Popover } from '@equinor/eds-core-react';
import { download, copy } from '@equinor/eds-icons';

import {
	AnnotationTooltipDotStyled,
	PreviewContenButtonsStyled,
	PreviewContentTitleStyled,
	PreviewContentDescStyled,
	AnnotationTooltipStyled,
	PreviewImageWrapStyled,
	CustomizeElementStyled,
	AnnotationWrapStyled,
	PreviewContentStyled,
	CustomizeColorStyled,
	CustomizeResetStyled,
	PreviewImageStyled,
	PopoverWrapStyled,
	PreviewWrapStyled,
	CustomizeStyled,
} from './styles';

import { PreviewComponentProps } from './Preview.types';
import { ConnectorsProps } from '../../types';

import { capitalizeWords, rotatePoint, useOnClickOutside } from '../../helpers';
import { SvgComponent } from '../svg';
import { SymbolConnector } from '../svg/Svg.types';

export const PreviewComponent: React.FunctionComponent<PreviewComponentProps> = ({
	setPreviewAppearance,
	setPreviewColorPicked,
	appearance,
	selected,
	theme,
}): JSX.Element => {
	const { name, connectors, width, height, geometryString } = selected;

	const [presentConnectors, setPresentConnectors] = useState<boolean>(false);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	const [isPopoverOpen, setPopoverIsOpen] = useState<boolean>(false);

	const [showCustomizeColor, setShowCustomizeColor] = useState<boolean>(false);

	const [rotate, setRotate] = useState<number>(0);
	const [rotatedConnectors, setRotatedConnectors] = useState<SymbolConnector[]>(connectors);

	const [containerWidth, setContainerWidth] = useState<number>(0);

	const [svgDataString, setSvgDataString] = useState<string>('');

	const [path, setPath] = useState<string>(geometryString);

	const [isStickyPosition, setStickPosition] = useState<boolean>(false);
	const [resizePosition, setResizePosition] = useState<number>(0);

	const debounceRotateValue = useDebouncedCallback((value) => setRotate(value), 1);

	const svgRef = useRef(null);
	const popoverRef = useRef<HTMLButtonElement>(null);
	const customizeColorRef = useRef(null);

	const SVG_SCALE = 0.8;
	const ICON_FRAME_WIDTH = 140;
	const ICON_FRAME_HEIGHT = 140;

	const hasConnectors = connectors.length > 0;

	console.log('👉', 'selected:', selected);

	useOnClickOutside(customizeColorRef, () => setShowCustomizeColor(false));

	const getSvgString = () => {
		if (!svgRef || !svgRef.current) return '';

		const ref: HTMLDivElement = svgRef.current;
		const svg = ref.getElementsByTagName('svg')[0];
		const clone = svg.cloneNode(true) as SVGSVGElement;
		const svgData = new XMLSerializer().serializeToString(clone);

		return svgData;
	};

	const getSvgPathString = () => {
		if (!svgRef || !svgRef.current) return '';

		const ref: HTMLDivElement = svgRef.current;
		const svg = ref.getElementsByTagName('svg')[0];
		const clone = svg.cloneNode(true) as SVGSVGElement;
		const path = clone.getElementsByTagName('path');
		const d = path[0].getAttribute('d');

		return d;
	};

	const onDownloadSvg = () => {
		const url = new Blob([getSvgString()], { type: 'image/svg+xml' });

		FileSaver.saveAs(url, `${name}.svg`);
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
		const isStick = window.pageYOffset >= 310;

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
		const right = (innerWidth - 1400) / 2 / REM + 3.65;

		const previewWidth = (innerWidth - SIDE_PADDING * 2) * SIZE_OF_PREVIEW - REM;

		setContainerWidth(previewWidth);

		if (!isStickyPosition) return;

		const position = right > 0 ? right : SIDE_PADDING / REM;
		setResizePosition(position);
	};

	const isNumber = (n: any) => {
		return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
	};

	const onRotate = (val: number | string) => {
		if (val === '') {
			debounceRotateValue(0);

			return;
		}

		// Not allow to enter numbers that are not fixed
		if (!isNumber(val) || val >= 370 || val < 0) return;

		debounceRotateValue(val as number);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize, true);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => (isStickyPosition ? handleResize() : setResizePosition(0)), [isStickyPosition]);

	useEffect(() => {
		if (!hasConnectors) return;

		const updtConnectors = connectors.map((connector) => {
			const { relativePosition } = connector;
			const updtRelativePosition = rotatePoint(relativePosition, rotate, width, height, SVG_SCALE);
			// Avoid mutation
			const cloneConnector = { ...connector };

			cloneConnector.relativePosition = updtRelativePosition;

			return cloneConnector;
		});

		const formatedPath = new SVGPathCommander(geometryString).transform({ rotate, scale: SVG_SCALE }).optimize().toString();

		setPath(formatedPath);
		setRotatedConnectors(updtConnectors);
	}, [rotate, selected]);

	return (
		<>
			<CustomizeStyled isFixed={isStickyPosition} right={resizePosition} width={containerWidth}>
				<PreviewWrapStyled>
					<PreviewImageWrapStyled>
						<PreviewImageStyled ref={svgRef}>
							<SvgComponent
								renderConnectors={presentConnectors}
								viewBoxHeight={height}
								viewBoxWidth={width}
								connectors={rotatedConnectors}
								height={ICON_FRAME_HEIGHT}
								width={ICON_FRAME_WIDTH}
								fill={appearance}
								path={path}
							/>
							{hasConnectors &&
								rotatedConnectors.map(({ relativePosition }: ConnectorsProps, id: number) => {
									if (!relativePosition) return;
									const scaleRate = height > width ? ICON_FRAME_HEIGHT / height : ICON_FRAME_WIDTH / width;
									const distanceForTriangle = 30;
									const padding = 32;

									const top =
										relativePosition.y * scaleRate + (ICON_FRAME_HEIGHT - height * scaleRate) / 2 - distanceForTriangle + padding;
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

						<PreviewContentDescStyled>
							{/* <Typography variant="body_short">{description}</Typography> */}
							{hasConnectors && (
								<Switch
									onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPresentConnectors(target.checked)}
									checked={presentConnectors}
									label={`${presentConnectors ? ' Hide' : 'Show'} connectors`}
								/>
							)}
						</PreviewContentDescStyled>
					</PreviewContentStyled>
				</PreviewWrapStyled>

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
				{/* 
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
				</CustomizeElementStyled> */}

				<CustomizeElementStyled>
					<Label htmlFor="textfield-normal" label="Rotation" />
					<Input onChange={({ target }) => onRotate(target.value)} value={rotate === 0 ? '' : rotate} />
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

				<PreviewContenButtonsStyled>
					<Button fullWidth variant="outlined" onClick={() => onDownloadSvg()}>
						<Icon data={download}></Icon>
						{presentConnectors ? 'Download with connectors' : 'Download without connectors'}
					</Button>

					<Button aria-controls="popover" aria-haspopup ref={popoverRef} onClick={() => setPopoverIsOpen(true)}>
						<Icon data={copy}></Icon>
						Copy ...
						{/* <Icon data={more_vertical} /> */}
					</Button>

					<Popover anchorEl={popoverRef.current} open={isPopoverOpen} id="popover" placement="top" onClose={() => setPopoverIsOpen(false)}>
						<Popover.Content>
							<PopoverWrapStyled>
								{/* PATH - edited one */}
								<>
									<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(getSvgPathString())}>
										<Icon data={copy}></Icon>Copy geometry string
									</Button>
								</>
								<>
									<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(name)}>
										<Icon data={copy}></Icon>Copy icon name
									</Button>
								</>
								<>
									<Button fullWidth variant="outlined" onClick={() => onCopyToClipboard(getSvgString())}>
										<Icon data={copy}></Icon>Copy SVG
									</Button>
								</>
							</PopoverWrapStyled>
						</Popover.Content>
					</Popover>
					<Snackbar open={isSnackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={3000}>
						Copied!
					</Snackbar>
				</PreviewContenButtonsStyled>
			</CustomizeStyled>
		</>
	);
};
