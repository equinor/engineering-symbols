import { Card } from '@equinor/eds-core-react';
import copyToClipboard from 'copy-to-clipboard';
import { saveAs } from 'file-saver';

import {
	SymbolElementWrapStyled,
	SymbolWrapperStyled,
	SymbolMenyWrapStyled,
	SymbolElementCardWrap,
	SymbolElementParagraphStyled,
	SymbolElementChipsStyled,
} from './styles';

import { SvgComponent } from '../svg';
import { ColorThemeProps } from '../../types';

export type ChipsStatusProps = 'draft' | 'waiting' | 'canceled';

type SymbolMenyProps = {
	name: string;
	action: (prop?: any) => void;
	isDisabled?: boolean;
};

type SymbolElementProps = {
	// setSnackbarOpen?: (state: boolean) => void;
	// onSelectSymbol?: (name?: string) => void;
	svgElementsRef: any;
	chipsStatus?: ChipsStatusProps;
	geometry: string;
	height: number;
	width: number;
	theme: ColorThemeProps;
	name: string;
	id: string;
	meny: SymbolMenyProps[];
};

export const SymbolElement: React.FunctionComponent<SymbolElementProps> = ({
	// setSnackbarOpen,
	svgElementsRef,
	// onSelectSymbol,
	chipsStatus,
	geometry,
	height,
	width,
	theme,
	name,
	meny,
	id,
}): JSX.Element => {
	// const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	// const [isPreviewShow, setPreviewShow] = useState<boolean>(false);
	// const [selectedSymbol, setSelectedSymbol] = useState<IconProps>(icons[0]);

	// const onSelectSymbol = (selectedName: string) => {
	// 	const selected = icons.filter(({ name }) => name === selectedName)[0];

	// 	setSelectedSymbol(selected);
	// 	setPreviewShow(true);
	// };

	// const getSvg = (id: string) => {
	// 	if (!svgElementsRef || !svgElementsRef.current) return '';

	// 	// @ts-ignore next-line
	// 	const ref: HTMLDivElement = ref.current[id];
	// 	const svg = ref.getElementsByTagName('svg')[0];
	// 	const clone = svg.cloneNode(true) as SVGSVGElement;

	// 	return clone;
	// };

	// const getSvgString = (id: string) => {
	// 	const svg = getSvg(id);

	// 	if (!svg) return '';

	// 	const svgData = new XMLSerializer().serializeToString(svg);

	// 	return svgData;
	// };

	// const onDownloadSvg = (name: string, id: string) => {
	// 	const url = new Blob([getSvgString(id)], { type: 'image/svg+xml' });

	// 	saveAs(url, `${name}.svg`);
	// };

	// const onCopyToClipboard = (val: string) => {
	// 	copyToClipboard(val);
	// 	setSnackbarOpen && setSnackbarOpen(true);
	// };

	return (
		<>
			<SymbolElementCardWrap>
				<Card>
					{chipsStatus && <SymbolElementChipsStyled status={chipsStatus} />}
					<SymbolElementWrapStyled>
						<SymbolWrapperStyled ref={(ref) => (svgElementsRef.current[id] = ref)}>
							<SvgComponent viewBoxHeight={height} viewBoxWidth={width} height={95} width={95} fill={theme.fill} path={geometry} />
						</SymbolWrapperStyled>

						{/* 2 menys or dynamic? */}

						<SymbolMenyWrapStyled>
							{meny.map(({ name, action, isDisabled = false }) => (
								<li>
									<button disabled={isDisabled} onClick={action}>
										{name}
									</button>
								</li>
							))}
							{/* <li>
                <button onClick={() => onSelectSymbol && onSelectSymbol()}>Edit</button>
              </li>
              <li>
                <button onClick={() => onSendOnReview(name, id)}>Send on review</button>
              </li>
              <li>
                <button onClick={() => onDelete(name)}>Delete</button>
              </li> */}

							{/* <li>
                <button onClick={() => onCopyToClipboard(name)}>Copy</button>
              </li>
              <li>
                <button onClick={() => onDownloadSvg(name, id)}>Download</button>
              </li>
              <li>
                <button onClick={() => onSelectSymbol && onSelectSymbol(name)}>More...</button>
              </li> */}
						</SymbolMenyWrapStyled>
					</SymbolElementWrapStyled>
				</Card>
				<SymbolElementParagraphStyled>{name}</SymbolElementParagraphStyled>
			</SymbolElementCardWrap>
		</>
	);
};
