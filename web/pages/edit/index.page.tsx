import { useRef, useState, ChangeEvent, Ref, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PanelDetailsComponent, SvgComponent, SymbolElement } from '../../components';

import { ConnectorsProps, EditPageProps, SymbolsProps } from '../../types';

import {
	PanelContainerStyled,
	PanelPresentationContentStyled,
	PanelPresentationStyled,
	PanelSymbolsListStyled,
	PanelSymbolsStyled,
	UploadSvgStyled,
} from './styles';
import symbols from '../../data/symbols.json';
import { ContainerStyled } from '../../styles/styles';
import useConfirm from '../../components/confirmation/Confirmation';

const Edit: NextPage<EditPageProps> = ({ theme }) => {
	const [svgContent, setSvgContent] = useState(null);
	const [isShowDeletingConfirmation, setShowDeletingConfirmation] = useState(true);
	const [deletionConfirmed, setDeletionConfirmed] = useState(false);
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolsProps | null>();
	// const [currentSymbolConnectors, setCurrentSymbolConnectors] = useState<ConnectorsProps[] | []>([]);
	const [symbolForDetail, setSymbolForDetail] = useState<any>(null);
	const [enableReinitialize, setEnableReinitialize] = useState<boolean>(false);

	const svgElementsRef = useRef([]);
	const fileInputRef = useRef<HTMLInputElement>();

	const [getConfirmation, ConfirmationComponent] = useConfirm(selectedSymbol);

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

	const onFileUpload = () => fileInputRef.current && fileInputRef.current.click();

	const onSendOnReview = () => {
		console.log('⚡️', 'onSendOnReview');
	};

	const onDeleteConfirmation = async (symbol: SymbolsProps) => {
		setSelectedSymbol(symbol);
		setSymbolForDetail(symbol);

		const status = await getConfirmation();

		if (status) onDelete();
	};

	const onDelete = () => {
		console.log('⚡️', 'onDelete');
	};

	const symbolMeny = (symbol: SymbolsProps) => [
		{
			name: 'Edit',
			action: () => onEditSymbol(symbol),
		},
		{
			name: 'Send on review',
			action: () => onSendOnReview(),
			isDisabled: true,
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
								// symbol={{...symbolForDetail, connectors: currentSymbolConnectors}}
								symbol={{ ...symbolForDetail }}
								isExistingSvg={!!selectedSymbol}
								enableReinitialize={enableReinitialize}
								updateCurrentSymbol={onChangeSymbolForDetail}
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
									<input type="file" id="file" ref={fileInputRef} name="file" accept=".svg" onChange={onChangeFileInput} />
								</UploadSvgStyled>
							</li>
							{symbols.map((symbol) => (
								<li key={symbol.key}>
									<SymbolElement
										meny={symbolMeny(symbol)}
										chipsStatus="waiting"
										svgElementsRef={svgElementsRef}
										width={symbol.width}
										height={symbol.height}
										geometry={symbol.geometry}
										id={symbol.id}
										theme={theme}
										name={symbol.key}
									/>
								</li>
							))}
						</PanelSymbolsListStyled>
					</ContainerStyled>
				</PanelSymbolsStyled>

				<ConfirmationComponent
					isShow={isShowDeletingConfirmation}
					setPreviewShow={setShowDeletingConfirmation}
					name={selectedSymbol && selectedSymbol.key}
					onConfirm={setDeletionConfirmed}
				/>
			</PanelContainerStyled>
		</div>
	);
};

export default Edit;
