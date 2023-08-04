import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { msalConfig } from '../utils/authConfig';

import { GlobalStyles } from '../styles/globalStyles';
import {
	FooterMenuWrapperStyled,
	FooterLogoWrapperStyled,
	DarkModeSwitcherStyled,
	FooterMenuTitleStyled,
	FooterMenuListStyled,
	FooterWrapperStyled,
	FooterLicenseStyled,
	FooterMenuStyled,
	ContainerStyled,
	FooterStyled,
} from '../styles/styles';
import '../styles/globals.css';

import { lightTheme, darkTheme } from '../styles/Themes';

import { HeaderComponent, LogoComponent } from '../components';

const pca = new PublicClientApplication(msalConfig);

function MyApp({ Component, pageProps }: AppProps) {
	const [themeName, setThemeName] = useState('light');

	const themeToggler = () => setThemeName(themeName === 'light' ? 'dark' : 'light');
	const theme = themeName === 'light' ? lightTheme : darkTheme;

	return (
		<MsalProvider instance={pca}>
			<Head>
				<title>🍯 Engineering symbols - Download, Customize, Create</title>
				<meta
					name="description"
					content="Explore a collection of SVG engineering symbols. Download, customize colors & sizes, and create new symbols."
				/>
				<meta key="robots" name="robots" content="noindex,follow" />
				<meta key="googlebot" name="googlebot" content="noindex,follow" />
				{/* ADD SEO */}
			</Head>

			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<DarkModeSwitcherStyled>
					<label className="switch">
						<input className="switch__input" type="checkbox" onClick={themeToggler} />
						<span className="switch__background">
							<span className="switch__toggle">
								<span className="switch__moon"></span>
							</span>
							<span className="switch__stars"></span>
							<span className="switch__clouds"></span>
						</span>
					</label>
				</DarkModeSwitcherStyled>

				<>
					{/* <UnauthenticatedTemplate> */}
					<HeaderComponent />
					{/* </UnauthenticatedTemplate> */}
					<main>
						<Component {...pageProps} theme={theme} />
					</main>
				</>
				<FooterStyled>
					<ContainerStyled>
						<FooterWrapperStyled>
							<FooterLogoWrapperStyled>
								<LogoComponent fill="backgroundGrey" />
								<p>Engineering symbols</p>
							</FooterLogoWrapperStyled>
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
		</MsalProvider>
	);
}

export default MyApp;
