import type { NextPage } from 'next';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';

import { SymbolsHeaderStyled } from '../symbols/styles';
import { ContainerStyled } from '../../styles/styles';

import styles from './styles.module.css';

import DOC from './contribution.md';

const Contribution: NextPage = () => {
	return (
		<>
			<Head>
				<title>🍯 Engineering symbols - Contribute Your Engineering Symbols</title>
				<meta
					name="description"
					content="Join our community! Share and expand the engineering symbol collection with your unique contributions."
				/>
				<meta key="robots" name="robots" content="noindex,follow" />
				<meta key="googlebot" name="googlebot" content="noindex,follow" />
				{/* ADD SEO */}
			</Head>
			<ContainerStyled>
				<SymbolsHeaderStyled>
					<h1>Contributing to the Engineering Symbols Library</h1>
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

export default Contribution;
