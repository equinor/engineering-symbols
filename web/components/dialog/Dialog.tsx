import { ChangeEvent, useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileSaver from 'file-saver';

import { Typography, Button, Dialog, Switch, Icon, Snackbar } from '@equinor/eds-core-react';
import { download, copy } from '@equinor/eds-icons';

import {
	AnnotationTooltipStyled,
	AnnotationWrapStyled,
	DialogContenButtonsStyled,
	DialogContentDescStyled,
	DialogContentStyled,
	DialogContentTitleStyled,
	DialogImageStyled,
	DialogImageWrapStyled,
	DialogSvgImageStyled,
	DialogWrapStyled,
} from './styles';

import { DialogComponentProps } from './Dialog.types';
import { capitalizeWords } from '../../helpers';
import { ConnectorsProps } from '../../types';

export const DialogComponent: React.FunctionComponent<DialogComponentProps> = ({ onHandleClose, selected }): JSX.Element => {
	const [presentConnectors, setPresentConnectors] = useState<boolean>(false);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	const { name, description, connectors, width, height, svgString } = selected;

	const svgRef = useRef(null);

	const onDownloadSvg = () => {
		if (!svgRef || !svgRef.current) return;

		const ref: HTMLDivElement = svgRef.current;
		const svg = ref.getElementsByTagName('svg')[0];
		const clone = svg.cloneNode(true) as SVGSVGElement;

		console.log(18, presentConnectors);

		const getAnnotations = clone.getElementById('Annotations');

		if (!presentConnectors && getAnnotations !== null) getAnnotations.remove();

		const svgData = new XMLSerializer().serializeToString(clone);

		const url = new Blob([svgData], { type: 'image/svg+xml' });

		FileSaver.saveAs(url, `${name}.svg`);
	};

	const iconWidth = 170;
	const iconHeight = 170;
	const hasConnectors = connectors.length > 0;

	return (
		<Dialog open isDismissable onClose={onHandleClose} style={{ width: 'auto' }}>
			<Dialog.CustomContent>
				<DialogWrapStyled>
					<DialogImageWrapStyled>
						<DialogImageStyled ref={svgRef}>
							<>
								<DialogSvgImageStyled width={iconWidth} height={iconHeight}>
									<div dangerouslySetInnerHTML={{ __html: svgString }} />
									{hasConnectors &&
										connectors.map(({ relativePosition }: ConnectorsProps, id: number) => {
											if (!relativePosition) return;
											const scaleRate = height > width ? iconHeight / height : iconWidth / width;

											const top = relativePosition.y * scaleRate + (iconHeight - height * scaleRate) / 2 - 30;
											const left = relativePosition.x * scaleRate + (iconWidth - width * scaleRate) / 2;

											return (
												<AnnotationWrapStyled
													key={`annnotaion-${id}`}
													presentConnectors={presentConnectors}
													top={top}
													left={left}>
													<AnnotationTooltipStyled presentConnectors={presentConnectors}>Oil</AnnotationTooltipStyled>
												</AnnotationWrapStyled>
											);
										})}
								</DialogSvgImageStyled>
							</>
						</DialogImageStyled>
					</DialogImageWrapStyled>

					<DialogContentStyled>
						<DialogContentTitleStyled>
							<Typography variant="h2">{capitalizeWords(name.replace('-', ' '))}</Typography>
						</DialogContentTitleStyled>

						<DialogContentDescStyled>
							<Typography variant="body_short">{description}</Typography>
							{hasConnectors && (
								<Switch
									onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPresentConnectors(target.checked)}
									checked={presentConnectors}
									label={`${presentConnectors ? ' Hide' : 'Show'} connectors`}
								/>
							)}

							<DialogContenButtonsStyled>
								<Button fullWidth variant="outlined" onClick={() => onDownloadSvg()}>
									<Icon data={download}></Icon>
									{presentConnectors ? 'Download with connectors' : 'Download without connectors'}
								</Button>
								<CopyToClipboard text={name}>
									<Button fullWidth variant="outlined" onClick={() => setSnackbarOpen(true)}>
										<Icon data={copy}></Icon>Copy icon name
									</Button>
								</CopyToClipboard>
								<Snackbar open={isSnackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={3000}>
									Copied!
								</Snackbar>
							</DialogContenButtonsStyled>
						</DialogContentDescStyled>
					</DialogContentStyled>
				</DialogWrapStyled>
			</Dialog.CustomContent>
		</Dialog>
	);
};
