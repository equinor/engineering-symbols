import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import copyToClipboard from 'copy-to-clipboard';
import { saveAs } from 'file-saver';
import Head from 'next/head';

import { Search, Snackbar } from '@equinor/eds-core-react';

import { NoResultComponent, PreviewComponent, SymbolElement } from '../../components';

import { SymbolsPageProps, IconProps, SymbolsProps } from '../../types';

import { SymbolSelectWrapperStyled, SymbolInputsWrapperStyled, SymbolsContainerStyled, SymbolsListStyled } from './styles';

import { ContainerStyled } from '../../styles/styles';
import { SymbolsStore, getSymbolsQueryAction } from '../../store';

const Symbols: NextPage<SymbolsPageProps> = ({ theme }) => {
	const { symbolsQuery } = SymbolsStore.useState();
	const [finishSymbolsQuery] = getSymbolsQueryAction.useBeckon();

	// !finishSymbolsQuery && return (<><WeatherLoader /></>);

	const [searchingValue, setSearchingValue] = useState<string>('');
	const [selectedSymbol, setSelectedSymbol] = useState<IconProps | null>(null);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [isColorPicked, setColorPicked] = useState<boolean>(false);
	const [isPreviewShow, setPreviewShow] = useState<boolean>(false);
	const [appearance, setAppearance] = useState<string>(theme.fill);

	const svgElementsRef = useRef([]);

	// const [icnsByCategory, seIcnsByCategory] = useState<IconByCategoryProps[] | []>([]);
	const [icns, seIcns] = useState<IconProps[] | []>([]);

	const debounceSearchValue = useDebouncedCallback((value) => onSearch(value), 1000);

	useEffect(() => {
		!isColorPicked && setAppearance(theme.fill);
	}, [theme.fill]);

	const onSearch = (val: string) => {
		setSearchingValue(val);

		if (val) {
			const searchedValue = symbolsQuery.filter(({ key }: any) => key.toLocaleLowerCase().includes(val.toLocaleLowerCase()));

			seIcns(searchedValue);

			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		} else {
			seIcns(symbolsQuery);
		}
	};

	const sortSymbolsQuery = () => {
		const sortedData = [...symbolsQuery].sort((a, b) => {
			// First, sort by name
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
	}, [symbolsQuery]);

	const onSelectSymbol = (selectedName?: string) => {
		const selected = symbolsQuery.filter(({ key }: any) => key === selectedName)[0];

		setSelectedSymbol(selected);
		setPreviewShow(true);
	};

	// Meny
	// TODO: clean it
	const onCopyToClipboard = (val: string) => {
		copyToClipboard(val);
		setSnackbarOpen && setSnackbarOpen(true);
	};

	const getSvg = (id: string) => {
		if (!svgElementsRef || !svgElementsRef.current) return '';

		// @ts-ignore next-line
		const ref: HTMLDivElement = svgElementsRef.current[id];
		const svg = ref.getElementsByTagName('svg')[0];
		const clone = svg.cloneNode(true) as SVGSVGElement;

		return clone;
	};

	const getSvgString = (id: string) => {
		const svg = getSvg(id);

		if (!svg) return '';

		return new XMLSerializer().serializeToString(svg);
	};

	const onDownloadSvg = (name: string, id: string) => {
		const url = new Blob([getSvgString(id)], { type: 'image/svg+xml' });

		saveAs(url, `${name}.svg`);
	};

	const symbolMeny = ({ key, id }: SymbolsProps) => [
		{
			name: 'Copy',
			action: () => onCopyToClipboard(key),
		},
		{
			name: 'Download',
			action: () => onDownloadSvg(key, id),
		},
		{
			name: 'More...',
			action: () => onSelectSymbol(key),
		},
	];

	const getSymbolVersion = ({ key, id }: SymbolsProps) => {
		if (icns.length <= 0) return 1;

		const filteredIcons = icns.filter((sbl: SymbolsProps) => sbl.key === key);

		filteredIcons.sort(
			// @ts-ignore next-line
			(a: SymbolsProps, b: SymbolsProps) => new Date(a.dateTimePublished).getTime() - new Date(b.dateTimePublished).getTime()
		);

		// Find the index of the object with the given id in the sorted array
		const index = filteredIcons.findIndex((sbl: { id: string }) => sbl.id === id);

		// If the object with the given id is found, return its position + 1 as the version
		// If not found, return 1 (default version)
		return index !== -1 ? index + 1 : 1;
	};

	return (
		<>
			<Head>
				<title>🍯 SVG Engineering Symbols Library</title>
				<meta
					name="description"
					content="Access a vast SVG library of engineering symbols. Download and use in your projects, or contribute your own."
				/>
				<meta key="robots" name="robots" content="noindex,follow" />
				<meta key="googlebot" name="googlebot" content="noindex,follow" />
				{/* ADD SEO */}
			</Head>
			<ContainerStyled>
				<SymbolsContainerStyled>
					<div>
						<SymbolSelectWrapperStyled>
							<SymbolInputsWrapperStyled>
								<Search
									aria-label="sitewide"
									id="search-normal"
									placeholder="Search"
									onChange={({ target }) => debounceSearchValue(target.value)}
								/>
							</SymbolInputsWrapperStyled>
							{/* <SymbolInputsWrapperStyled>
								<Icon data={change_history}></Icon>
								<Autocomplete
									label=""
									options={FIXTURE_CATEGORIES}
									placeholder="Category"
									onOptionsChange={({ selectedItems }) => onSelectedCategory(selectedItems[0])}
								/>
							</SymbolInputsWrapperStyled> */}
						</SymbolSelectWrapperStyled>

						<>
							{searchingValue && icns.length <= 0 && <NoResultComponent value={searchingValue} />}

							<SymbolsListStyled aria-label="Hello">
								{finishSymbolsQuery &&
									icns.map((icon) => {
										// if (icons.length <= 0) return;
										return (
											<>
												{/* <SymbolCategoryName key={category} id={category}>
											{category}
										</SymbolCategoryName> */}
												{/* {symbolsQuery.map((icon: IconProps) => ( */}
												<li key={icon.key}>
													<SymbolElement
														chipsStatus={getSymbolVersion(icon)}
														svgElementsRef={svgElementsRef}
														width={icon.width}
														meny={symbolMeny(icon)}
														height={icon.height}
														paths={icon.geometry}
														id={icon.id}
														theme={theme}
														name={icon.key}
													/>
												</li>
												{/* ))} */}
											</>
										);
									})}
							</SymbolsListStyled>
						</>
					</div>
				</SymbolsContainerStyled>
			</ContainerStyled>
			{selectedSymbol !== null && (
				<PreviewComponent
					setPreviewColorPicked={setColorPicked}
					setPreviewAppearance={setAppearance}
					setPreviewShow={setPreviewShow}
					appearance={appearance}
					selected={selectedSymbol}
					isShow={isPreviewShow}
					theme={theme}
				/>
			)}
			<Snackbar open={isSnackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={3000}>
				Copied!
			</Snackbar>
		</>
	);
};

export default Symbols;
