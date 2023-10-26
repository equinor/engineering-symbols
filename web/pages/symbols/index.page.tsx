import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import copyToClipboard from 'copy-to-clipboard';
import Typed from 'typed.js';
import { saveAs } from 'file-saver';
import Head from 'next/head';

import { Search, Snackbar } from '@equinor/eds-core-react';

import { NoResultComponent, PreviewComponent, SymbolElement } from '../../components';

import { SymbolsPageProps, IconProps, SymbolsProps } from '../../types';

import { SymbolSelectWrapperStyled, SymbolInputsWrapperStyled, SymbolsContainerStyled, SymbolsHeaderStyled, SymbolsListStyled } from './styles';

// import symbols from '../../data/symbols.json';
import { ContainerStyled } from '../../styles/styles';
import { SymbolsStore, getSymbolsQueryAction } from '../../store';
import { getPaths } from '../../helpers';

// From object to array
// const arrayIcons = Object.entries(lib).map(([name, obj]) => ({ name, ...obj }));
// Categories
// ALL WORDS ARE UPPERCASE (temp.)
const FIXTURE_CATEGORIES = ['Party', 'Superheroes', 'Circulation', 'Pool Party', 'Coachella', 'Isolation', 'Rainbow', 'Pop Art', 'Disco', 'Duck'];
// Only for list of the names
// const iconNames = Object.entries(symbols).map(([name]) => ({ name }));
// const icons = symbols.map(({ key, geometry, ...rest }) => ({
// 	key,
// 	// category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 - 1))],
// 	category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 + 1))],
// 	paths: geometry,
// 	...rest,
// }));
// Merge arrays based on same name key to have category value inside
// const icons = symbols.map((v) => ({ ...v, ...iconNamesWithCategories.find((sp) => sp.name === v.key) }));

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

	const typedElementRef = useRef<HTMLInputElement>(null);
	const svgElementsRef = useRef([]);

	// const [icnsByCategory, seIcnsByCategory] = useState<IconByCategoryProps[] | []>([]);
	const [icns, seIcns] = useState<IconProps[] | []>([]);

	const debounceSearchValue = useDebouncedCallback((value) => onSearch(value), 1000);

	console.log(8, 'finishSymbolsQuery:', finishSymbolsQuery, 'symbolsQuery:', symbolsQuery);

	useEffect(() => {
		!isColorPicked && setAppearance(theme.fill);
	}, [theme.fill]);

	useEffect(() => {
		const typed = new Typed(typedElementRef.current, {
			strings: [
				'Aid visualization.',
				'Simplify communication.',
				'Enhance technical drawings.',
				'Standardize representation.',
				'Improve drafting accuracy.',
			],
			typeSpeed: 75,
			backSpeed: 50,
			showCursor: false,
			loop: true,
		});

		return () => {
			// Destroy Typed instance during cleanup to stop animation
			typed.destroy();
		};
	}, []);

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

	// useEffect(() => {
	// 	// if (icns.length <= 0) return;
	// 	if (icns.length <= 0) seIcnsByCategory([]);

	// 	const res = Object.values(
	// 		// @ts-ignore
	// 		icns.reduce((acc: IconByCategoryProps[], { category, ...rest }: IconProps) => {
	// 			// @ts-ignore
	// 			acc[category] = acc[category] || { category, icons: [] };
	// 			// @ts-ignore
	// 			acc[category].icons.push(rest);

	// 			return acc;
	// 		}, {})
	// 	);

	// 	seIcnsByCategory(res as IconByCategoryProps[]);
	// }, [icns]);

	useEffect(() => {
		seIcns(symbolsQuery);
	}, [symbolsQuery]);

	// const onSelectedCategory = (val: string) => {
	// 	if (!val || val === 'All') {
	// 		seIcns(icons);
	// 		setSelectedCategory('All');
	// 	} else {
	// 		const searchedValue = icons.filter(({ category }) => category === val);

	// 		setSelectedCategory(val);
	// 		seIcns(searchedValue);
	// 	}
	// };

	const onSelectedCategory = (val: string) => {
		// if (val) {
		// 	router.push(`#${val}`);
		// } else {
		// 	router.push('');
		// 	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		// }
	};

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

	const getSymbolVersion = ({ identifier, id }: SymbolsProps) => {
		if (icns.length <= 0) return 1;

		const filteredIcons = icns.filter((sbl: SymbolsProps) => sbl.identifier === identifier);

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
				<SymbolsHeaderStyled>
					<h1 ref={typedElementRef}></h1>
					<p>
						{
							"We're constantly adding new symbols to our library, so be sure to check back regularly for the latest additions. And if you can't find the symbol you're looking for, let us know - we're always happy to take suggestions and feedback from our users."
						}
					</p>
				</SymbolsHeaderStyled>

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
												<li key={icon.identifier}>
													<SymbolElement
														chipsStatus={getSymbolVersion(icon)}
														svgElementsRef={svgElementsRef}
														width={icon.width}
														meny={symbolMeny(icon)}
														height={icon.height}
														paths={getPaths(icon.shape)}
														id={icon.id}
														theme={theme}
														name={icon.identifier}
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
