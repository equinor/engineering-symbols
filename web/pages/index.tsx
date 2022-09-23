import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Typography, Chip, Button, Card, Search, Slider, Label } from '@equinor/eds-core-react';
import { Icon as EngineeringIcon } from '@equinor/engineering-symbols';
import { HexColorPicker } from 'react-colorful';
import { useDebouncedCallback } from 'use-debounce';

import styles from '../styles/Home.module.css';
import { DialogComponent } from '../components';
import { capitalizeWords } from '../helpers';
import { IconProps } from '../types';

const icons = [
	{
		name: 'arrow-down',
		category: 'shapes',
		connectors: [],
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
	},
	{
		name: 'arrow-up',
		category: 'awesome',
		connectors: [],
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
	},
	{
		name: 'arrow-right',
		category: 'awesome',
		connectors: [],
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
	},
];

const Home: NextPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [rotate, setRotate] = useState<number>(0);
	const [appearance, setAppearance] = useState<string>('#000');
	const [selectedIconName, setSelectedIconName] = useState<string>('');

	const [icns, seIcns] = useState<IconProps[]>(icons);
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [searchValue, setSearchValue] = useState<string>('');

	const debounceValue = useDebouncedCallback((value) => setSearchValue(value), 1000);

	useEffect(() => {
		if (searchValue) {
			const searchedValue = icons.filter(({ name }) => name.includes(searchValue));
			seIcns(searchedValue);
		} else {
			seIcns(icons);
		}
	}, [searchValue]);

	useEffect(() => {
		if (!selectedCategory || selectedCategory === 'All') {
			seIcns(icons);
		} else {
			const searchedValue = icons.filter(({ category }) => category === selectedCategory.toLocaleLowerCase());
			seIcns(searchedValue);
		}
	}, [selectedCategory]);

	const onRestCustomize = () => {
		setRotate(0);
		setAppearance('#000');
	};

	const handleOpen = (name: string) => {
		setIsOpen(true);
		setSelectedIconName(name);
	};

	const handleClose = () => {
		setIsOpen(false);
		setSelectedIconName('');
	};

	const counts = icons.reduce((acc: any, curr) => {
		const str = JSON.stringify(curr.category);

		acc[str] = (acc[str] || 0) + 1;
		return acc;
	}, {});

	return (
		<div className={styles.container}>
			<Head>
				<title>1Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className={styles.header}>
				<div className={styles.logoWrap}>
					<Link href="/">
						<a className={styles.headerLogo}>
							<Typography variant="h1_bold">Engineering symbols</Typography>
						</a>
					</Link>
					<Link href="/changelog">
						<a>
							<Chip variant="active">v.2.0.1</Chip>
						</a>
					</Link>
				</div>

				<nav className={styles.nav}>
					<ul>
						<li className={styles.availableList}>
							<a href="#icon">Icon</a>
						</li>
						<li className={styles.availableList}>
							<Link href="/documentation">
								<a>Documentation</a>
							</Link>
						</li>
					</ul>
				</nav>

				<p>Designed and built with ❤️</p>
			</header>

			<main className={styles.main}>
				<div className={styles.hero}>
					<Typography variant="h1">
						<strong>Your new Engineering symbols library.</strong>
					</Typography>
					<p className={styles.description}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>

					<div className={styles.infoBoxes}>
						<div className={styles.infoBox}>
							<Typography variant="h4">
								<strong>100%</strong>
							</Typography>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
						</div>
						<div className={styles.infoBox}>
							<Typography variant="h4">
								<strong>1077</strong>
							</Typography>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
						</div>
						<div className={styles.infoBox}>
							<Typography variant="h4">
								<strong>10.9k</strong>
							</Typography>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
						</div>
						<div className={styles.infoBox}>
							<Typography variant="h4">
								<strong>100 mil.</strong>
							</Typography>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
						</div>
					</div>

					<ul className={styles.availableList}>
						<li className={styles.availableListText}>
							<p>Available for:</p>
						</li>
						<li className={styles.availableListReact}>
							<Image src="/image/react.png" layout="fill" />
						</li>
						<li className={styles.availableListFigma}>
							<Image src="/image/figma.png" layout="fill" />
						</li>
						<li className={styles.availableListCode}>
							<Image src="/image/html-coding.png" layout="fill" />
						</li>
						<li className={styles.availableListFlutter}>
							<Image src="/image/flutter.png" layout="fill" />
						</li>
						<li className={styles.availableListAdobe}>
							<Image src="/image/adobe-illustrator.png" layout="fill" />
						</li>
					</ul>
				</div>

				<div id="icon" className={styles.iconsContainer}>
					<div className={styles.categories}>
						<ul>
							<li>
								{/* @ts-ignore: next-line */}
								<Button onClick={() => setSelectedCategory('All')} variant={selectedCategory === 'All' ? '' : 'ghost'}>
									All <Chip>{icons.length}</Chip>
								</Button>
							</li>
							{Object.keys(counts).map((key) => {
								const name = capitalizeWords(key.slice(1, -1));

								return (
									<li key={key}>
										<Button
											/* @ts-ignore: next-line */
											variant={selectedCategory === name[0] ? '' : 'ghost'}
											onClick={() => setSelectedCategory(name[0])}>
											{name} <Chip>{counts[key]}</Chip>
										</Button>
									</li>
								);
							})}
						</ul>
					</div>
					<div className={styles.iconsList}>
						<ul>
							{icns.map(({ name }) => (
								<li key={name}>
									<button onClick={() => handleOpen(name)}>
										<Card>
											<div className={styles.iconsListWrap}>
												<div className={styles.iconsListIcon}>
													<EngineeringIcon
														name={name}
														getPosition={(el: any) => console.log('ops:', el)}
														rotate={rotate}
														appearance={appearance}
													/>
												</div>
												<div className={styles.iconsListContent}>
													<Typography variant="body_short">{name}</Typography>
												</div>
											</div>
										</Card>
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.customize}>
						<Search
							aria-label="sitewide"
							id="search-normal"
							placeholder="Search"
							onChange={({ target }) => debounceValue(target.value)}
						/>
						<div className={styles.customizeElement}>
							<div className={styles.customizeReset}>
								<Typography variant="body_short" bold>
									Customize
								</Typography>
								<Button color="secondary" onClick={() => onRestCustomize()}>
									Reset
								</Button>
							</div>
						</div>

						<div className={styles.customizeElement}>
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
								onChange={(el, val) => setRotate(val[0])}
							/>
						</div>

						<div className={styles.customizeElement}>
							<div className={styles.customizeColor}>
								<Typography variant="body_short" bold>
									Color
								</Typography>
								<HexColorPicker color={appearance} onChange={setAppearance} />
							</div>
						</div>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>License</footer>

			{isOpen && selectedIconName && <DialogComponent onHandleClose={handleClose} selectedName={selectedIconName} icons={icons} />}
		</div>
	);
};

export default Home;
