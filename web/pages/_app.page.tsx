import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';

// import 'https://eds-static.equinor.com/font/equinor-font.css';
import { GlobalStyles } from '../styles/globalStyles';
import { lightTheme, darkTheme } from '../styles/Themes';
import { ContainerStyled, DarkModeSwitcherStyled } from '../styles/styles';
import '../styles/globals.css';

import { HeaderComponent } from '../components';

import Sun from './svg/sun.svg';
import Moon from './svg/moon.svg';

function MyApp({ Component, pageProps }: AppProps) {
	const [themeName, setThemeName] = useState('light');

	const themeToggler = () => (themeName === 'light' ? setThemeName('dark') : setThemeName('light'));
	const theme = themeName === 'light' ? lightTheme : darkTheme;

	return (
		<ContainerStyled>
			<Head>
				<title>🍯 Engineering symbols</title>
				<meta name="description" content="Your new Engineering symbols library." />
				<meta name="robots" content="noindex,nofollow" />
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

				<footer style={{ padding: '3rem 0' }}>Im License</footer>
			</ThemeProvider>
		</ContainerStyled>
	);
}

export default MyApp;
