import { useRef, useState, ChangeEvent, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PanelDetailsComponent, SvgComponent, SymbolElement, InformationComponent, useConfirm, InformationComponentTypes } from '../../components';

import { EditPageProps, SymbolsProps, WebSymbolsProps } from '../../types';

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
import { getUniqueId, useFileUpload } from '../../helpers';
import { AuthenticatedTemplate } from '@azure/msal-react';

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);
	const [informationMessage, setInformationMessage] = useState<InformationComponentTypes>();
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolsProps | null | WebSymbolsProps>();

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

	const { selectedFile, uploadStatus, error, handleFileChange, svgContent } = useFileUpload();

	// console.log(100, 'selectedFile:', selectedFile);
	// console.log(101, 'uploadStatus:', uploadStatus);
	// console.log(102, 'error:', error);

	useEffect(() => {
		console.log(202, 'svgContent:', svgContent);
		if (svgContent) {
			// if(svgContent.length >= 1) {
			setSelectedSymbol(svgContent);
			console.log(201, 'svgContent:', svgContent);
			// }
		}
	}, [svgContent]);

	const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		handleFileChange(e);
		console.log(103, 'svgContent:', svgContent);
		// setSelectedSymbol(svgContent);
		onPanelReset();
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

	// const onFileUpload = () => fileInputRef.current && fileInputRef.current.click();

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
			appearance: 'success',
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

	const symbolMeny = (symbol: SymbolsProps) => [
		{
			name: 'Edit',
			action: () => onEditSymbol(symbol),
		},
		{
			name: 'Submit for review',
			action: () => onSubmitOnReview(),
			isDisabled: symbol.state !== 'draft',
		},
		{
			name: 'Delete',
			action: () => onDeleteConfirmation(symbol),
		},
	];

	return (
		<AuthenticatedTemplate>
			<Head>
				<title>🍯 Customize Engineering Symbols</title>
				<meta name="description" content="Tailor engineering symbols to your needs." />
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
							{console.log(200, 'selectedSymbol:', selectedSymbol)}
							{!!selectedSymbol && (
								<SvgComponent
									renderConnectors
									viewBoxHeight={selectedSymbol.height}
									viewBoxWidth={selectedSymbol.width}
									connectors={selectedSymbol.connectors}
									height={250}
									width={250}
									fill={theme.fill}
									path={selectedSymbol.paths || selectedSymbol.paths}
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
							{symbols.map((symbol) => (
								<li key={symbol.key}>
									<SymbolElement
										meny={symbolMeny(symbol)}
										chipsStatus={symbol.state}
										svgElementsRef={svgElementsRef}
										width={symbol.width}
										height={symbol.height}
										paths={symbol.paths || symbol.paths}
										id={symbol.id}
										theme={theme}
										name={symbol.key}
									/>
								</li>
							))}
						</PanelSymbolsListStyled>
					</ContainerStyled>
				</PanelSymbolsStyled>
				<InformationComponent {...informationMessage} />
				{/* @ts-ignore next-line */}
				<ConfirmationComponent />
			</PanelContainerStyled>
		</AuthenticatedTemplate>
	);
};

export default Edit;
