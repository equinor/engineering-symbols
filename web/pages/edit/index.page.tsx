import { useRef, useState, ChangeEvent, useEffect, useReducer } from 'react';
import { AuthenticatedTemplate } from '@azure/msal-react';
import type { NextPage } from 'next';
import { Search } from '@equinor/eds-core-react';
import Head from 'next/head';

import {
	PanelDetailsInformationComponent,
	InformationComponentTypes,
	PanelDetailsComponent,
	InformationComponent,
	ZoomButtonsComponent,
	SymbolElement,
	WeatherLoader,
	useConfirm,
	ConnectorModulComponent,
} from '../../components';

import { isObjEmpty, useAdminUserRole, useFileUpload } from '../../helpers';

import { EditPageProps, StatusProps, SymbolsProps } from '../../types';

import {
	PanelSymbolsSearchWrapperStyled,
	PanelPresentationContentStyled,
	PanelPresentationStyled,
	PanelSymbolsListStyled,
	PanelContainerStyled,
	PanelSymbolsStyled,
	UploadSvgStyled,
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
import { EditorCommandMessage, SymbolConnector, SymbolEditor, SymbolEditorEvent } from '../../components/symbolEditor';
import { useDebouncedCallback } from 'use-debounce';
import { Vec2 } from '../../components/symbolEditor/models/Vec2';

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
	const [selectedSymbolInEdit, setSelectedSymbolInEdit] = useState<SymbolsProps | null>(null);
	const [test, setTest] = useState<SymbolsProps | null>(null);
	const [deleteSymbol, setDeleteSymbol] = useState<SymbolsProps | null>(null);
	const [updateSymbol, setUpdateSymbol] = useState<SymbolsProps | null>(null);

	const [selectedConnectorInEdit, setSelectedConnectorInEdit] = useState<SymbolConnector | null>(null);

	const [statusSymbolId, setStatusSymbolId] = useState<string | null>(null);
	const [symbolStatus, setSymbolStatus] = useState<StatusProps | null>(null);

	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);

	const [uploadSvgFile, setSvgFile] = useState<SymbolsProps | null>(null);

	const [editorCommands, setEditorCommands] = useState<EditorCommandMessage[]>([]);
	const [searchingValue, setSearchingValue] = useState<string>('');

	const [modalPosition, setModalPosition] = useState<Vec2 | {}>({});
	const [zoomLevel, setZoomLevel] = useState<number>(10);
	const [positionOfFrame, setPositionOfFrame] = useState<Vec2 | {}>({});
	const [selectedConnectorData, setSelectedConnectorData] = useState({});
	const [modalPositionX, setModalPositionX] = useState('');

	const connectorsToScroll = useRef<{ [key: string]: HTMLDivElement | null }>({});

	// Workaround for popup to show same message more that 1 time
	const [update, forceUpdate] = useReducer((x) => x + 1, 0);

	const svgElementsRef = useRef([]);
	const fileInputRef = useRef<HTMLInputElement>();
	const popoverRef = useRef<HTMLButtonElement>(null);

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
		setSelectedSymbolInEdit(svgContent);
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

	const onCloseConnectorPanel = () => {
		setSelectedConnectorData({});
	};

	const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		handleFileChange(e);
		onPanelReset();
	};

	const onEditSymbol = (symbol: SymbolsProps) => {
		console.log('⚡️', 'onEditSymbol:', symbol);

		setSelectedSymbol(symbol);
		setSelectedSymbolInEdit(symbol);
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

	const replaceConnectorById = (connector: SymbolConnector): SymbolsProps => {
		if (!selectedSymbolInEdit) return;

		const updatedConnectors = selectedSymbolInEdit.connectors.map((cntr) => {
			if (cntr.id === connector.id) {
				return { ...connector };
			}
			return cntr;
		});

		return {
			...selectedSymbolInEdit,
			connectors: updatedConnectors,
		};
	};

	const onResetConnector = () => {
		if (!selectedSymbol) return;

		setEditorCommands([
			{
				type: 'Symbol',
				action: 'Update',
				data: {
					id: selectedSymbol.id,
					key: selectedSymbol.key,
					path: selectedSymbol.geometry,
					width: selectedSymbol.width,
					height: selectedSymbol.height,
					connectors: selectedSymbol.connectors,
					centerOfRotation: { x: selectedSymbol.width / 2, y: selectedSymbol.height / 2 },
				},
			},
		]);
	};

	const onDeleteConnector = ({ id }: SymbolConnector) => {
		const updatedConnectors = selectedSymbolInEdit.connectors.filter((connector: SymbolConnector) => connector.id !== id);
		const updatedSymbol = { ...selectedSymbolInEdit, connectors: updatedConnectors };

		setSelectedSymbolInEdit(updatedSymbol);
		setTest(updatedSymbol);
		setEditorCommands([
			{
				type: 'Symbol',
				action: 'Update',
				data: {
					id: updatedSymbol.id,
					key: updatedSymbol.key,
					path: updatedSymbol.geometry,
					width: updatedSymbol.width,
					height: updatedSymbol.height,
					connectors: updatedSymbol.connectors,
					centerOfRotation: { x: updatedSymbol.width / 2, y: updatedSymbol.height / 2 },
				},
			},
		]);

		onCloseConnectorPanel();
	};

	// const onChangeSymbolForDetail = (symbol: SymbolsProps) => {
	const onChangeSymbolForDetail = (connector: SymbolConnector) => {
		// updateSingelConnector
		const symbol = replaceConnectorById(connector);

		const current = selectedSymbol?.connectors.find(({ id }) => id === connector.id);
		// WHY?
		// There is delay in respons when usuing position from onEditorEvent

		// const VecX = connector.relativePosition.x
		// console.log('relativePosition.x =>', connector.relativePosition.x)
		// console.log('modalPosition.x =>', modalPosition.x)
		console.log('current =>', current);

		const crX = (current.relativePosition.x - connector.relativePosition.x) * zoomLevel;
		const crY = (current.relativePosition.y - connector.relativePosition.y) * zoomLevel;

		const position = {
			x: modalPosition.x - current.relativePosition.x * zoomLevel + connector.relativePosition.x * zoomLevel,
			y: modalPosition.y - current.relativePosition.y * zoomLevel + connector.relativePosition.y * zoomLevel,
		};

		console.log('?:', modalPosition.x - current.relativePosition.x * zoomLevel + connector.relativePosition.x * zoomLevel);
		console.log('??:', modalPosition.x - current.relativePosition.x * zoomLevel);
		console.log('???:', connector.relativePosition.x * zoomLevel);
		setModalPosition(position);

		// setSelectedSymbol(symbol);
		setSelectedSymbolInEdit(symbol);
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
		// setSelectedSymbol(symbol);
		// setEditorCommands([
		// 	{
		// 		type: 'Symbol',
		// 		action: 'Update',
		// 		data: {
		// 			id: symbol.id,
		// 			key: symbol.key,
		// 			path: symbol.geometry,
		// 			width: symbol.width,
		// 			height: symbol.height,
		// 			connectors: symbol.connectors,
		// 			centerOfRotation: { x: symbol.width / 2, y: symbol.height / 2 },
		// 		},
		// 	},
		// ]);
		console.log('⚡️', 'onChangeSymbolForDetail:', symbol);
	};

	// const onUpdateDraftSymbol = (symbol: SymbolsProps) => {
	const onSaveConnectorPanel = () => {
		if (isStatusDraft(selectedSymbol)) {
			setUpdateSymbol(selectedSymbol);
		} else {
			// ADD validation
			setSvgFile(selectedSymbol);
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

		// console.log(84, popoverRef.current)
		// elementRef.scroll({
		//   top: 0,
		//   behavior: "smooth"
		// });
		// scrollTo(elementRef, 100, 600)

		// elementRef.scrollBy();
	};

	// console.log(61, test)

	const onSelectionChanged = (data: any, connector: any, symbolState: SymbolsProps) => {
		// setModalPositionX(data.position.x);
		setModalPosition(data.position);

		console.log('===>>', data);
		setSelectedSymbol(symbolState);
		setSelectedConnectorData(connector[0].data);
	};

	// console.log('CursorPosition ===>>>', modalPosition)

	const onEditorEvent = ({ symbolState, data, reason, type }: SymbolEditorEvent) => {
		// console.log(`EDITOR-EVENT:${type}:${reason}`);
		// console.log('Event data: ', data);
		// console.log('Symbol state: ', symbolState);

		switch (type) {
			case 'Symbol':
				switch (reason) {
					case 'Loaded':
						// setConnectors(event.symbolState?.connectors ?? []);
						// const position = {
						// 	x: (modalPosition.x - symbol.relativePosition.x * scaleLevel) + connector.relativePosition.x * scaleLevel,
						// 	y: (modalPosition.y - current.relativePosition.y * scaleLevel) + connector.relativePosition.y * scaleLevel
						// }

						// setPositionOfFrame(position)
						break;
					case 'Updated':
						// setConnectors(event.symbolState?.connectors ?? []);
						console.log('>>>>', data);
						// Export data with one step back
						// setModalPosition(data.position);
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
							// setSelectedSymbol({ ...selectedSymbol, connectors: symbolState?.connectors } as SymbolsProps);
							console.log('⚡️', 'onEditorEvent, Connector reason:', reason);
							setSelectedSymbolInEdit({ ...selectedSymbol, connectors: symbolState?.connectors } as SymbolsProps);
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
							const changedConnectors = data.selected.filter(({ type }) => type === 'Connector');
							console.log(20, changedConnectors);
							if (changedConnectors.length > 0) {
								// setSelectedConnector(null);
								// console.log(30, data)
								// console.log(40, selectedSymbolInEdit)
								onSelectionChanged(data, changedConnectors, symbolState);
								// setModalPosition(data.position);

								// if(selectedSymbolInEdit) setSelectedSymbol(selectedSymbolInEdit);
								// setSelectedConnectorData(changedConnectors[0].data);

								// WTF?!
								// setModalPositionX(data.position.x);
							} else {
								onCloseConnectorPanel();
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
			case 'Hover':
				switch (reason) {
					case 'Changed':
						{
							// console.log(21, 'Selection => Changed', data)
							const changedConnectors = data.selected.filter(({ type }) => type === 'Connector');
							// console.log(30, 1, data)
							if (changedConnectors.length === 0) {
								// setSelectedConnector(null);
								// setModalPosition(data.position);
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

	const onZoom = (data: number) => {
		console.log();
		setEditorCommands([{ type: 'Settings', action: 'ZoomInOrOut', data }]);
	};

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

						{!isObjEmpty(selectedConnectorData) && (
							<ConnectorModulComponent
								{...modalPosition}
								data={selectedConnectorData}
								disabledForm={isReadyForReview(selectedSymbol) || false}
								updateConnector={onChangeSymbolForDetail}
								// updateConnector={onUpdateDraftSymbol}
								onResetPanel={onResetConnector}
								onDelete={onDeleteConnector}
							/>
						)}

						<PanelPresentationContentStyled>
							{!!selectedSymbol && <SymbolEditor editorEventHandler={onEditorEvent} commands={editorCommands} />}
						</PanelPresentationContentStyled>

						{finishManageSymbolsQuery && selectedSymbol && (
							<>
								<PanelDetailsInformationComponent
									content={`<i>To move the symbol, <b>"press & hold"</b> the space key <br/>while navigating</i>`}
								/>
								<ZoomButtonsComponent onZoomClick={onZoom} />
								{/* <div ref={popoverRef}>
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
								</div> */}
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
