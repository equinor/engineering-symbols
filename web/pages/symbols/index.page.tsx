import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { saveAs } from 'file-saver';
import copyToClipboard from 'copy-to-clipboard';

import { Typography, Card, Search, Icon, Autocomplete, Snackbar } from '@equinor/eds-core-react';
import { change_history } from '@equinor/eds-icons';

import { NoResultComponent, PreviewComponent, SvgComponent } from '../../components';

import { SymbolsPageProps, IconProps, IconByCategoryProps } from '../../types';

import {
	SymbolSelectWrapperStyled,
	SymbolInputsWrapperStyled,
	SymbolsContainerStyled,
	SymbolsListWrapStyled,
	SymbolMenyWrapStyled,
	SymbolsHeaderStyled,
	SymbolWrapperStyled,
	SymbolCategoryName,
	SymbolsListStyled,
} from './styles';

import symbols from '../../data/symbols.json';
import { ContainerStyled } from '../../styles/styles';

// From object to array
// const arrayIcons = Object.entries(lib).map(([name, obj]) => ({ name, ...obj }));
// Categories
// ALL WORDS ARE UPPERCASE (temp.)
const FIXTURE_CATEGORIES = ['Party', 'Superheroes', 'Circulation', 'Pool Party', 'Coachella', 'Isolation', 'Rainbow', 'Pop Art', 'Disco', 'Duck'];
// Only for list of the names
// const iconNames = Object.entries(symbols).map(([name]) => ({ name }));
const icons = symbols.map(({ key, ...rest }) => ({
	name: key,
	// category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 - 1))],
	category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 + 1))],
	...rest,
}));
// Merge arrays based on same name key to have category value inside
// const icons = symbols.map((v) => ({ ...v, ...iconNamesWithCategories.find((sp) => sp.name === v.key) }));

const Symbols: NextPage<SymbolsPageProps> = ({ theme }) => {
	const [isColorPicked, setColorPicked] = useState<boolean>(false);
	const [isPreviewShow, setPreviewShow] = useState<boolean>(false);
	const [searchingValue, setSearchingValue] = useState<string>('');
	const [appearance, setAppearance] = useState<string>(theme.fill);
	const [selectedSymbol, setSelectedSymbol] = useState<IconProps>(icons[0]);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);

	const router = useRouter();

	const svgElementsRef = useRef([]);

	// type IconProps
	const [icns, seIcns] = useState<IconProps[] | []>(icons);
	const [icnsByCategory, seIcnsByCategory] = useState<IconByCategoryProps[] | []>([]);

	const debounceSearchValue = useDebouncedCallback((value) => onSearch(value), 1000);

	useEffect(() => {
		!isColorPicked && setAppearance(theme.fill);
	}, [theme.fill]);

	const onSearch = (val: string) => {
		setSearchingValue(val);

		if (val) {
			const searchedValue = icons.filter(({ name }) => name.includes(val));

			seIcns(searchedValue);

			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		} else {
			seIcns(icons);
		}
	};

	useEffect(() => {
		// if (icns.length <= 0) return;
		if (icns.length <= 0) seIcnsByCategory([]);

		const res = Object.values(
			// @ts-ignore
			icns.reduce((acc: IconByCategoryProps[], { category, ...rest }: IconProps) => {
				// @ts-ignore
				acc[category] = acc[category] || { category, icons: [] };
				// @ts-ignore
				acc[category].icons.push(rest);

				return acc;
			}, {})
		);

		seIcnsByCategory(res as IconByCategoryProps[]);
	}, [icns]);

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
		if (val) {
			router.push(`#${val}`);
		} else {
			router.push('');
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		}
	};

	const onSelectSymbol = (selectedName: string) => {
		const selected = icons.filter(({ name }) => name === selectedName)[0];

		setSelectedSymbol(selected);
		setPreviewShow(true);
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

		const svgData = new XMLSerializer().serializeToString(svg);

		return svgData;
	};

	const onDownloadSvg = (name: string, id: string) => {
		console.log('i =>', id);
		const url = new Blob([getSvgString(id)], { type: 'image/svg+xml' });

		saveAs(url, `${name}.svg`);
	};

	const onCopyToClipboard = (val: string) => {
		copyToClipboard(val);
		setSnackbarOpen(true);
	};

	return (
		<>
			<ContainerStyled>
				<SymbolsHeaderStyled>
					<Typography variant="h1_bold" style={{ textAlign: 'center' }}>
						Crazy fast workflow
					</Typography>
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
							<SymbolInputsWrapperStyled>
								<Icon data={change_history}></Icon>
								<Autocomplete
									label=""
									options={FIXTURE_CATEGORIES}
									placeholder="Category"
									onOptionsChange={({ selectedItems }) => onSelectedCategory(selectedItems[0])}
								/>
							</SymbolInputsWrapperStyled>
						</SymbolSelectWrapperStyled>

						<SymbolsListStyled>
							{icnsByCategory.length <= 0 && <NoResultComponent value={searchingValue} />}
							{icnsByCategory.map(({ category, icons }) => {
								if (icons.length <= 0) return;

								return (
									<>
										<SymbolCategoryName key={category} id={category}>
											{category}
										</SymbolCategoryName>
										<ul aria-label={category}>
											{icons.map(({ name, width, height, geometry, id }) => (
												<li key={name}>
													<>
														<Card>
															<SymbolsListWrapStyled>
																{/* @ts-ignore next-line */}
																<SymbolWrapperStyled ref={(ref) => (svgElementsRef.current[id] = ref)}>
																	<SvgComponent
																		viewBoxHeight={height}
																		viewBoxWidth={width}
																		height={95}
																		width={95}
																		fill={appearance}
																		path={geometry}
																	/>
																</SymbolWrapperStyled>

																<SymbolMenyWrapStyled>
																	<li>
																		<button onClick={() => onCopyToClipboard(name)}>Copy</button>
																	</li>
																	<li>
																		<button onClick={() => onDownloadSvg(name, id)}>Download</button>
																	</li>
																	<li>
																		<button onClick={() => onSelectSymbol(name)}>More...</button>
																	</li>
																</SymbolMenyWrapStyled>
															</SymbolsListWrapStyled>
														</Card>
														<>
															<p>{name}</p>
														</>
													</>
												</li>
											))}
										</ul>
									</>
								);
							})}
						</SymbolsListStyled>
					</div>
				</SymbolsContainerStyled>
			</ContainerStyled>
			<PreviewComponent
				setPreviewColorPicked={setColorPicked}
				setPreviewAppearance={setAppearance}
				setPreviewShow={setPreviewShow}
				appearance={appearance}
				selected={selectedSymbol}
				isShow={isPreviewShow}
				theme={theme}
			/>
			<Snackbar open={isSnackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={3000}>
				Copied!
			</Snackbar>
		</>
	);
};

export default Symbols;
