import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Typography, Card, Search, Icon, Autocomplete } from '@equinor/eds-core-react';
import { change_history } from '@equinor/eds-icons';

import { NoResultComponent, PreviewComponent, SvgComponent } from '../../components';

import { SymbolsPageProps, IconProps, IconByCategoryProps } from '../../types';

import {
	SymbolSelectWrapperStyled,
	SymbolInputsWrapperStyled,
	SymbolsContainerStyled,
	SymbolsListWrapStyled,
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
console.log(88, icons);

const Symbols: NextPage<SymbolsPageProps> = ({ theme }) => {
	const [isColorPicked, setColorPicked] = useState<boolean>(false);
	const [searchingValue, setSearchingValue] = useState<string>('');
	const [appearance, setAppearance] = useState<string>(theme.fill);
	const [selectedSymbol, setSelectedSymbol] = useState<IconProps>(icons[0]);

	const router = useRouter();

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
	};

	// const counts = icons.reduce((acc: any, curr) => {
	// 	const str = JSON.stringify(curr.category);

	// 	acc[str] = (acc[str] || 0) + 1;
	// 	return acc;
	// }, {});

	return (
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
										{icons.map(({ name, width, height, geometry }) => (
											<li key={name}>
												<button onClick={() => onSelectSymbol(name)}>
													<Card>
														<SymbolsListWrapStyled>
															<SymbolWrapperStyled>
																<SvgComponent
																	viewBoxHeight={height}
																	viewBoxWidth={width}
																	height={95}
																	width={95}
																	fill={appearance}
																	path={geometry}
																/>
															</SymbolWrapperStyled>
														</SymbolsListWrapStyled>
													</Card>
													<>
														<p>{name}</p>
													</>
												</button>
											</li>
										))}
									</ul>
								</>
							);
						})}
					</SymbolsListStyled>
				</div>

				<PreviewComponent
					setPreviewColorPicked={setColorPicked}
					setPreviewAppearance={setAppearance}
					appearance={appearance}
					selected={selectedSymbol}
					theme={theme}
				/>
			</SymbolsContainerStyled>
		</ContainerStyled>
	);
};

export default Symbols;
