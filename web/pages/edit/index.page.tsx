import { useRef, useState, ChangeEvent, useEffect, useReducer } from 'react';
import { AuthenticatedTemplate } from '@azure/msal-react';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
	InformationComponentTypes,
	PanelDetailsComponent,
	InformationComponent,
	SymbolElement,
	WeatherLoader,
	SvgComponent,
	useConfirm,
} from '../../components';

import { useFileUpload } from '../../helpers';

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

const icons = allSymbols.map(({ key, geometry, ...rest }) => ({
	key,
	paths: geometry,
	...rest,
}));

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);
	const [informationMessage, setInformationMessage] = useState<InformationComponentTypes>();
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolsProps | null>(null);

	const [symbols, setSymbols] = useState<SymbolsProps[]>(icons);
	// Workaround for popup to show same message more that 1 time
	const [update, forceUpdate] = useReducer((x) => x + 1, 0);

	const svgElementsRef = useRef([]);
	const fileInputRef = useRef<HTMLInputElement>();

	const [getConfirmation, ConfirmationComponent] = useConfirm(selectedSymbol, confirmationMessage);

	const onPanelReset = () => setSelectedSymbol(null);

	const getSymbolsFromLocalStorage = () => JSON.parse(localStorage.getItem('symbols') as string);

	const hasSymbolsInLocalStorage = () => getSymbolsFromLocalStorage() !== null;

	const { error, handleFileChange, svgContent, isSvgFileLoading } = useFileUpload();

	useEffect(() => setSymbols(hasSymbolsInLocalStorage() ? getSymbolsFromLocalStorage() : icons), []);

	useEffect(() => {
		if (!svgContent) return;

		setSelectedSymbol(svgContent);
	}, [svgContent]);

	useEffect(() => {
		if (!error) return;

		forceUpdate();

		setInformationMessage({
			title: error.title,
			message: error.message,
			appearance: 'error',
			refresh: update,
		});
	}, [error]);

	const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		handleFileChange(e);
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
			message: 'Your symbol has been submited for review',
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
						{isSvgFileLoading && <WeatherLoader />}
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
									path={selectedSymbol.paths}
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
										paths={symbol.paths}
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
