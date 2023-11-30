import React, { useRef, useState, useEffect, useReducer, useCallback } from 'react';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { useDebouncedCallback } from 'use-debounce';
import { useDropzone } from 'react-dropzone';
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

import { isStatusDraft, isStatusIssued, isStatusReview, isStatusRejected, useAdminUserRole, useFileUpload } from '../../helpers';

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
	LogoTopTextStyled,
	OnDropStyled,
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
import { quickRotationOptions } from '../../components/editForm/EditForm';
import { ConfirmationModuleProps, useConfirmProps } from '../../components/confirmation/Confirmation';

// const icons = allSymbols.map(({ key, geometry, ...rest }) => ({
// 	key,
// 	paths: geometry,
// 	...rest,
// }));

// 'Draft', 'Review', 'Review', 'Issued', 'Rejected'

export type DefaultStatusesTypes = {
	all: boolean;
	review: boolean;
	draft: boolean;
	reject: boolean;
	issued: boolean;
};

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [confirmationModuleDetails, setConfirmationModuleDetails] = useState<ConfirmationModuleProps | {}>({});

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

	const [isPanelShow, setPanelShow] = useState<boolean>(true);
	const [listShow, setListShow] = useState<boolean>(true);
	const [isSymbolEdit, setIsSymbolEdit] = useState<boolean>(false);

	const connectorsToScroll = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const DEFAULT_STATUSES: DefaultStatusesTypes = {
		all: true,
		review: false,
		draft: false,
		reject: false,
		issued: false,
	};

	const [statuses, setStatuses] = useState(DEFAULT_STATUSES);

	// Workaround for popup to show same message more that 1 time
	const [update, forceUpdate] = useReducer((x) => x + 1, 0);

	const fileInputRef = useRef<HTMLInputElement>();

	const [getConfirmation, ConfirmationComponent] = useConfirm({
		...confirmationModuleDetails,
		symbol: selectedSymbol,
	} as useConfirmProps);

	const panelReset = () => {
		setSelectedSymbol(null);
		setUpdateSymbol(null);
		setIsSymbolEdit(false);
	};

	const onPanelReset = async () => {
		if (isSymbolEdit) {
			setConfirmationModuleDetails({
				message: 'Are you certain you wish to proceed without saving your changes to the symbols',
				buttons: { confirm: 'Save', cancel: 'Close' },
			});
			// @ts-ignore next-line
			const isApproved = await getConfirmation();

			if (isApproved && selectedSymbol) {
				// TODO: save svg
				onUpdateDraftSymbol(selectedSymbol);
				setTimeout(() => panelReset(), 1);
				setTimeout(() => refreshMangeSymbolsQuery(), 500);
			} else {
				panelReset();
			}
		} else {
			panelReset();
		}
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
	const [symbolsBySearch, setSymbolsBySearch] = useState<SymbolsProps[] | []>([]);

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
		symbol: updateSymbolRevision,
		validationOnly: false,
		contentType: 'application/json',
	});

	const { validateSvgQuery, validateSvgErrorMessage, isSymbolUploadReposnseSucceeded } = SymbolUploadStore.useState();

	const isAdmin = useAdminUserRole();

	const isReadyForReview = (symbol: SymbolsProps) => isAdmin && isStatusReview(symbol);

	// const refreshMangeSymbolsQuery = () => setTimeout(() => getManageSymbolsQueryAction.run(), 1000);
	const refreshMangeSymbolsQuery = () => setTimeout(() => getManageSymbolsQueryAction.run(), 500);

	const loadEditorCommand = ({ id, key, geometry, width, height, connectors, ...rest }: SymbolsProps, readOnly = false) => {
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
					...rest,
					id: id || key,
					key: key || id,
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

	// useEffect(() => {
	// 	if (!finishUpdateManageSymbol && !updateSymbol) return;
	// 	forceUpdate();
	// 	setInformationMessage({
	// 		title: 'Updated',
	// 		message: `Symbol ${selectedSymbol?.key} was updated`,
	// 		appearance: 'success',
	// 		refresh: update,
	// 	});
	// }, [updateSymbol]);

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
				message: `Symbol ${selectedSymbol?.key || ''} was added`,
				appearance: 'success',
			});

			// Commentout for load editor view when you close it by confirmation window
			// panelReset();
			refreshMangeSymbolsQuery();
		}

		if (isUpdateSymbolReposnseSucceeded) {
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

	const onDrop = useCallback((acceptedFiles: (File | null)[]) => {
		onChangeFileInput(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const onChangeFileInput = async (file: File | null) => {
		// setIsSymbolEdit(true);
		if (isSymbolEdit) {
			setConfirmationModuleDetails({
				message: 'Are you certain you wish to proceed without saving your changes to the symbols',
				buttons: { confirm: 'Save', cancel: 'Close' },
			});
			// @ts-ignore next-line
			const isApproved = await getConfirmation();

			if (isApproved && selectedSymbol) {
				onUpdateDraftSymbol(selectedSymbol);
				setIsSymbolEdit(false);
				handleFileChange(file);
			} else {
				handleFileChange(file);
				panelReset();
				setIsSymbolEdit(false);
			}
		} else {
			handleFileChange(file);
			panelReset();
		}
	};

	useEffect(() => {
		if (isSvgFileLoading) setIsSymbolEdit(true);
	}, [isSvgFileLoading]);

	const onEditSymbol = async (symbol: SymbolsProps) => {
		console.log('⚡️', 'onEditSymbol:', symbol);
		console.log('⚡️', 'isSymbolEdit:', isSymbolEdit);
		if (isSymbolEdit) {
			setConfirmationModuleDetails({
				message: 'Are you certain you wish to proceed without saving your changes to the symbols',
				buttons: { confirm: 'Save', cancel: 'Close' },
			});
			// @ts-ignore next-line
			const isApproved = await getConfirmation();

			if (isApproved && selectedSymbol) {
				// TODO: save svg
				onUpdateDraftSymbol(selectedSymbol);
				setIsSymbolEdit(false);
				editSymbol(symbol);
			} else {
				setIsSymbolEdit(false);
				editSymbol(symbol);
			}
		} else {
			editSymbol(symbol);
		}
	};

	const editSymbol = (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		// Load symbol into editor
		loadEditorCommand(symbol);
		setEnableReinitialize(true);
		setSelectedConnector(null);

		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);
		};
	};

	const onShowSymbol = async (symbol: SymbolsProps) => {
		console.log('⚡️', 'onShowSymbol:', symbol);

		if (isSymbolEdit) {
			setConfirmationModuleDetails({
				message: 'Are you certain you wish to proceed without saving your changes to the symbols',
				buttons: { confirm: 'Save', cancel: 'Close' },
			});
			// @ts-ignore next-line
			const isApproved = await getConfirmation();

			if (isApproved && selectedSymbol) {
				// TODO: save svg
				onUpdateDraftSymbol(selectedSymbol);
				setIsSymbolEdit(false);
			} else {
				setIsSymbolEdit(false);
				showSymbol(symbol);
			}
		} else {
			showSymbol(symbol);
		}
	};

	const showSymbol = (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		loadEditorCommand(symbol, true);

		return () => {
			if (!fileInputRef.current) return;
			fileInputRef.current.value = '';
		};
	};

	const onUpdateSymbol = async (symbol: SymbolsProps) => {
		console.log('⚡️', 'onUpdateSymbol:', symbol);

		if (isSymbolEdit) {
			setConfirmationModuleDetails({
				message: 'Are you certain you wish to proceed without saving your changes to the symbols',
				buttons: { confirm: 'Save', cancel: 'Close' },
			});
			// @ts-ignore next-line
			const isApproved = await getConfirmation();

			if (isApproved && selectedSymbol) {
				// TODO: save svg
				onUpdateDraftSymbol(selectedSymbol);
				setIsSymbolEdit(false);
				updtSymbol(symbol);
			} else {
				setIsSymbolEdit(false);
				updtSymbol(symbol);
			}
		} else {
			updtSymbol(symbol);
		}
	};

	const updtSymbol = (symbol: SymbolsProps) => {
		loadEditorCommand(symbol);
		setSelectedSymbol(symbol);
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
		setIsSymbolEdit(true);
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
			setUpdateSymbolRevision({ ...symbol, isRevisionOf: symbol.iri, key: symbol.key || symbol.id });
			// setUpdateSymbolRevision({ ...symbol, isRevisionOf: symbol.iri, dateTimeModified: });
		}
		setIsSymbolEdit(false);

		console.log('⚡️', 'manageSymbolsQuery:', manageSymbolsQuery);
		console.log('⚡️', 'symbol:', symbol, 'isStatusDraft:', isStatusDraft(symbol));
	};

	const onSubmitOnReview = async (symbol: SymbolsProps) => {
		// Clear all Drafts after push
		setConfirmationModuleDetails({
			title: 'Review',
			message: 'Would you like to reject or approve',
			buttons: { confirm: 'Approve', cancel: 'Reject' },
		});
		// @ts-ignore next-line
		const isApproved = await getConfirmation();

		console.log('⚡️', 'onSubmitOnReview', isApproved);

		// setSelectedSymbol(symbol);

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
				message: `Your symbol ${selectedSymbol?.key || ''} has been submited for review`,
				appearance: 'success',
			});
		}
		if (symbolStatus === 'Issued') {
			setInformationMessage({
				title: 'Thank you',
				message: `Your symbol ${selectedSymbol?.key || ''} has been approved`,
				appearance: 'success',
			});
		}
		if (symbolStatus === 'Rejected') {
			setInformationMessage({
				title: 'Thank you',
				message: `Your symbol ${selectedSymbol?.key || ''} has been rejected`,
				appearance: 'error',
			});
		}
	}, [finishUpdateStatusSymbol]);

	const onDeleteConfirmation = async (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		loadEditorCommand(symbol);

		setConfirmationModuleDetails({
			title: 'Delete',
			message: 'Are you sure that you want to delete',
			buttons: { confirm: 'Delete', cancel: 'Cancel' },
		});

		// @ts-ignore next-line
		const isApproved = await getConfirmation();

		if (isApproved) onDelete(symbol);
	};

	const onDelete = (symbol: SymbolsProps) => setDeleteSymbol(symbol);

	const onReview = async (symbol: SymbolsProps) => {
		setConfirmationModuleDetails({
			title: 'Review',
			message: 'Are you sure you want to review',
			buttons: { confirm: 'Approve', cancel: 'Rejected' },
		});
		// @ts-ignore next-line
		const isApproved = (await getConfirmation()) as boolean;

		console.log('⚡️', 'onSubmitOnReview', isApproved);

		onSubmitAdminReview(symbol, isApproved);
	};

	const onSubmitAdminReview = ({ id }: SymbolsProps, isApproved: boolean | null) => {
		if (isApproved === null) return;

		setConfirmationModuleDetails({});
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
			message: `Symbol ${deleteSymbol?.key || ''} was deleted`,
			appearance: 'success',
		});

		console.log('⚡️', 'Something went wrong:', manageDeleteSymbolsQuery);
	}, [finishDeleteManageSymbol, manageDeleteSymbolsQuery]);

	useEffect(() => {
		if (!isUpdateSymbolReposnseSucceeded && !updateSymbol) return;
		forceUpdate();
		refreshMangeSymbolsQuery();
		// onPanelReset();

		setInformationMessage({
			title: 'Updated',
			message: `Symbol ${updateSymbol?.key || ''} was updated`,
			appearance: 'success',
			refresh: update,
		});
	}, [manageUpdateSymbolsQuery]);

	// const getSymbolVersion = ({ key, id }: SymbolsProps) => {
	// 	if (manageSymbolsQuery.length <= 0) return 1;

	// 	const filteredManageSymbols = manageSymbolsQuery.filter((sbl: SymbolsProps) => sbl.key === key && isStatusIssued(sbl));

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
					case 'Updated':
						setIsSymbolEdit(true);
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
							setEnableReinitialize(true);
							setIsSymbolEdit(true);
							setSelectedSymbol({ ...symbolState, connectors: symbolState?.connectors } as SymbolsProps);

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
		// if (data && data.length > 0) {
		// 	// @ts-ignore next-line
		// 	const { id } = data[0].data;

		// 	console.log('====>>>', !isPanelShow)

		// 	scrollToElement(id);
		// }
	};

	// console.log(1, '====>>>', !isPanelShow)

	const addNewConnector = () => {
		setEnableReinitialize(true);

		setEditorCommands([{ type: 'Connector', action: 'New', data: undefined }]);
		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		return () => {
			clearTimeout(timer);
		};
	};

	const onRemoveConnector = () => {
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

	const getNextQuickRotationOption = (targetNumber: number): number => {
		const index = quickRotationOptions.findIndex((val) => val > targetNumber);

		if (index !== -1) {
			return quickRotationOptions[index];
		}

		return quickRotationOptions[0];
	};

	const onRotateConnector = () => {
		if (!selectedSymbol || !selectedConnector) return;

		setEnableReinitialize(true);
		const timer = setTimeout(() => setEnableReinitialize(false), 1000);

		const updatedConnectors = selectedSymbol.connectors.map((connector: SymbolConnector) =>
			connector.id === selectedConnector.id ? { ...connector, direction: getNextQuickRotationOption(connector.direction) } : connector
		);

		onChangeSymbolForDetail({ ...selectedSymbol, connectors: updatedConnectors });

		return () => {
			clearTimeout(timer);
		};
	};

	const onSearch = (val: string) => {
		if (val) {
			const searchedValue = manageSymbolsQuery.filter(({ key }: any) => key.toLocaleLowerCase().includes(val.toLocaleLowerCase()));

			setSymbolsBySearch(searchedValue);
		} else {
			setSymbolsBySearch(manageSymbolsQuery);
		}

		// getSymbolsQueryWithStatusFilter();
	};

	const onZoom = (data: number) => setEditorCommands([{ type: 'Settings', action: 'ZoomInOrOut', data }]);

	const sortSymbolsQuery = () => {
		const sortedData = [...getSymbolsQueryWithStatusFilter()].sort((a: SymbolsProps, b: SymbolsProps) => {
			// First, sort by status
			const statusPriority: { [key in StatusProps]: number } = {
				Draft: 1,
				Review: 2,
				Rejected: 3,
				Issued: 4,
			};

			if (statusPriority[a.status] < statusPriority[b.status]) return -1;
			if (statusPriority[a.status] > statusPriority[b.status]) return 1;

			// If statuses are the same, sort by name
			if (a.key < b.key) return -1;
			if (a.key > b.key) return 1;

			// If names are the same, sort by version
			if (a.version < b.version) return -1;
			if (a.version > b.version) return 1;

			return 0;
		});

		seIcns(sortedData);
	};

	useEffect(() => {
		sortSymbolsQuery();
	}, [finishManageSymbolsQuery]);

	const debounceSearchValue = useDebouncedCallback((value) => {
		setSearchingValue(value);
		onSearch(value);
	}, 500);

	const getSymbolsQueryWithStatusFilter = () => {
		if (statuses.all && !searchingValue) return manageSymbolsQuery;
		if (statuses.all && !!searchingValue) return symbolsBySearch;

		const val = !!searchingValue ? symbolsBySearch : manageSymbolsQuery;

		return val.filter((symbol: SymbolsProps) => {
			const dr = statuses.draft && isStatusDraft(symbol);
			const rd = statuses.review && isStatusReview(symbol);
			const rj = statuses.reject && isStatusRejected(symbol);
			const pb = statuses.issued && isStatusIssued(symbol);

			return dr || rd || rj || pb;
		});
	};

	useEffect(() => {
		sortSymbolsQuery();
	}, [statuses, searchingValue]);

	const handleStatusChange = (status: FilterStatusProps) => {
		let st = DEFAULT_STATUSES;
		if (!status.includes('all')) {
			st = {
				...statuses,
				all: false,
				[status]: !statuses[status],
			};
		}

		if (!Object.values(st).some((status) => status)) {
			st = DEFAULT_STATUSES;
		}

		setStatuses(st);
		// filterSymbolsByStatus(st);
	};

	useEffect(() => {
		if (selectedConnector && isPanelShow) {
			scrollToElement(selectedConnector.id);
		}
	}, [selectedConnector]);

	const scrollToElement = (id: string) => {
		const elementRef = connectorsToScroll.current[id];
		if (!elementRef) return;
		elementRef.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest',
		});
	};

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
							<OnDropStyled {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive ? (
									<LogoWrapperStyled>
										<i>Drop the files here ...</i>
									</LogoWrapperStyled>
								) : !!selectedSymbol ? (
									<SymbolEditor editorEventHandler={onEditorEvent} commands={editorCommands} />
								) : (
									<LogoWrapperStyled>
										<LogoTopTextStyled>
											<Cat />
											{/* <LogoComponent fill="backgroundGrey" /> */}
											<p>Engineering symbols</p>
										</LogoTopTextStyled>
										<i>Drag & drop SVG symbol here, or click to select file</i>
									</LogoWrapperStyled>
								)}
							</OnDropStyled>
						</PanelPresentationContentStyled>

						{finishManageSymbolsQuery && selectedSymbol && (
							<>
								<PanelActionsStyled isShow={isPanelShow}>
									<ZoomButtonsComponent onZoomClick={onZoom} />
									<IconButtonComponent name={isPanelShow ? 'sideLeft' : 'sideRight'} onClick={() => setPanelShow(!isPanelShow)} />
									<IconButtonComponent name="lensPlus" onClick={addNewConnector} disabled={isReadyForReview(selectedSymbol)} />
									<IconButtonComponent
										name="lensMinus"
										onClick={onRemoveConnector}
										disabled={isReadyForReview(selectedSymbol) || !selectedConnector}
									/>
									<IconButtonComponent
										name="rotateTR"
										onClick={onRotateConnector}
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
									show={isPanelShow}
									setUpdateDraftSymbol={onUpdateDraftSymbol}
									updateCurrentSymbol={onChangeSymbolForDetail}
									enableReinitialize={enableReinitialize}
									onAddConnector={addNewConnector}
									disabledForm={isReadyForReview(selectedSymbol) || false}
									onClosePanel={onPanelReset}
									elementRefs={connectorsToScroll}
									symbol={{ ...selectedSymbol }}
									connector={selectedConnector}
								/>
							</>
						)}
						<ListActionStyled isShow={listShow}>
							<IconButtonComponent name={listShow ? 'sideRight' : 'sideLeft'} onClick={() => setListShow(!listShow)} />
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
