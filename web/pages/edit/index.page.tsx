import { useRef, useState, ChangeEvent, useEffect, useReducer } from 'react';
import { AuthenticatedTemplate } from '@azure/msal-react';
import type { NextPage } from 'next';
import { Button, Search } from '@equinor/eds-core-react';
import Head from 'next/head';

import {
	InformationComponentTypes,
	PanelDetailsComponent,
	InformationComponent,
	ZoomButtonsComponent,
	SymbolElement,
	WeatherLoader,
	useConfirm,
} from '../../components';

import { isObjEmpty, useAdminUserRole, useFileUpload } from '../../helpers';

import { EditPageProps, StatusProps, SymbolsProps } from '../../types';

import {
	PanelPresentationContentStyled,
	PanelPresentationStyled,
	PanelSymbolsListStyled,
	PanelContainerStyled,
	PanelSymbolsStyled,
	UploadSvgStyled,
	PanelSymbolsSearchWrapperStyled,
} from './styles';
import { ContainerStyled } from '../../styles/styles';

import {
	updateStatusMangeSymbolAction,
	getManageSymbolsQueryAction,
	updateManageSymbolAction,
	deleteMangeSymbolAction,
	uploadSvgFileAction,
	ManageSymbolsStore,
	SymbolUploadStore,
} from '../../store';
import React from 'react';
import { EditorCommandMessage, SymbolEditor, SymbolEditorEvent } from '../../components/symbolEditor';
import { useDebouncedCallback } from 'use-debounce';

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

	const [editorCommands, setEditorCommands] = useState<EditorCommandMessage[]>([]);
	const [searchingValue, setSearchingValue] = useState<string>('');

	const connectorsToScroll = useRef<{ [key: string]: HTMLDivElement | null }>({});

	// Workaround for popup to show same message more that 1 time
	const [update, forceUpdate] = useReducer((x) => x + 1, 0);

	const svgElementsRef = useRef([]);
	const fileInputRef = useRef<HTMLInputElement>();

	const [getConfirmation, ConfirmationComponent] = useConfirm({
		symbol: selectedSymbol,
		message: confirmationMessage,
		buttons: confirmationButtons,
	});

	const onPanelReset = () => {
		setSelectedSymbol(null);
	};

	const { error, handleFileChange, svgContent, isSvgFileLoading } = useFileUpload();

	const {
		isUpdateSymbolReposnseSucceeded,
		isDeleteSymbolReposnseSucceeded,
		manageDeleteSymbolsQuery,
		manageSymbolErrorMessage,
		manageUpdateSymbolsQuery,
		manageSymbolsQuery,
	} = ManageSymbolsStore.useState();

	const [icns, seIcns] = useState<SymbolsProps[] | []>([]);

	const [finishManageSymbolsQuery] = getManageSymbolsQueryAction.useBeckon();
	const [finishUpdateManageSymbol] = updateManageSymbolAction.useBeckon({ symbol: updateSymbol });

	const [finishDeleteManageSymbol] = deleteMangeSymbolAction.useBeckon({ id: deleteSymbol?.id });
	const [finishUpdateStatusSymbol] = updateStatusMangeSymbolAction.useBeckon({ id: statusSymbolId, data: { status: symbolStatus } });

	const [finishUploadSymbolsQuery] = uploadSvgFileAction.useBeckon({
		svgFile: uploadSvgFile,
		validationOnly: false,
		contentType: 'application/json',
	});

	const { validateSvgQuery, validateSvgErrorMessage, isSymbolUploadReposnseSucceeded } = SymbolUploadStore.useState();

	const isAdmin = useAdminUserRole();

	const isStatusReadyForReview = ({ status }: SymbolsProps) => status === 'ReadyForReview';
	const isStatusPublished = ({ status }: SymbolsProps) => status === 'Published';
	const isStatusRejected = ({ status }: SymbolsProps) => status === 'Rejected';
	const isStatusDraft = ({ status }: SymbolsProps) => status === 'Draft';

	const isReadyForReview = (symbol: SymbolsProps) => isAdmin && isStatusReadyForReview(symbol);

	// const refreshMangeSymbolsQuery = () => setTimeout(() => getManageSymbolsQueryAction.run(), 1000);
	const refreshMangeSymbolsQuery = () => getManageSymbolsQueryAction.run();

	const loadEditorCommand = ({ id, geometry, width, height, connectors }: SymbolsProps, readOnly = false) => {
		setEditorCommands([
			{ type: 'Symbol', action: 'Unload', data: undefined },
			{
				type: 'Settings',
				action: 'Update',
				data: {
					showGrid: true,
					readOnly,
				},
			},
			{
				type: 'Symbol',
				action: 'Load',
				data: {
					id,
					key: id,
					path: geometry,
					width,
					height,
					centerOfRotation: { x: width / 2, y: height / 2 }, // TODO: We don't have CoR in API yet,
					connectors: connectors,
				},
			},
		]);
	};

	useEffect(() => {
		if (!svgContent) return;

		setSelectedSymbol(svgContent);
		loadEditorCommand(svgContent);
	}, [svgContent]);

	useEffect(() => {
		if (!finishUpdateManageSymbol && updateSymbol) return;

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

		if (!isSymbolUploadReposnseSucceeded) forceUpdate();
	}, [error, validateSvgQuery.data]);

	useEffect(() => {
		// if (!finishUploadSymbolsQuery) return;
		if (isSymbolUploadReposnseSucceeded && !isObjEmpty(validateSvgQuery)) {
			setInformationMessage({
				title: 'New symbol',
				message: `Symbol ${validateSvgQuery.data.key} was added`,
				appearance: 'success',
			});

			onPanelReset();
			refreshMangeSymbolsQuery();
		}

		if (!isSymbolUploadReposnseSucceeded && !!validateSvgErrorMessage) {
			setInformationMessage({
				title: 'Error',
				message: validateSvgErrorMessage,
				appearance: 'error',
			});
		}
	}, [finishUploadSymbolsQuery, isSymbolUploadReposnseSucceeded]);

	const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		handleFileChange(e);
		onPanelReset();
	};

	const onEditSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onEditSymbol:', symbol);

		setSelectedSymbol(symbol);
		// Load symbol into editor
		loadEditorCommand(symbol);
	};

	const onShowSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onShowSymbol:', symbol);

		setSelectedSymbol(symbol);
		loadEditorCommand(symbol, true);

		return () => {
			if (!fileInputRef.current) return;
			fileInputRef.current.value = '';
		};
	};

	const onUpdateSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onUpdateSymbol:', symbol);
		setSelectedSymbol(symbol);
		loadEditorCommand(symbol);

		return () => {
			if (!fileInputRef.current) return;
			fileInputRef.current.value = '';
		};
	};

	const onChangeSymbolForDetail = (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		setEditorCommands([
			{
				type: 'Symbol',
				action: 'Update',
				data: {
					id: symbol.id,
					key: symbol.key,
					path: symbol.geometry,
					width: symbol.width,
					height: symbol.height,
					connectors: symbol.connectors,
					centerOfRotation: { x: symbol.width / 2, y: symbol.height / 2 },
				},
			},
		]);
		console.log('⚡️', 'onChangeSymbolForDetail:', symbol);
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
		const isApproved = await getConfirmation();

		console.log('⚡️', 'onSubmitOnReview', isApproved);

		setSelectedSymbol(symbol);

		if (isApproved) onSubmitReview(symbol);
	};

	const onSubmitReview = ({ id }: SymbolsProps) => {
		setStatusSymbolId(id);
		setSymbolStatus('ReadyForReview');
	};

	useEffect(() => {
		if (!finishUpdateStatusSymbol || statusSymbolId === null) return;

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
	}, [finishUpdateStatusSymbol]);

	const onDeleteConfirmation = async (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		setConfirmationMessage('Are you sure you want to delete');

		// @ts-ignore next-line
		const isApproved = await getConfirmation();

		if (isApproved) onDelete(symbol);
	};

	const onDelete = (symbol: SymbolsProps) => setDeleteSymbol(symbol);

	const onReview = async (symbol: SymbolsProps) => {
		setConfirmationMessage('Are you sure you want to review');
		setConfirmationButtons({ confirm: 'Approve', cancel: 'Rejected' });
		// @ts-ignore next-line
		const isApproved = (await getConfirmation()) as boolean;

		console.log('⚡️', 'onSubmitOnReview', isApproved);

		onSubmitAdminReview(symbol, isApproved);
	};

	const onSubmitAdminReview = ({ id }: SymbolsProps, isApproved: boolean | null) => {
		if (isApproved === null) return;

		setConfirmationButtons(null);
		setStatusSymbolId(id);
		setSymbolStatus(isApproved ? 'Published' : 'Rejected');
	};

	useEffect(() => {
		if ((isDeleteSymbolReposnseSucceeded || isUpdateSymbolReposnseSucceeded) && !manageSymbolErrorMessage) return;
		// Errors for update & delete actions
		setInformationMessage({
			title: 'Ops',
			message: manageSymbolErrorMessage ?? '',
			appearance: 'error',
		});
	}, [manageSymbolErrorMessage]);

	useEffect(() => {
		if (!isDeleteSymbolReposnseSucceeded) return;

		refreshMangeSymbolsQuery();
		onPanelReset();

		setInformationMessage({
			title: 'Deleted',
			message: `Symbol ${deleteSymbol?.key} was deleted`,
			appearance: 'success',
		});

		console.log('⚡️', 'Something went wrong:', manageDeleteSymbolsQuery);
	}, [finishDeleteManageSymbol, manageDeleteSymbolsQuery]);

	useEffect(() => {
		if (!isUpdateSymbolReposnseSucceeded) return;

		refreshMangeSymbolsQuery();
		// onPanelReset();

		setInformationMessage({
			title: 'Updated',
			message: `Symbol ${updateSymbol?.key} was updated`,
			appearance: 'success',
		});
	}, [manageUpdateSymbolsQuery]);

	const getSymbolVersion = ({ key, id }: SymbolsProps) => {
		if (manageSymbolsQuery.length <= 0) return 1;

		const filteredManageSymbols = manageSymbolsQuery.filter((sbl: SymbolsProps) => sbl.key === key && isStatusPublished(sbl));

		filteredManageSymbols.sort(
			// @ts-ignore next-line
			(a: SymbolsProps, b: SymbolsProps) => new Date(a.dateTimePublished).getTime() - new Date(b.dateTimePublished).getTime()
		);

		// Find the index of the object with the given id in the sorted array
		const index = filteredManageSymbols.findIndex((sbl: { id: string }) => sbl.id === id);

		// If the object with the given id is found, return its position + 1 as the version
		// If not found, return 1 (default version)
		return index !== -1 ? index + 1 : 1;
	};

	const getChipsStatus = (symbol: SymbolsProps) => {
		if (isStatusPublished(symbol)) {
			// Check publish data
			// dateTimePublished

			return getSymbolVersion(symbol);
		} else {
			return symbol.status;
		}
	};

	const symbolMeny = (symbol: SymbolsProps) => [
		{
			name: isStatusDraft(symbol) ? 'Edit' : isReadyForReview(symbol) ? 'View' : 'Revise',
			action: () => (isStatusDraft(symbol) ? onUpdateSymbol(symbol) : isReadyForReview(symbol) ? onShowSymbol(symbol) : onEditSymbol(symbol)),
			// isDisabled: !isStatusReadyForReview(symbol) && !isAdmin,
			// isDisabled: isStatusDraft(symbol) ? false : isStatusReadyForReview(symbol) ? !isAdmin : false,
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

	const scrollToElement = (id: string) => {
		const elementRef = connectorsToScroll.current[id];

		if (!elementRef) return;

		elementRef.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest',
		});
	};

	const onEditorEvent = ({ symbolState, data, reason, type }: SymbolEditorEvent) => {
		console.log(`EDITOR-EVENT:${type}:${reason}`);
		console.log('Event data: ', data);
		console.log('Symbol state: ', symbolState);

		switch (type) {
			case 'Symbol':
				switch (reason) {
					case 'Loaded':
						// setConnectors(event.symbolState?.connectors ?? []);
						break;
					default:
						break;
				}
				break;
			case 'Connector':
				{
					switch (reason) {
						case 'Added':
						case 'Updated':
							setSelectedSymbol({ ...selectedSymbol, connectors: symbolState?.connectors } as SymbolsProps);
							break;
						default:
							break;
					}
				}
				break;
			case 'Selection':
				switch (reason) {
					case 'Changed':
						{
							const changedConnectors = data.filter(({ type }) => type === 'Connector');
							if (changedConnectors.length === 0) {
								// setSelectedConnector(null);
							} else {
								// setSelectedConnector(
								//   (changedConnectors[0].data as SymbolConnector).id
								// );
							}
						}
						break;

					default:
						break;
				}
				break;

			default:
				break;
		}

		// @ts-ignore next-line
		if (data && data.length > 0) {
			// @ts-ignore next-line
			const { id } = data[0].data;

			scrollToElement(id);
		}
	};

	const addNewConnector = () => {
		setEditorCommands([{ type: 'Connector', action: 'New', data: undefined }]);
	};

	const onSearch = (val: string) => {
		setSearchingValue(val);

		if (val) {
			const searchedValue = manageSymbolsQuery.filter(({ key }: any) => key.toLocaleLowerCase().includes(val.toLocaleLowerCase()));

			seIcns(searchedValue);

			// window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		} else {
			seIcns(manageSymbolsQuery);
		}
	};

	const onZoom = (data: number) => setEditorCommands([{ type: 'Settings', action: 'ZoomInOrOut', data }]);

	useEffect(() => {
		seIcns(manageSymbolsQuery);
	}, [finishManageSymbolsQuery]);

	const debounceSearchValue = useDebouncedCallback((value) => onSearch(value), 1000);

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
						{isSvgFileLoading && <WeatherLoader />}

						<PanelPresentationContentStyled>
							{!!selectedSymbol && <SymbolEditor editorEventHandler={onEditorEvent} commands={editorCommands} />}
						</PanelPresentationContentStyled>

						{finishManageSymbolsQuery && selectedSymbol && (
							<>
								<ZoomButtonsComponent onZoomClick={onZoom} />
								<PanelDetailsComponent
									setUpdateDraftSymbol={onUpdateDraftSymbol}
									updateCurrentSymbol={onChangeSymbolForDetail}
									enableReinitialize={enableReinitialize}
									onAddConnector={addNewConnector}
									disabledForm={isReadyForReview(selectedSymbol) || false}
									onClosePanel={onPanelReset}
									elementRefs={connectorsToScroll}
									symbol={{ ...selectedSymbol }}
								/>
							</>
						)}
					</ContainerStyled>
				</PanelPresentationStyled>

				<PanelSymbolsStyled theme={theme}>
					<ContainerStyled>
						<PanelSymbolsSearchWrapperStyled>
							<Search
								aria-label="sitewide"
								id="search-normal"
								placeholder="Search"
								onChange={({ target }) => debounceSearchValue(target.value)}
							/>
						</PanelSymbolsSearchWrapperStyled>
						<PanelSymbolsListStyled>
							<li>
								<UploadSvgStyled>
									<label htmlFor="file">Choose file to upload</label>
									{/* @ts-ignore next-line */}
									<input type="file" id="file" ref={fileInputRef} name="file" accept=".svg" onChange={onChangeFileInput} />
								</UploadSvgStyled>
							</li>
							{!finishManageSymbolsQuery && <WeatherLoader />}
							{finishManageSymbolsQuery &&
								icns.length > 0 &&
								icns.map((symbol: SymbolsProps, id: number) => (
									<li key={id}>
										<SymbolElement
											meny={symbolMeny(symbol)}
											chipsStatus={getChipsStatus(symbol)}
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
