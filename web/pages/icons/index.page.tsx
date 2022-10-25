import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Typography, Card, Search, Icon, SingleSelect } from '@equinor/eds-core-react';
import { change_history } from '@equinor/eds-icons';

import { NoResultComponent, PreviewComponent, SvgComponent } from '../../components';

import { ColorThemeProps, IconProps, IconByCategoryProps } from '../../types';

import {
	IconsContainerStyled,
	IconsListWrapStyled,
	IconsHeaderStyled,
	IconWrapperStyled,
	IconCategoryName,
	IconsListStyled,
	IconSelectWrapperStyled,
	IconInputsWrapperStyled,
} from './styles';

import lib from '../../__FIXTURE__/symbol-library.json';

// From object to array
const arrayIcons = Object.entries(lib).map(([name, obj]) => ({ name, ...obj }));
// Categories
// ALL WORDS ARE UPPERCASE (temp.)
const FIXTURE_CATEGORIES = ['Party', 'Superheroes', 'Circulation', 'Pool Party', 'Coachella', 'Isolation', 'Rainbow', 'Pop Art', 'Disco', 'Duck'];
// Only for list of the names
const iconNames = Object.entries(lib).map(([name]) => ({ name }));
const iconNamesWithCategories = iconNames.map(({ name }) => ({
	name,
	// category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 - 1))],
	category: FIXTURE_CATEGORIES[Math.floor(Math.random() * (9 + 1))],
}));
// Merge arrays based on same name key to have category value inside
const icons = arrayIcons.map((v) => ({ ...v, ...iconNamesWithCategories.find((sp) => sp.name === v.name) }));

const Icons: NextPage<ColorThemeProps> = ({ theme }) => {
	const [isColorPicked, setColorPicked] = useState<boolean>(false);
	const [searchingValue, setSearchingValue] = useState<string>('');
	const [appearance, setAppearance] = useState<string>(theme.fill);
	const [selectedIcon, setSelectedIcon] = useState<IconProps>(icons[0]);

	const router = useRouter();

	// type IconProps
	const [icns, seIcns] = useState<IconProps[] | []>(icons);
	const [icnsByCategory, seIcnsByCategory] = useState<IconByCategoryProps[] | []>([]);
	// const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
		if (val === null) {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		} else {
			router.push(`#${val}`);
		}
	};

	const onSelectIcon = (selectedName: string) => {
		const selected = icons.filter(({ name }) => name === selectedName)[0];

		setSelectedIcon(selected);
	};

	// const counts = icons.reduce((acc: any, curr) => {
	// 	const str = JSON.stringify(curr.category);

	// 	acc[str] = (acc[str] || 0) + 1;
	// 	return acc;
	// }, {});

	return (
		<>
			<IconsHeaderStyled>
				<Typography variant="h1_bold" style={{ textAlign: 'center' }}>
					Crazy fast workflow
				</Typography>
			</IconsHeaderStyled>

			<IconsContainerStyled>
				{/* <CategoriesStyled>
					<li>
						<Button onClick={() => onSelectedCategory('All')} variant={selectedCategory === 'All' ? '' : 'ghost'}>
							<span>All</span>
							<Chip>{icons.length}</Chip>
						</Button>
					</li>
					{Object.keys(counts).map((key) => {
						const name = capitalizeWords(key.slice(1, -1)).join(' ');

						return (
							<li key={key}>
								<Button
									// @ts-ignore: next-line
									variant={selectedCategory === name ? '' : 'ghost'}
									onClick={() => onSelectedCategory(name)}>
									<span>{name}</span>
									<Chip>{counts[key]}</Chip>
								</Button>
							</li>
						);
					})}
				</CategoriesStyled> */}

				<div>
					<IconSelectWrapperStyled>
						<IconInputsWrapperStyled>
							<Search
								aria-label="sitewide"
								id="search-normal"
								placeholder="Search"
								onChange={({ target }) => debounceSearchValue(target.value)}
							/>
						</IconInputsWrapperStyled>
						<IconInputsWrapperStyled>
							<Icon data={change_history}></Icon>
							<SingleSelect
								items={FIXTURE_CATEGORIES}
								placeholder="Category"
								handleSelectedItemChange={({ selectedItem }) => onSelectedCategory(selectedItem)}
							/>
						</IconInputsWrapperStyled>
					</IconSelectWrapperStyled>

					<IconsListStyled>
						{icnsByCategory.length <= 0 && <NoResultComponent value={searchingValue} />}
						{icnsByCategory.map(({ category, icons }) => {
							if (icons.length <= 0) return;

							return (
								<>
									<IconCategoryName id={category}>{category}</IconCategoryName>
									<ul aria-label={category}>
										{icons.map(({ name, width, height, geometryString }) => (
											<li key={name}>
												<button onClick={() => onSelectIcon(name)}>
													<Card>
														<IconsListWrapStyled>
															<IconWrapperStyled>
																<SvgComponent
																	viewBoxHeight={height}
																	viewBoxWidth={width}
																	height={70}
																	width={70}
																	fill={appearance}
																	path={geometryString}
																/>
															</IconWrapperStyled>
															<>
																<Typography variant="body_short">{name}</Typography>
															</>
														</IconsListWrapStyled>
													</Card>
												</button>
											</li>
										))}
									</ul>
								</>
							);
						})}
						{/* {FIXTURE_CATEGORIES.map((val) => {
							return (
								<>
									<IconCategoryName id={val}>{val}</IconCategoryName>
									<ul aria-label={val}>
										{icns.map(({ name, width, height, geometryString, category }) => {
											if (val === category) {
												return (
													<li key={name}>
														<button onClick={() => onSelectIcon(name)}>
															<Card>
																<IconsListWrapStyled>
																	<IconWrapperStyled>
																		<SvgComponent
																			viewBoxHeight={height}
																			viewBoxWidth={width}
																			height={60}
																			width={60}
																			fill={appearance}
																			path={geometryString}
																		/>
																	</IconWrapperStyled>
																	<>
																		<Typography variant="body_short">{name}</Typography>
																	</>
																</IconsListWrapStyled>
															</Card>
														</button>
													</li>
												);
											}
										})}
									</ul>
								</>
							);
						})} */}
					</IconsListStyled>
				</div>

				<PreviewComponent
					selected={selectedIcon}
					setPreviewAppearance={setAppearance}
					setPreviewColorPicked={setColorPicked}
					onSearchValue={debounceSearchValue}
					theme={theme}
					appearance={appearance}
				/>
			</IconsContainerStyled>
		</>
	);
};

export default Icons;
