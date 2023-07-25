import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/router';
import copyToClipboard from 'copy-to-clipboard';
import Typed from 'typed.js';
import { saveAs } from 'file-saver';

import { Search, Icon, Autocomplete, Snackbar } from '@equinor/eds-core-react';
import { change_history } from '@equinor/eds-icons';

import { NoResultComponent, PreviewComponent, SvgComponent, SymbolElement } from '../../components';

import { SymbolsPageProps, IconProps, IconByCategoryProps, SymbolsProps } from '../../types';

import {
	SymbolSelectWrapperStyled,
	SymbolInputsWrapperStyled,
	SymbolsContainerStyled,
	SymbolsHeaderStyled,
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
	key,
	// category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 - 1))],
	category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 + 1))],
	...rest,
}));
// Merge arrays based on same name key to have category value inside
// const icons = symbols.map((v) => ({ ...v, ...iconNamesWithCategories.find((sp) => sp.name === v.key) }));

const Symbols: NextPage<SymbolsPageProps> = ({ theme }) => {
	const [searchingValue, setSearchingValue] = useState<string>('');
	const [selectedSymbol, setSelectedSymbol] = useState<IconProps>(icons[0]);
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [isColorPicked, setColorPicked] = useState<boolean>(false);
	const [isPreviewShow, setPreviewShow] = useState<boolean>(false);
	const [appearance, setAppearance] = useState<string>(theme.fill);

	const router = useRouter();

	const typedElementRef = useRef(null);
	const svgElementsRef = useRef([]);

	const [icnsByCategory, seIcnsByCategory] = useState<IconByCategoryProps[] | []>([]);
	const [icns, seIcns] = useState<IconProps[] | []>(icons);

	const debounceSearchValue = useDebouncedCallback((value) => onSearch(value), 1000);

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
			const searchedValue = icons.filter(({ key }) => key.toLocaleLowerCase().includes(val.toLocaleLowerCase()));

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

	const onSelectSymbol = (selectedName?: string) => {
		const selected = icons.filter(({ key }) => key === selectedName)[0];

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
		const ref: HTMLDivElement = ref.current[id];
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

	return (
		<>
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

						<>
							{icnsByCategory.length <= 0 && searchingValue && <NoResultComponent value={searchingValue} />}
							{icnsByCategory.map(({ category, icons }) => {
								if (icons.length <= 0) return;

								return (
									<>
										<SymbolCategoryName key={category} id={category}>
											{category}
										</SymbolCategoryName>
										<SymbolsListStyled aria-label={category}>
											{icons.map((icon) => (
												<li key={icon.key}>
													<SymbolElement
														svgElementsRef={svgElementsRef}
														width={icon.width}
														meny={symbolMeny(icon)}
														height={icon.height}
														geometry={icon.geometry}
														id={icon.id}
														theme={theme}
														name={icon.key}
														// onSelectSymbol={onSelectSymbol}
														// setSnackbarOpen={setSnackbarOpen}
													/>
												</li>
											))}
										</SymbolsListStyled>
									</>
								);
							})}
						</>
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
