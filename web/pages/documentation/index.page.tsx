import type { NextPage } from 'next';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';

import { SymbolsHeaderStyled } from '../symbols/styles';
import { ContainerStyled } from '../../styles/styles';

import styles from './styles.module.css';

import DOC from './documentation.md';

const Documentation: NextPage = () => {
	return (
		<>
			<Head>
				<title>🍯 Engineering symbols - Documentation</title>
				<meta name="description" content="Comprehensive documentation to understand the meaning and usage of engineering symbol." />
				<meta key="robots" name="robots" content="noindex,follow" />
				<meta key="googlebot" name="googlebot" content="noindex,follow" />
				{/* ADD SEO */}
			</Head>
			<ContainerStyled>
				<SymbolsHeaderStyled>
					<h1>Documentation</h1>
				</SymbolsHeaderStyled>

				{/* <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} /> */}
				<div className={styles.markdownBody}>
					<MDXProvider>
						<DOC />
					</MDXProvider>
				</div>
			</ContainerStyled>
		</>
	);
};

export default Documentation;
