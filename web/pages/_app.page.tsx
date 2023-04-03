import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';

// import 'https://eds-static.equinor.com/font/equinor-font.css';
import { GlobalStyles } from '../styles/globalStyles';
import { lightTheme, darkTheme } from '../styles/Themes';
import {
	ContainerStyled,
	DarkModeSwitcherStyled,
	FooterLicenseStyled,
	FooterMenuListStyled,
	FooterMenuStyled,
	FooterMenuTitleStyled,
	FooterMenuWrapperStyled,
	FooterStyled,
	FooterWrapperStyled,
} from '../styles/styles';
import '../styles/globals.css';

import { HeaderComponent } from '../components';

import Sun from '../svg/sun.svg';
import Moon from '../svg/moon.svg';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
	const [themeName, setThemeName] = useState('light');

	const themeToggler = () => (themeName === 'light' ? setThemeName('dark') : setThemeName('light'));
	const theme = themeName === 'light' ? lightTheme : darkTheme;

	return (
		<>
			<Head>
				<title>🍯 Engineering symbols</title>
				<meta name="description" content="Your new Engineering symbols library." />
				<meta key="robots" name="robots" content="noindex,follow" />
				<meta key="googlebot" name="googlebot" content="noindex,follow" />
				{/* ADD SEO */}
			</Head>

			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<DarkModeSwitcherStyled>
					<input type="checkbox" id="darkmode-toggle" onClick={themeToggler} />
					<label htmlFor="darkmode-toggle">
						<Sun />
						<Moon />
					</label>
				</DarkModeSwitcherStyled>

				<HeaderComponent />
				<main>
					<Component {...pageProps} theme={theme} />
				</main>

				<FooterStyled>
					<ContainerStyled>
						<FooterWrapperStyled>
							Logo
							<FooterMenuWrapperStyled>
								<FooterMenuStyled>
									<FooterMenuTitleStyled>Project</FooterMenuTitleStyled>
									<FooterMenuListStyled>
										<li>
											<Link href="./contribution">Contribute</Link>
										</li>
									</FooterMenuListStyled>
								</FooterMenuStyled>

								<FooterMenuStyled>
									<FooterMenuTitleStyled>Suport</FooterMenuTitleStyled>
									<FooterMenuListStyled>
										<li>
											<Link href="./license">License</Link>
										</li>
										<li>
											<Link href="https://github.com/equinor/engineering-symbols/" target="_blank">
												GitHub Repository
											</Link>
										</li>
										<li>
											<Link href="./documentation">Documentation</Link>
										</li>
									</FooterMenuListStyled>
								</FooterMenuStyled>

								<FooterMenuStyled>
									<FooterMenuTitleStyled>Developers</FooterMenuTitleStyled>
									<FooterMenuListStyled>
										<li>
											<Link href="https://github.com/equinor/engineering-symbols/releases" target="_blank">
												Changelogs
											</Link>
										</li>
										<li>
											<Link href="https://www.npmjs.com/package/@equinor/engineering-symbols" target="_blank">
												React and React Native
											</Link>
										</li>
										<li>
											<Link href="./documentation#figma">Figma plugin</Link>
										</li>
										<li>
											<Link href="./documentation#css">CSS</Link>
										</li>
									</FooterMenuListStyled>
								</FooterMenuStyled>
							</FooterMenuWrapperStyled>
							<FooterLicenseStyled>
								<p>
									Parts of this content are ©2023 by individual Engineering symbols contributors. Content available under a{' '}
									<Link href="https://www.npmjs.com/package/@equinor/engineering-symbols">MIT License</Link>
								</p>
								<Link href="https://www.npmjs.com/package/@equinor/engineering-symbols">Privacy.</Link>
							</FooterLicenseStyled>
						</FooterWrapperStyled>
					</ContainerStyled>
				</FooterStyled>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
