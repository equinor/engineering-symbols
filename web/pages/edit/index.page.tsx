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

import { hasAdminUserRole, useFileUpload } from '../../helpers';

import { EditPageProps, StatusProps, SymbolsProps } from '../../types';

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

import {
	ManageSymbolsStore,
	SymbolUploadStore,
	deleteMangeSymbolAction,
	getMangeSymbolsQueryAction,
	updateMangeSymbolAction,
	updateStatusMangeSymbolAction,
	uploadSvgFileAction,
} from '../../store';

// const icons = allSymbols.map(({ key, geometry, ...rest }) => ({
// 	key,
// 	paths: geometry,
// 	...rest,
// }));

// 'Draft', 'ReadyForReview', 'Review', 'Published', 'Rejected'

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [confirmationButtons, setConfirmationButtons] = useState<{ confirm: string; cancel: string } | null>(null);

	const [informationMessage, setInformationMessage] = useState<InformationComponentTypes>();

	const [selectedSymbol, setSelectedSymbol] = useState<SymbolsProps | null>(null);
	const [deleteSymbol, setDeleteSymbol] = useState<SymbolsProps | null>(null);
	const [updateSymbol, setUpdateSymbol] = useState<SymbolsProps | null>(null);

	const [statusSymbolId, setStatusSymbolId] = useState<string | null>(null);
	const [symbolStatus, setSymbolStatus] = useState<StatusProps | null>(null);

	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);

	const [uploadSvgFile, setSvgFile] = useState<SymbolsProps | null>(null);

	// Workaround for popup to show same message more that 1 time
	const [update, forceUpdate] = useReducer((x) => x + 1, 0);

	const svgElementsRef = useRef([]);
	const fileInputRef = useRef<HTMLInputElement>();

	const [getConfirmation, ConfirmationComponent] = useConfirm({
		symbol: selectedSymbol,
		message: confirmationMessage,
		buttons: confirmationButtons,
	});

	const onPanelReset = () => setSelectedSymbol(null);

	const { error, handleFileChange, svgContent, isSvgFileLoading } = useFileUpload();

	const { manageSymbolsQuery, manageDeleteSymbolsQuery, manageUpdateSymbolsQuery } = ManageSymbolsStore.useState();

	const [finishMangeSymbolsQuery] = getMangeSymbolsQueryAction.useBeckon();
	const [finishUpdateMangeSymbolsQuery] = updateMangeSymbolAction.useBeckon({ symbol: updateSymbol });

	const [finishDeleteMangeSymbolsQuery] = deleteMangeSymbolAction.useBeckon({ id: deleteSymbol?.id });
	const [finishUpdateStatusMangeSymbolsQuery] = updateStatusMangeSymbolAction.useBeckon({ id: statusSymbolId, data: { status: symbolStatus } });

	const [finishUploadSymbolsQuery] = uploadSvgFileAction.useBeckon({
		svgFile: uploadSvgFile,
		validationOnly: false,
		contentType: 'application/json',
	});

	const isAdmin = hasAdminUserRole();
	const { validateSvgQuery } = SymbolUploadStore.useState();
	// const { status, data } = validateSvgQuery;

	const hasSucceededReposnse = (status: number) => status !== undefined && (status === 200 || status === 201 || status === 204);

	const isStatusDraft = ({ status }: SymbolsProps) => status === 'Draft';
	const isStatusReadyForReview = ({ status }: SymbolsProps) => status === 'ReadyForReview';
	const isStatusRejected = ({ status }: SymbolsProps) => status === 'Rejected';

	const isReadyForReview = (symbol: SymbolsProps) => isAdmin && isStatusReadyForReview(symbol);

	// const refreshMangeSymbolsQuery = () => setTimeout(() => getMangeSymbolsQueryAction.run(), 1000);
	const refreshMangeSymbolsQuery = () => getMangeSymbolsQueryAction.run();

	const concatenateErrorMessages = (data: Record<string, string[]>): string => {
		let allErrorMessages = '';

		for (const key in data) {
			if (data.hasOwnProperty(key) && Array.isArray(data[key])) {
				const errorMessages = data[key].join(' ');
				allErrorMessages += errorMessages + ' ';
			}
		}

		return allErrorMessages.trim(); // Remove trailing space before returning
	};

	useEffect(() => {
		if (!svgContent) return;

		setSelectedSymbol(svgContent);
	}, [svgContent]);

	useEffect(() => {
		if (!finishUpdateMangeSymbolsQuery && updateSymbol) return;

		setInformationMessage({
			title: 'Updated',
			message: `Symbol ${selectedSymbol?.key} was updated`,
			appearance: 'success',
		});
	}, [updateSymbol]);

	useEffect(() => {
		// File upload error
		if (!!error) {
			forceUpdate();

			setInformationMessage({
				title: error.title,
				message: error.message,
				appearance: 'error',
				refresh: update,
			});
		}

		if (!hasSucceededReposnse(validateSvgQuery.status)) forceUpdate();
	}, [error, validateSvgQuery.data]);

	useEffect(() => {
		if (!finishUploadSymbolsQuery) return;

		if (hasSucceededReposnse(validateSvgQuery.status)) {
			setInformationMessage({
				title: 'New symbol',
				message: `Symbol ${selectedSymbol?.key} was added`,
				appearance: 'success',
			});

			refreshMangeSymbolsQuery();
			onPanelReset();
		}

		if (!hasSucceededReposnse(validateSvgQuery.status)) {
			setInformationMessage({
				title: 'Error',
				message: concatenateErrorMessages(validateSvgQuery?.data?.errors),
				appearance: 'error',
			});

			refreshMangeSymbolsQuery();
		}
	}, [finishUploadSymbolsQuery]);

	const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		handleFileChange(e);
		onPanelReset();
	};

	const onEditSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onEditSymbol:', symbol);
		setSelectedSymbol(symbol);
		// setEnableReinitialize(true);

		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);

			if (!fileInputRef.current) return;
			fileInputRef.current.value = '';
		};
	};

	const onUpdateSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onUpdateSymbol:', symbol);
		setSelectedSymbol(symbol);
		// setEnableReinitialize(true);

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

	const onUpdateDraftSymbol = (symbol: SymbolsProps) => {
		if (isStatusDraft(symbol)) {
			setUpdateSymbol(symbol);
		} else {
			// ADD validation
			setSvgFile(symbol);
		}

		console.log(100, 'manageSymbolsQuery:', manageSymbolsQuery);
		console.log(101, 'finishUploadSymbolsQuery:', finishUploadSymbolsQuery);
	};

	const onSubmitOnReview = async (symbol: SymbolsProps) => {
		// Clear all Drafts after push
		setConfirmationMessage('Are you sure you want to submit for review');
		// @ts-ignore next-line
		const status = await getConfirmation();

		console.log('⚡️', 'onSubmitOnReview', status);

		setSelectedSymbol(symbol);

		if (status) onSubmitReview(symbol);
	};

	const onSubmitReview = ({ key, id }: SymbolsProps) => {
		setStatusSymbolId(id);
		setSymbolStatus('ReadyForReview');
	};

	useEffect(() => {
		if (!finishUpdateStatusMangeSymbolsQuery || statusSymbolId === null) return;

		refreshMangeSymbolsQuery();

		if (symbolStatus === 'ReadyForReview') {
			setInformationMessage({
				title: 'Thank you',
				message: `Your symbol ${selectedSymbol?.key} has been submited for review`,
				appearance: 'success',
			});
		}
		if (symbolStatus === 'Published') {
			setInformationMessage({
				title: 'Thank you',
				message: `Your symbol ${selectedSymbol?.key} has been approved`,
				appearance: 'success',
			});
		}
		if (symbolStatus === 'Rejected') {
			setInformationMessage({
				title: 'Thank you',
				message: `Your symbol ${selectedSymbol?.key} has been rejected`,
				appearance: 'error',
			});
		}
	}, [finishUpdateStatusMangeSymbolsQuery]);

	const onDeleteConfirmation = async (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		setConfirmationMessage('Are you sure you want to delete');

		// @ts-ignore next-line
		const status = await getConfirmation();

		if (status) onDelete(symbol);
	};

	console.log(444, manageDeleteSymbolsQuery, manageDeleteSymbolsQuery.state);

	const onDelete = (symbol: SymbolsProps) => setDeleteSymbol(symbol);

	const onReview = async (symbol: SymbolsProps) => {
		setConfirmationMessage('Are you sure you want to review');
		setConfirmationButtons({ confirm: 'Approve', cancel: 'Rejected' });
		// @ts-ignore next-line
		const status = (await getConfirmation()) as boolean;

		console.log('⚡️', 'onSubmitOnReview', status);

		onSubmitAdminReview(symbol, status);
	};

	const onSubmitAdminReview = ({ id }: SymbolsProps, isApproved: boolean | null) => {
		if (isApproved === null) return;

		setConfirmationButtons(null);
		setStatusSymbolId(id);
		setSymbolStatus(isApproved ? 'Published' : 'Rejected');
	};

	useEffect(() => {
		if (hasSucceededReposnse(manageDeleteSymbolsQuery.status)) {
			refreshMangeSymbolsQuery();
			onPanelReset();

			setInformationMessage({
				title: 'Deleted',
				message: `Symbol ${deleteSymbol?.key} was deleted`,
				appearance: 'success',
			});
		}

		if (!hasSucceededReposnse(manageDeleteSymbolsQuery.status)) {
			setInformationMessage({
				title: 'Ops',
				message: concatenateErrorMessages(manageDeleteSymbolsQuery?.data?.errors),
				appearance: 'error',
			});

			console.log('⚡️', 'Something went wrong manageDeleteSymbolsQuery:', manageDeleteSymbolsQuery);
		}
	}, [finishDeleteMangeSymbolsQuery, manageDeleteSymbolsQuery]);

	useEffect(() => {
		if (hasSucceededReposnse(manageUpdateSymbolsQuery.status)) {
			refreshMangeSymbolsQuery();
			onPanelReset();

			setInformationMessage({
				title: 'Updated',
				message: `Symbol ${updateSymbol?.key} was updated`,
				appearance: 'success',
			});
		}

		if (!hasSucceededReposnse(manageUpdateSymbolsQuery.status)) {
			setInformationMessage({
				title: 'Ops',
				message: concatenateErrorMessages(manageUpdateSymbolsQuery?.data?.errors),
				appearance: 'error',
			});
			console.log('⚡️', 'Something went wrong manageUpdateSymbolsQuery:', manageUpdateSymbolsQuery);
		}
	}, [manageUpdateSymbolsQuery]);

	const symbolMeny = (symbol: SymbolsProps) => [
		{
			name: isStatusDraft(symbol) ? 'Update' : isReadyForReview(symbol) ? 'Show' : 'Edit',
			action: () => (isStatusDraft(symbol) ? onUpdateSymbol(symbol) : onEditSymbol(symbol)),
			// isDisabled: !isStatusReadyForReview(symbol) && !isAdmin,
			isDisabled: isStatusDraft(symbol) ? false : isStatusReadyForReview(symbol) ? !isAdmin : false,
		},
		{
			name: isReadyForReview(symbol) ? 'Review' : 'Submit for review',
			action: () => (isReadyForReview(symbol) ? onReview(symbol) : onSubmitOnReview(symbol)),
			isDisabled: !isStatusDraft(symbol) && !isReadyForReview(symbol),
		},
		{
			name: 'Delete',
			action: () => onDeleteConfirmation(symbol),
			isDisabled: !isStatusDraft(symbol) && !isStatusRejected(symbol),
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
									path={selectedSymbol.geometry}
								/>
							)}
						</PanelPresentationContentStyled>
						{finishMangeSymbolsQuery && selectedSymbol && (
							<PanelDetailsComponent
								symbol={{ ...selectedSymbol }}
								symbols={manageSymbolsQuery}
								onClosePanel={onPanelReset}
								enableReinitialize={enableReinitialize}
								updateCurrentSymbol={onChangeSymbolForDetail}
								setUpdateDraftSymbol={onUpdateDraftSymbol}
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
							{!finishMangeSymbolsQuery && <WeatherLoader />}
							{finishMangeSymbolsQuery &&
								manageSymbolsQuery &&
								manageSymbolsQuery.map((symbol: SymbolsProps, id: number) => (
									<li key={id}>
										<SymbolElement
											meny={symbolMeny(symbol)}
											chipsStatus={symbol.status}
											svgElementsRef={svgElementsRef}
											width={symbol.width}
											height={symbol.height}
											paths={symbol.geometry}
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
