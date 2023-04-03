import { Typography } from '@equinor/eds-core-react';
import type { NextPage } from 'next';
import { MDXProvider } from '@mdx-js/react';

import DOC from './contribution.md';

import styles from './styles.module.css';

import { SymbolsHeaderStyled } from '../symbols/styles';

const Contribution: NextPage = () => {
	return (
		<>
			<SymbolsHeaderStyled>
				<Typography variant="h1_bold" style={{ textAlign: 'center' }}>
					Documentation
				</Typography>
			</SymbolsHeaderStyled>

			{/* <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} /> */}
			<div className={styles.markdownBody}>
				<MDXProvider>
					<DOC />
				</MDXProvider>
			</div>
		</>
	);
};

export default Contribution;
