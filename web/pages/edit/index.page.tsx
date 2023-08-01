import { useRef, useState, ChangeEvent, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PanelDetailsComponent, SvgComponent, SymbolElement, InformationComponent, useConfirm, InformationComponentTypes } from '../../components';

import { EditPageProps, SymbolsProps } from '../../types';

import {
	PanelPresentationLinesWrapperStyled,
	PanelPresentationContentStyled,
	PanelPresentationMHLineStyled,
	PanelPresentationMRLineStyled,
	PanelPresentationMSLineStyled,
	PanelPresentationMVLineStyled,
	PanelPresentationStyled,
	PanelSymbolsListStyled,
	PanelContainerStyled,
	PanelSymbolsStyled,
	UploadSvgStyled,
} from './styles';
import { ContainerStyled } from '../../styles/styles';

import allSymbols from '../../data/symbols.json';
import { getUniqueId } from '../../helpers';

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);
	const [informationMessage, setInformationMessage] = useState<InformationComponentTypes>();
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolsProps | null>();

	const [symbols, setSymbols] = useState<SymbolsProps[]>(allSymbols);

	const svgElementsRef = useRef([]);
	const fileInputRef = useRef<HTMLInputElement>();

	const [getConfirmation, ConfirmationComponent] = useConfirm(selectedSymbol, confirmationMessage);

	const onPanelReset = () => setSelectedSymbol(null);

	const checkForbiddenElements = (content: string): boolean => {
		const forbiddenElements = ['image', 'mask', 'polygon', 'polyline', 'style'];

		for (const element of forbiddenElements) {
			const regex = new RegExp(`<${element}\\b[^>]*>`, 'gi');
			if (regex.test(content)) {
				return true;
			}
		}

		return false;
	};

	const getSymbolsFromLocalStorage = () => JSON.parse(localStorage.getItem('symbols') as string);

	const hasSymbolsInLocalStorage = () => getSymbolsFromLocalStorage() !== null;

	useEffect(() => setSymbols(hasSymbolsInLocalStorage() ? getSymbolsFromLocalStorage() : allSymbols), []);

	const convertSvgToObject = (svgElement: Element): object => {
		const svgData: any = {};
		svgData.tagName = svgElement.tagName.toLowerCase();

		// Store attributes
		const attributes = svgElement.attributes;
		for (let i = 0; i < attributes.length; i++) {
			const { name, value } = attributes[i];
			svgData[name] = value;
		}

		// Store child elements
		const children = svgElement.children;
		if (children.length > 0) {
			svgData.children = [];
			for (let i = 0; i < children.length; i++) {
				const childElement = children[i];
				const childData = convertSvgToObject(childElement);

				svgData.children.push(childData);
			}
		}

		return svgData;
	};

	const extractConnectorId = (id: string) => {
		const matches = id.match(/\d+$/);
		return matches ? matches[0] : '';
	};

	const convertInputSvgObjectToAPIStructureObject = (inputObject: any, key: string) => {
		const viewBox = inputObject.viewBox.split(' ').map(parseFloat);
		const outputObject = {
			id: getUniqueId(),
			key,
			description: 'None',
			dateTimeCreated: new Date(),
			dateTimeUpdated: new Date(),
			geometry: inputObject.children[0].children[0].d,
			width: viewBox[2],
			height: viewBox[3],
			connectors: inputObject.children[1].children
				.filter(({ tagName }: any) => tagName === 'circle')
				.map(({ id, cx, cy, r }: any) => ({
					id: extractConnectorId(id),
					relativePosition: {
						x: parseFloat(cx),
						y: parseFloat(cy),
					},
					// direction: parseFloat(r),
					// TODO: do it in better way?
					direction: '90',
				})),
		};

		return outputObject;
	};

	const onChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		onPanelReset();

		if (!file || file.type !== 'image/svg+xml') return;

		const reader = new FileReader();

		reader.onload = (fileEvent) => {
			const contents = fileEvent.target?.result;
			const hasForbiddenElements = checkForbiddenElements(contents as string);

			const FIND_MORE = 'To find more information, <a href="./documentation" target="_blank">read documentation</a>';

			if (typeof contents !== 'string' || hasForbiddenElements) {
				setInformationMessage({
					title: 'Error',
					message: `Svg has forbidden elements, ${FIND_MORE}`,
					appearance: 'error',
				});

				return;
			}

			const parser = new DOMParser();
			const svgDocument = parser.parseFromString(contents, 'image/svg+xml');
			const svgElement = svgDocument.documentElement;

			if (svgElement.tagName.toLowerCase() === 'svg') {
				const convertedSvgToObject = convertSvgToObject(svgElement);
				const { tagName, children }: any = convertedSvgToObject;
				const ANNOTATIONS = 'Annotations';
				const SYMBOL = 'Symbol';
				// HEIGHT, WIDTH - can be validate & edit itro panel. Now it based on viewBox

				if (tagName !== 'svg') {
					setInformationMessage({
						title: 'Error',
						message: 'Allows only svg files',
						appearance: 'error',
					});

					return;
				}

				const getChildrenSvgIds = children.map((el: any) => el.id);

				if (!getChildrenSvgIds.includes(SYMBOL) && !getChildrenSvgIds.includes(ANNOTATIONS)) {
					setInformationMessage({
						title: 'Error',
						message: `Svg must include ${SYMBOL} & ${ANNOTATIONS} ids. ${FIND_MORE}`,
						appearance: 'error',
					});

					return;
				}

				const foundSymbols = children.find(({ id }: { id: string }) => id === SYMBOL);
				const foundAnnotations = children.find(({ id }: { id: string }) => id === ANNOTATIONS);

				if (!foundAnnotations || !foundAnnotations.children || !foundSymbols || !foundSymbols.children) {
					setInformationMessage({
						title: 'Error',
						message: `${ANNOTATIONS} or ${SYMBOL} not found. ${FIND_MORE}`,
						appearance: 'error',
					});

					return;
				}

				if (foundSymbols.tagName !== 'g' || foundAnnotations.tagName !== 'g') {
					setInformationMessage({
						title: 'Error',
						message: `Allows only 'g' tag for wrapping ${SYMBOL} & ${ANNOTATIONS}. ${FIND_MORE}`,
						appearance: 'error',
					});

					return;
				}

				if (foundSymbols.children.length !== 1) {
					setInformationMessage({
						title: 'Error',
						message: `Allows only singel path for ${SYMBOL}. ${FIND_MORE}`,
						appearance: 'error',
					});

					return;
				}

				if (foundSymbols.children[0].tagName !== 'path') {
					setInformationMessage({
						title: 'Error',
						message: `Allows only path for ${SYMBOL}. ${FIND_MORE}`,
						appearance: 'error',
					});

					return;
				}

				if (foundSymbols.children.length <= 0) {
					setInformationMessage({
						title: 'Error',
						message: `Minimal amount for ${SYMBOL} is 1. ${FIND_MORE}`,
						appearance: 'error',
					});

					return;
				}

				const isArrayOfCircleObjects = (arr: any) => {
					const requiredProperties = ['tagName', 'id', 'cx', 'cy', 'r'];

					return arr.reduce((result: any, obj: { hasOwnProperty: (arg0: string) => unknown; tagName: string }) => {
						return result && requiredProperties.every((prop) => obj.hasOwnProperty(prop)) && obj.tagName === 'circle';
					}, true);
				};

				// Check if all objects in the array have the same properties as the first object
				if (!isArrayOfCircleObjects(foundAnnotations.children)) {
					setInformationMessage({
						title: 'Error',
						message: `Objects in the array have different structures or missing some properties. ${FIND_MORE}`,
						appearance: 'error',
					});

					return;
				}

				// Convert from convertedSvgToObject to SymbolProps
				const keyName = file.name.replace('.svg', '');
				const svgContent = convertInputSvgObjectToAPIStructureObject(convertedSvgToObject, keyName) as unknown as SymbolsProps;
				console.log('⚡️', 'svgContent:', svgContent);
				// IF all is good
				setSelectedSymbol(svgContent);
			} else {
				setInformationMessage({
					title: 'Error',
					message: `⛔️ ⛔️ ⛔️ Invalid SVG file. ${FIND_MORE}`,
					appearance: 'error',
				});
			}
		};

		reader.readAsText(file);
	};

	const onEditSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onEditSymbol:', symbol);
		setSelectedSymbol(symbol);
		setEnableReinitialize(true);

		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);

			if (!fileInputRef.current) return;
			fileInputRef.current.value = '';
		};
	};

	const onChangeSymbolForDetail = ({ connectors }: SymbolsProps) => {
		console.log('⚡️', 'onChangeSymbolForDetail:');

		setSelectedSymbol({ ...selectedSymbol, connectors } as SymbolsProps);
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

	const onSubmitOnReview = async () => {
		// Clear all Drafts after push
		setConfirmationMessage('Are you sure you want to submit for review');
		// @ts-ignore next-line
		const status = await getConfirmation();

		console.log('⚡️', 'onSubmitOnReview', status);

		if (!status) return;

		setInformationMessage({
			title: 'Thank you',
			message: 'Your symbol has been submit for review',
		});
	};

	const onDeleteConfirmation = async (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);

		setConfirmationMessage('Are you sure you want to delete');

		// @ts-ignore next-line
		const status = await getConfirmation();

		if (status) onDelete(symbol);
	};

	const onDelete = ({ key, state }: SymbolsProps) => {
		const isDraft = state === 'draft';

		if (isDraft && hasSymbolsInLocalStorage()) {
			const updatedSymbols = getSymbolsFromLocalStorage().filter((item: SymbolsProps) => item.key !== key);

			localStorage.setItem('symbols', JSON.stringify(updatedSymbols));
			setSymbols(updatedSymbols);

			onPanelReset();
		} else {
			console.log('⚡️', 'onDelete:', 'isDraft:', isDraft, 'hasSymbolsInLocalStorage:', hasSymbolsInLocalStorage());
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
			name: 'Submit for review',
			action: () => onSubmitOnReview(),
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
							{!!selectedSymbol && (
								<SvgComponent
									renderConnectors
									viewBoxHeight={selectedSymbol.height}
									viewBoxWidth={selectedSymbol.width}
									connectors={selectedSymbol.connectors}
									height={250}
									width={250}
									fill={theme.fill}
									path={selectedSymbol.geometry}
								/>
							)}
						</PanelPresentationContentStyled>
						{selectedSymbol && (
							<PanelDetailsComponent
								symbol={{ ...selectedSymbol }}
								symbols={symbols}
								onClosePanel={onPanelReset}
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
				<InformationComponent {...informationMessage} />
				{/* @ts-ignore next-line */}
				<ConfirmationComponent />
			</PanelContainerStyled>
		</div>
	);
};

export default Edit;
