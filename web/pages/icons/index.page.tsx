import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Typography, Card, Search, Icon, Autocomplete } from '@equinor/eds-core-react';
import { change_history } from '@equinor/eds-icons';

import { NoResultComponent, PreviewComponent, SvgComponent } from '../../components';

import { IconPageProps, IconProps, IconByCategoryProps } from '../../types';

import {
	IconSelectWrapperStyled,
	IconInputsWrapperStyled,
	IconsContainerStyled,
	IconsListWrapStyled,
	IconsHeaderStyled,
	IconWrapperStyled,
	IconCategoryName,
	IconsListStyled,
} from './styles';

import symbols from '../../data/symbols.json';

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

const Icons: NextPage<IconPageProps> = ({ theme }) => {
	const [isColorPicked, setColorPicked] = useState<boolean>(false);
	const [searchingValue, setSearchingValue] = useState<string>('');
	const [appearance, setAppearance] = useState<string>(theme.fill);
	const [selectedIcon, setSelectedIcon] = useState<IconProps>(icons[0]);

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
							<Autocomplete
								label=""
								options={FIXTURE_CATEGORIES}
								placeholder="Category"
								onOptionsChange={({ selectedItems }) => onSelectedCategory(selectedItems[0])}
							/>
						</IconInputsWrapperStyled>
					</IconSelectWrapperStyled>

					<IconsListStyled>
						{icnsByCategory.length <= 0 && <NoResultComponent value={searchingValue} />}
						{icnsByCategory.map(({ category, icons }) => {
							if (icons.length <= 0) return;

							return (
								<>
									<IconCategoryName key={category} id={category}>
										{category}
									</IconCategoryName>
									<ul aria-label={category}>
										{icons.map(({ name, width, height, geometry }) => (
											<li key={name}>
												<button onClick={() => onSelectIcon(name)}>
													<Card>
														<IconsListWrapStyled>
															<IconWrapperStyled>
																<SvgComponent
																	viewBoxHeight={height}
																	viewBoxWidth={width}
																	height={75}
																	width={75}
																	fill={appearance}
																	path={geometry}
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
					</IconsListStyled>
				</div>

				<PreviewComponent
					setPreviewColorPicked={setColorPicked}
					setPreviewAppearance={setAppearance}
					appearance={appearance}
					selected={selectedIcon}
					theme={theme}
				/>
			</IconsContainerStyled>
		</>
	);
};

export default Icons;
