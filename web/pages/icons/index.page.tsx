import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Typography, Chip, Button, Card, Search, Slider, Label } from '@equinor/eds-core-react';
import { HexColorPicker } from 'react-colorful';

import { DialogComponent } from '../../components';
import { capitalizeWords } from '../../helpers';

import { ColorThemeProps, IconProps } from '../../types';

import {
	CustomizeElementStyled,
	CustomizeColorStyled,
	CustomizeResetStyled,
	IconsContainerStyled,
	IconsListWrapStyled,
	IconsHeaderStyled,
	IconWrapperStyled,
	IconsSearchStyled,
	CategoriesStyled,
	CustomizeStyled,
	IconsListStyled,
} from './styles';

import lib from '../../__FIXTURE__/symbol-library.json';

// From object to array
const arrayIcons = Object.entries(lib).map(([name, obj]) => ({ name, ...obj }));
// Categories
// ALL WORDS ARE UPPERCASE (temp.)
const fixtureCategories = ['Party', 'Superheroes', 'Circulation', 'Pool Party', 'Coachella', 'Isolation', 'Rainbow', 'Pop Art', 'Disco', 'Duck'];
// Only for list of the names
const iconNames = Object.entries(lib).map(([name]) => ({ name }));
const iconNamesWithCategories = iconNames.map(({ name }) => ({
	name,
	category: fixtureCategories[Math.floor(Math.random() * (9 - 1))],
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
}));
// Merge arrays based on same name key to have category value inside
const icons = arrayIcons.map((v) => ({ ...v, ...iconNamesWithCategories.find((sp) => sp.name === v.name) }));

const Icons: NextPage<ColorThemeProps> = ({ theme }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isColorPicked, setColorPicked] = useState<boolean>(false);
	const [rotate, setRotate] = useState<number>(0);
	const [appearance, setAppearance] = useState<string>(theme.fill);
	const [selectedIcon, setSelectedIcon] = useState<IconProps | null>();

	// type IconProps
	const [icns, seIcns] = useState<IconProps[] | []>(icons);
	const [selectedCategory, setSelectedCategory] = useState<string>('All');

	const debounceSearchValue = useDebouncedCallback((value) => onSearch(value), 1000);
	const debounceRotateValue = useDebouncedCallback((value) => setRotate(value), 1);

	useEffect(() => {
		!isColorPicked && setAppearance(theme.fill);
	}, [theme.fill]);

	const onSearch = (val: string) => {
		if (val) {
			const searchedValue = icons.filter(({ name }) => name.includes(val));

			seIcns(searchedValue);
		} else {
			seIcns(icons);
		}
	};

	const onSelectedCategory = (val: string) => {
		if (!val || val === 'All') {
			seIcns(icons);
			setSelectedCategory('All');
		} else {
			const searchedValue = icons.filter(({ category }) => category === val);

			setSelectedCategory(val);
			seIcns(searchedValue);
		}
	};

	const onRestCustomize = () => {
		setRotate(0);
		setColorPicked(false);
		setAppearance(theme.fill);
	};

	const onColorPicker = (color: string) => {
		setAppearance(color);
		setColorPicked(true);
	};

	const handleOpen = (selectedName: string) => {
		const selected = icons.filter(({ name }) => name === selectedName)[0];

		setIsOpen(true);
		setSelectedIcon(selected);
	};

	const handleClose = () => {
		setIsOpen(false);
		setSelectedIcon(null);
	};

	const counts = icons.reduce((acc: any, curr) => {
		const str = JSON.stringify(curr.category);

		acc[str] = (acc[str] || 0) + 1;
		return acc;
	}, {});

	return (
		<>
			<IconsHeaderStyled>
				<Typography variant="h1_bold" style={{ textAlign: 'center' }}>
					Crazy fast workflow
				</Typography>
			</IconsHeaderStyled>
			<IconsSearchStyled>
				<Search aria-label="sitewide" id="search-normal" placeholder="Search" onChange={({ target }) => debounceSearchValue(target.value)} />
			</IconsSearchStyled>
			<IconsContainerStyled>
				<CategoriesStyled>
					<li>
						{/* @ts-ignore: next-line */}
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
									/* @ts-ignore: next-line */
									variant={selectedCategory === name ? '' : 'ghost'}
									onClick={() => onSelectedCategory(name)}>
									<span>{name}</span>
									<Chip>{counts[key]}</Chip>
								</Button>
							</li>
						);
					})}
				</CategoriesStyled>

				<IconsListStyled>
					{icns.map(({ name, svgString }) => (
						<li key={name}>
							<button onClick={() => handleOpen(name)}>
								<Card>
									<IconsListWrapStyled>
										<IconWrapperStyled fill={appearance} rotate={rotate}>
											<div dangerouslySetInnerHTML={{ __html: svgString }} />
										</IconWrapperStyled>
										<>
											<Typography variant="body_short">{name}</Typography>
										</>
									</IconsListWrapStyled>
								</Card>
							</button>
						</li>
					))}
				</IconsListStyled>
				<CustomizeStyled>
					<CustomizeElementStyled>
						<CustomizeResetStyled>
							<Typography variant="body_short" bold>
								Customize
							</Typography>
							<Button color="secondary" onClick={() => onRestCustomize()}>
								Reset
							</Button>
						</CustomizeResetStyled>
					</CustomizeElementStyled>

					<CustomizeElementStyled>
						<Label label="Rotation" id="even-simpler-slider" />
						<Slider
							aria-labelledby="even-simpler-slider"
							value={rotate}
							step={1}
							max={359}
							min={0}
							minMaxDots={false}
							minMaxValues={false}
							// @ts-ignore: next-line
							onChange={(el, val) => debounceRotateValue(val[0])}
						/>
					</CustomizeElementStyled>

					<CustomizeElementStyled>
						<CustomizeColorStyled>
							<Typography variant="body_short" bold>
								Color
							</Typography>
							<HexColorPicker color={appearance} onChange={onColorPicker} />
						</CustomizeColorStyled>
					</CustomizeElementStyled>
				</CustomizeStyled>
			</IconsContainerStyled>

			{isOpen && selectedIcon && <DialogComponent onHandleClose={handleClose} selected={selectedIcon} />}
		</>
	);
};

export default Icons;
