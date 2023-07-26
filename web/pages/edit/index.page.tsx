import { useRef, useState, ChangeEvent, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PanelDetailsComponent, SvgComponent, SymbolElement } from '../../components';

import { EditPageProps, SymbolsProps } from '../../types';

import {
	PanelContainerStyled,
	PanelPresentationContentStyled,
	PanelPresentationLinesWrapperStyled,
	PanelPresentationMHLineStyled,
	PanelPresentationMRLineStyled,
	PanelPresentationMSLineStyled,
	PanelPresentationMVLineStyled,
	PanelPresentationStyled,
	PanelSymbolsListStyled,
	PanelSymbolsStyled,
	UploadSvgStyled,
} from './styles';
import allSymbols from '../../data/symbols.json';
import { ContainerStyled } from '../../styles/styles';
import useConfirm from '../../components/confirmation/Confirmation';

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [symbols, setSymbols] = useState<SymbolsProps[]>(allSymbols);
	const [svgContent, setSvgContent] = useState(null);
	const [confirmationContent, setConfirmationContent] = useState('');
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolsProps | null>();
	// const [currentSymbolConnectors, setCurrentSymbolConnectors] = useState<ConnectorsProps[] | []>([]);
	const [symbolForDetail, setSymbolForDetail] = useState<any>(null);
	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);

	const svgElementsRef = useRef([]);
	const fileInputRef = useRef<HTMLInputElement>();

	const [getConfirmation, ConfirmationComponent] = useConfirm(selectedSymbol, confirmationContent);

	const checkForbiddenElements = (content: string): boolean => {
		// const forbiddenElements = ['image', 'mask', 'polygon', 'polyline', 'style'];
		const forbiddenElements = ['image', 'polygon', 'polyline', 'style'];

		for (const element of forbiddenElements) {
			const regex = new RegExp(`<${element}\\b[^>]*>`, 'gi');
			if (regex.test(content)) {
				return true;
			}
		}

		return false;
	};

	useEffect(() => {
		const getSymbolsLocaly = localStorage.getItem('symbols');
		// @ts-ignore
		const localStorageSymbols =
			JSON.parse(getSymbolsLocaly) === null || JSON.parse(getSymbolsLocaly).length <= 0 ? allSymbols : JSON.parse(getSymbolsLocaly);

		setSymbols(localStorageSymbols);
	}, []);

	const convertSvgToJson = (svgElement: Element): object => {
		const svgData: any = {};
		svgData.tagName = svgElement.tagName.toLowerCase();

		// Store attributes
		const attributes = svgElement.attributes;
		for (let i = 0; i < attributes.length; i++) {
			const attribute = attributes[i];
			svgData[attribute.name] = attribute.value;
		}

		// Store child elements
		const children = svgElement.children;
		if (children.length > 0) {
			svgData.children = [];
			for (let i = 0; i < children.length; i++) {
				const childElement = children[i];
				const childData = convertSvgToJson(childElement);
				svgData.children.push(childData);
			}
		}

		return svgData;
	};

	const onChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(1, 'onChangeFileInput');
		if (!file || file.type !== 'image/svg+xml') return;

		const reader = new FileReader();

		reader.onload = (fileEvent) => {
			const contents = fileEvent.target?.result;
			// Show error if there is forbidden elements
			// setSvgContent(contents as string);

			const hasForbiddenElements = checkForbiddenElements(contents as string);
			console.log('hasForbiddenElements:', hasForbiddenElements);

			if (typeof contents !== 'string' || hasForbiddenElements) return;

			setSvgContent(contents as any);
			setSelectedSymbol(null);
			setSymbolForDetail(contents);

			const parser = new DOMParser();
			const svgDocument = parser.parseFromString(contents, 'image/svg+xml');
			const svgElement = svgDocument.documentElement;

			if (svgElement.tagName.toLowerCase() === 'svg') {
				const svgData = convertSvgToJson(svgElement);
				console.log(100, 'svgData:', svgData);
			} else {
				console.error('Invalid SVG file');
			}
		};

		reader.readAsText(file);
	};

	const onEditSymbol = (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		setSvgContent(null);
		setSymbolForDetail(symbol);
		setEnableReinitialize(true);
		// setCurrentSymbolConnectors(symbol.connectors);

		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);

			if (!fileInputRef.current) return;
			fileInputRef.current.value = '';
		};
	};

	const onChangeSymbolForDetail = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onChangeSymbolForDetail:');

		setSymbolForDetail({ ...symbolForDetail, connectors: symbol.connectors });
	};

	const onUpdateSymbolToDraft = (newSymbol: SymbolsProps) => {
		const newSybolWithStatus: SymbolsProps = {
			...newSymbol,
			state: 'draft',
		};

		setSymbols([...symbols, newSybolWithStatus]);

		// When you click on onSubmit -> local storage updates
		localStorage.setItem('symbols', JSON.stringify([...symbols, newSybolWithStatus]));
	};

	const onFileUpload = () => fileInputRef.current && fileInputRef.current.click();

	const onSendOnReview = async () => {
		// Clear all Drafts after push
		setConfirmationContent('Are you sure you want to send on review');
		const status = await getConfirmation();

		console.log('⚡️', 'onSendOnReview', status);
		// localStorage.clear();
	};

	const onDeleteConfirmation = async (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		setSymbolForDetail(symbol);

		setConfirmationContent('Are you sure you want to delete');

		const status = await getConfirmation();

		if (status) onDelete(symbol);
	};

	const onDelete = ({ key, state }: SymbolsProps) => {
		console.log('⚡️', 'onDelete');
		const isDraft = state === 'draft';

		if (isDraft) {
			const getSymbolsLocaly = JSON.parse(localStorage.getItem('symbols')) as SymbolsProps[];

			if (getSymbolsLocaly && getSymbolsLocaly?.length > 0) {
				const updatedSymbols = getSymbolsLocaly.filter((item) => item.key !== key);

				localStorage.setItem('symbols', JSON.stringify(updatedSymbols));
				setSymbols(updatedSymbols);
			}
		} else {
		}
		// Check if Draft or not
		// Clear by ID
	};

	const symbolMeny = (symbol: SymbolsProps, isDisabled: boolean) => [
		{
			name: 'Edit',
			action: () => onEditSymbol(symbol),
		},
		{
			name: 'Send on review',
			action: () => onSendOnReview(),
			isDisabled,
		},
		{
			name: 'Delete',
			action: () => onDeleteConfirmation(symbol),
		},
	];

	return (
		<div>
			<Head>
				<title>🍯 Engineering symbols</title>
				<meta name="description" content="Your new Engineering symbols library." />
				<link rel="icon" href="/favicon.ico" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>

			<PanelContainerStyled>
				<PanelPresentationStyled>
					<ContainerStyled>
						<PanelPresentationLinesWrapperStyled>
							<PanelPresentationMHLineStyled />
							<PanelPresentationMVLineStyled />
							<PanelPresentationMRLineStyled />
							<PanelPresentationMSLineStyled />
						</PanelPresentationLinesWrapperStyled>
						<PanelPresentationContentStyled>
							{!!selectedSymbol ? (
								<SvgComponent
									renderConnectors
									viewBoxHeight={selectedSymbol.height}
									viewBoxWidth={selectedSymbol.width}
									connectors={symbolForDetail.connectors}
									height={250}
									width={250}
									fill={theme.fill}
									path={selectedSymbol.geometry}
								/>
							) : (
								// @ts-ignore
								<div dangerouslySetInnerHTML={{ __html: svgContent }} />
							)}
						</PanelPresentationContentStyled>
						{symbolForDetail && (
							<PanelDetailsComponent
								symbol={{ ...symbolForDetail }}
								symbols={symbols}
								isExistingSvg={!!selectedSymbol}
								enableReinitialize={enableReinitialize}
								updateCurrentSymbol={onChangeSymbolForDetail}
								setUpdateSymbolToDraft={onUpdateSymbolToDraft}
							/>
						)}
					</ContainerStyled>
				</PanelPresentationStyled>

				<PanelSymbolsStyled theme={theme}>
					<ContainerStyled>
						<PanelSymbolsListStyled>
							<li>
								<UploadSvgStyled>
									<label htmlFor="file">Choose file to upload</label>
									{/* @ts-ignore next-line */}
									<input type="file" id="file" ref={fileInputRef} name="file" accept=".svg" onChange={onChangeFileInput} />
								</UploadSvgStyled>
							</li>
							{symbols.map((symbol) => {
								const isDisabled = symbol.state !== 'draft';

								return (
									<li key={symbol.key}>
										<SymbolElement
											meny={symbolMeny(symbol, isDisabled)}
											chipsStatus={symbol.state}
											svgElementsRef={svgElementsRef}
											width={symbol.width}
											height={symbol.height}
											geometry={symbol.geometry}
											id={symbol.id}
											theme={theme}
											name={symbol.key}
										/>
									</li>
								);
							})}
						</PanelSymbolsListStyled>
					</ContainerStyled>
				</PanelSymbolsStyled>
				{/* @ts-ignore next-line */}
				<ConfirmationComponent />
			</PanelContainerStyled>
		</div>
	);
};

export default Edit;
