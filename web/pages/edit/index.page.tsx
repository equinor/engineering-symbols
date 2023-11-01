import React, { useRef, useState, ChangeEvent, useEffect, useReducer } from 'react';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { useDebouncedCallback } from 'use-debounce';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
	PanelDetailsInformationComponent,
	InformationComponentTypes,
	PanelDetailsComponent,
	InformationComponent,
	ZoomButtonsComponent,
	IconButtonComponent,
	ListComponent,
	WeatherLoader,
	useConfirm,
} from '../../components';

import { isStatusDraft, isStatusReadyForReview, isStatusRejected, useAdminUserRole, useFileUpload } from '../../helpers';

import { EditPageProps, StatusProps, SymbolsProps, FilterStatusProps } from '../../types';

import Cat from '../../svg/cat.svg';

import {
	PanelPresentationContentStyled,
	PanelPresentationStyled,
	PanelContainerStyled,
	ListActionStyled,
	LogoWrapperStyled,
	PanelActionsStyled,
	PanelFormActionsStyled,
} from './styles';
import { ContainerStyled } from '../../styles/styles';

import {
	updateStatusMangeSymbolAction,
	getManageSymbolsQueryAction,
	updateManageSymbolAction,
	deleteMangeSymbolAction,
	ManageSymbolsStore,
	SymbolUploadStore,
	updateSymbolAction,
} from '../../store';

import { EditorCommandMessage, SymbolConnector, SymbolEditor, SymbolEditorEvent } from '../../components/symbolEditor';

// const icons = allSymbols.map(({ key, geometry, ...rest }) => ({
// 	key,
// 	paths: geometry,
// 	...rest,
// }));

// 'Draft', 'Review', 'Review', 'Issued', 'Rejected'

