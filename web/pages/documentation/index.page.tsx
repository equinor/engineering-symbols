import type { NextPage } from 'next';
import { MDXProvider } from '@mdx-js/react';

import { SymbolsHeaderStyled } from '../symbols/styles';
import { ContainerStyled } from '../../styles/styles';

import styles from './styles.module.css';

import DOC from './documentation.md';

const Documentation: NextPage = () => {
	return (
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
	);
};

export default Documentation;
