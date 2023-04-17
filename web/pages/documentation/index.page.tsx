import type { NextPage } from 'next';
import { MDXProvider } from '@mdx-js/react';

import DOC from './documentation.md';

import styles from './styles.module.css';

import { SymbolsHeaderStyled } from '../symbols/styles';
import { ContainerStyled } from '../../styles/styles';

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