export type DefaultStatusesTypes = {
	all: boolean;
	ready: boolean;
	draft: boolean;
	reject: boolean;
};

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [confirmationButtons, setConfirmationButtons] = useState<{ confirm: string; cancel: string } | null>(null);

	const [informationMessage, setInformationMessage] = useState<InformationComponentTypes>();

	const [selectedSymbol, setSelectedSymbol] = useState<SymbolsProps | null>(null);
	const [deleteSymbol, setDeleteSymbol] = useState<SymbolsProps | null>(null);
	const [updateSymbol, setUpdateSymbol] = useState<SymbolsProps | null>(null);

	const [statusSymbolId, setStatusSymbolId] = useState<string | null>(null);
	const [symbolStatus, setSymbolStatus] = useState<StatusProps | null>(null);

	const [selectedConnector, setSelectedConnector] = useState<SymbolConnector | null>(null);

	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);

	// const [uploadSvgFile, setSvgFile] = useState<SymbolsProps | null>(null);
	const [updateSymbolRevision, setUpdateSymbolRevision] = useState<SymbolsProps | null>(null);

	const [editorCommands, setEditorCommands] = useState<EditorCommandMessage[]>([]);
	const [searchingValue, setSearchingValue] = useState<string>('');

	const [panelShow, setPanelShow] = useState<boolean>(false);
	const [listShow, setListShow] = useState<boolean>(true);

	const connectorsToScroll = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const DEFAULT_STATUSES: DefaultStatusesTypes = {
		all: true,
		ready: false,
		draft: false,
		reject: false,
	};

	const [statuses, setStatuses] = useState(DEFAULT_STATUSES);

	// Workaround for popup to show same message more that 1 time
	const [update, forceUpdate] = useReducer((x) => x + 1, 0);

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

	// const [finishUploadSymbolsQuery] = uploadSvgFileAction.useBeckon({
	// 	svgFile: uploadSvgFile,
	// 	validationOnly: false,
	// 	contentType: 'application/json',
	// });

	const [finishUpdateSymbolQuery] = updateSymbolAction.useBeckon({
		svgFile: updateSymbolRevision,
		validationOnly: false,
		contentType: 'application/json',
	});

	const { validateSvgQuery, validateSvgErrorMessage, isSymbolUploadReposnseSucceeded } = SymbolUploadStore.useState();

	const isAdmin = useAdminUserRole();

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
					connectors,
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
		if (!finishUpdateManageSymbol && !updateSymbol) return;

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
		if (isSymbolUploadReposnseSucceeded && selectedSymbol) {
			setInformationMessage({
				title: 'New symbol',
				message: `Symbol ${selectedSymbol?.key} was added`,
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
	}, [finishUpdateSymbolQuery, isSymbolUploadReposnseSucceeded]);

	const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		handleFileChange(e);
		onPanelReset();
	};

	const onEditSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onEditSymbol:', symbol);

		setSelectedSymbol(symbol);
		// Load symbol into editor
		loadEditorCommand(symbol);
		setEnableReinitialize(true);

		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);
		};
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
		setEnableReinitialize(true);

		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);
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
			setUpdateSymbolRevision({ ...symbol, isRevisionOf: symbol.iri });
		}

		console.log('⚡️', 'manageSymbolsQuery:', manageSymbolsQuery);
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
		setSymbolStatus('Review');
	};

	useEffect(() => {
		if (!finishUpdateStatusSymbol || statusSymbolId === null) return;

		refreshMangeSymbolsQuery();

		if (symbolStatus === 'Review') {
			setInformationMessage({
				title: 'Thank you',
				message: `Your symbol ${selectedSymbol?.key} has been submited for review`,
				appearance: 'success',
			});
		}
		if (symbolStatus === 'Issued') {
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
		setSymbolStatus(isApproved ? 'Issued' : 'Rejected');
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
		if (!isDeleteSymbolReposnseSucceeded || !deleteSymbol) return;

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
		if (!isUpdateSymbolReposnseSucceeded || !updateSymbol) return;

		refreshMangeSymbolsQuery();
		// onPanelReset();

		setInformationMessage({
			title: 'Updated',
			message: `Symbol ${updateSymbol?.key} was updated`,
			appearance: 'success',
		});
	}, [manageUpdateSymbolsQuery]);

	// const getSymbolVersion = ({ key, id }: SymbolsProps) => {
	// 	if (manageSymbolsQuery.length <= 0) return 1;

	// 	const filteredManageSymbols = manageSymbolsQuery.filter((sbl: SymbolsProps) => sbl.key === key && isStatusPublished(sbl));

	// 	filteredManageSymbols.sort(
	// 		// @ts-ignore next-line
	// 		(a: SymbolsProps, b: SymbolsProps) => new Date(a.dateTimePublished).getTime() - new Date(b.dateTimePublished).getTime()
	// 	);

	// 	// Find the index of the object with the given id in the sorted array
	// 	const index = filteredManageSymbols.findIndex((sbl: { id: string }) => sbl.id === id);

	// 	// If the object with the given id is found, return its position + 1 as the version
	// 	// If not found, return 1 (default version)
	// 	return index !== -1 ? index + 1 : 1;
	// };

	const scrollToElement = (id: string) => {
		// const elementRef = connectorsToScroll.current[id];
		// if (!elementRef) return;
		// elementRef.scrollIntoView({
		// 	behavior: 'smooth',
		// 	block: 'start',
		// 	inline: 'nearest',
		// });
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
							setEnableReinitialize(true);

							const timer = setTimeout(() => setEnableReinitialize(false), 1000);

							return () => {
								clearTimeout(timer);
							};
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

							if (changedConnectors.length <= 0) {
								setSelectedConnector(null);
							} else {
								setSelectedConnector(changedConnectors[0].data as SymbolConnector);
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
		setEnableReinitialize(true);

		setEditorCommands([{ type: 'Connector', action: 'New', data: undefined }]);
		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);
		};
	};

	const removeConnector = () => {
		if (!selectedSymbol || !selectedConnector) return;

		setEnableReinitialize(true);
		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		const updatedConnectors = selectedSymbol.connectors.filter((connector: SymbolConnector) => connector.id !== selectedConnector.id);

		onChangeSymbolForDetail({ ...selectedSymbol, connectors: updatedConnectors });
		setSelectedConnector(null);

		return () => {
			clearTimeout(timer);
		};
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

	const filterSymbolsByStatus = () => {
		if (statuses.all) {
			seIcns(manageSymbolsQuery);
		} else if (!statuses.draft && !statuses.ready && !statuses.reject) {
			seIcns(manageSymbolsQuery);
			setStatuses(DEFAULT_STATUSES);
		} else {
			const filteredValue = manageSymbolsQuery.filter((symbol: any) => {
				const dr = statuses.draft && isStatusDraft(symbol);
				const rd = statuses.ready && isStatusReadyForReview(symbol);
				const rj = statuses.reject && isStatusRejected(symbol);

				return dr || rd || rj;
			});

			seIcns(filteredValue);
		}
	};

	const handleStatusChange = (status: FilterStatusProps) => {
		if (status.includes('all')) {
			setStatuses(DEFAULT_STATUSES);
		} else {
			setStatuses({
				...statuses,
				all: false,
				[status]: !statuses[status],
			});
		}
	};

	useEffect(() => {
		filterSymbolsByStatus();
	}, [statuses]);

	return (
		<AuthenticatedTemplate>
			<Head>
				<title>🍯 Customize Engineering Symbols</title>
				<meta name="description" content="Tailor engineering symbols to your needs." />
				<link rel="icon" href="/favicon.ico" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<PanelDetailsInformationComponent content={`<i>To move the symbol, <b>"press & hold"</b> the space key <br/>while navigating</i>`} />
			<PanelContainerStyled>
				<PanelPresentationStyled>
					<ContainerStyled>
						{isSvgFileLoading && <WeatherLoader />}

						<PanelPresentationContentStyled>
							{!!selectedSymbol ? (
								<SymbolEditor editorEventHandler={onEditorEvent} commands={editorCommands} />
							) : (
								<LogoWrapperStyled>
									<Cat />
									{/* <LogoComponent fill="backgroundGrey" /> */}
									<p>Engineering symbols</p>
								</LogoWrapperStyled>
							)}
						</PanelPresentationContentStyled>

						{finishManageSymbolsQuery && selectedSymbol && (
							<>
								<PanelActionsStyled isShow={panelShow}>
									<ZoomButtonsComponent onZoomClick={onZoom} />
									<IconButtonComponent name="wrench" onClick={() => setPanelShow(!panelShow)} />
									<IconButtonComponent name="lensPlus" onClick={addNewConnector} disabled={isReadyForReview(selectedSymbol)} />
									<IconButtonComponent
										name="lensMinus"
										onClick={removeConnector}
										disabled={isReadyForReview(selectedSymbol) || !selectedConnector}
									/>

									{!isReadyForReview(selectedSymbol) && (
										<PanelFormActionsStyled>
											<IconButtonComponent
												name="floppyDisk"
												onClick={() => onUpdateDraftSymbol(selectedSymbol)}
												appearance="backgroundGreen"
											/>
											<IconButtonComponent name="xmark" onClick={onPanelReset} appearance="backgroundRed" />
										</PanelFormActionsStyled>
									)}
								</PanelActionsStyled>

								<PanelDetailsComponent
									show={panelShow}
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
						<ListActionStyled isShow={listShow}>
							<IconButtonComponent name="face3d" onClick={() => setListShow(!listShow)} />
						</ListActionStyled>
						<ListComponent
							fileRef={fileInputRef}
							onChangeFile={onChangeFileInput}
							finishManageSymbols={finishManageSymbolsQuery}
							icons={icns}
							theme={theme}
							onUpdate={onUpdateSymbol}
							onShow={onShowSymbol}
							onEdit={onEditSymbol}
							onReview={onReview}
							onSubmit={onSubmitOnReview}
							onDelete={onDeleteConfirmation}
							show={listShow}
							searchValue={debounceSearchValue}
							statuses={statuses}
							handleCheckboxChange={handleStatusChange}
						/>
					</ContainerStyled>
				</PanelPresentationStyled>

				<InformationComponent {...informationMessage} />
				{/* @ts-ignore next-line */}
				<ConfirmationComponent />
			</PanelContainerStyled>
		</AuthenticatedTemplate>
	);
};

export default Edit;
