import { ChangeEvent, useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileSaver from 'file-saver';

import { Typography, Button, Dialog, Switch, Icon, Snackbar } from '@equinor/eds-core-react';
import { Icon as EngineeringIcon } from '@equinor/engineering-symbols';
import { download, copy } from '@equinor/eds-icons';

import { capitalizeWords } from '../../helpers';

import { DialogComponentProps } from './Dialog.types';

import styles from './styles.module.css';

export const DialogComponent: React.FunctionComponent<DialogComponentProps> = ({ onHandleClose, selectedName, icons }): JSX.Element => {
	const [presentConnectors, setPresentConnectors] = useState<boolean>(false);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const { name, description } = icons.filter(({ name }) => name === selectedName)[0];

	const svgRef = useRef(null);

	const onDownloadSvg = () => {
		if (!svgRef || !svgRef.current) return;

		const ref: HTMLDivElement = svgRef.current;
		const svg = ref.getElementsByTagName('svg')[0];
		const clone = svg.cloneNode(true) as SVGSVGElement;

		if (!presentConnectors) clone.getElementById('Annotations').remove();

		const svgData = new XMLSerializer().serializeToString(clone);

		const url = new Blob([svgData], { type: 'image/svg+xml' });

		FileSaver.saveAs(url, `${name}.svg`);
	};

	// useEffect(() => (
	//   console.log(svgRef.current)
	// ), [])

	return (
		<Dialog open isDismissable onClose={onHandleClose}>
			<Dialog.CustomContent>
				<div className={styles.dialogWrap}>
					<div className={styles.dialogImageWrap}>
						<div className={presentConnectors ? 'dialogImage' : ''} ref={svgRef}>
							<EngineeringIcon name={name} width="170" height="170" getPosition={(el: any) => console.log('ops:', el)} />
						</div>
					</div>

					<div className={styles.dialogContent}>
						<div className={styles.dialogContentTitle}>
							<Typography variant="h2">{capitalizeWords(name.replace('-', ' '))}</Typography>
						</div>

						<div className={styles.dialogContentDesc}>
							<Typography variant="body_short">{description}</Typography>

							<Switch
								onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPresentConnectors(target.checked)}
								checked={presentConnectors}
								label={`${presentConnectors ? ' Hide' : 'Show'} connectors`}
							/>

							<div className={styles.dialogContenButtons}>
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
							</div>
						</div>
					</div>
				</div>
			</Dialog.CustomContent>
		</Dialog>
	);
};
